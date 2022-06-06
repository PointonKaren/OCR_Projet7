import { createStore } from "vuex";

const axios = require("axios").default;

/**
 * URL de la BDD
 */
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

let user = localStorage.getItem("user");

/**
 * Vérification de la présence de données utilisateur dans le local storage et si oui, ajout du header avec le token dans la requête
 */
if (!user) {
  user = {
    userId: -1,
    role: 0,
    token: "",
    firstName: "",
    lastName: "",
    pictureUrl: "",
    jobTitle: "",
    bio: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
  } catch (ex) {
    user = {
      userId: -1,
      role: 0,
      firstName: "",
      lastName: "",
      pictureUrl: "",
      jobTitle: "",
      bio: "",
    };
  }
}

/**
 * Création du store vuex avec les des données vides attendues
 */
const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      pictureUrl: "",
      jobTitle: "",
      bio: "",
    },
    postsInfos: [],
  },

  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    /**
     * Autorise l'utilisateur via le token, stocke les données dans le local storage et dans l'objet user
     */
    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    /**
     * stocke les données du store vuex dans l'objet userInfos
     */
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },

    /**
     * Lorsqu'un utilisateur se déconnecte, passe l'userId à -1 et supprime les données du local storage
     */
    logout: function (state) {
      state.user = {
        userId: -1,
        id: "",
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        pictureUrl: "",
        jobTitle: "",
        bio: "",
      };

      localStorage.removeItem("user");
    },

    setPosts: function (state, posts) {
      state.postsInfos = posts;
    },
  },

  actions: {
    /**
     * Au login, ajoute les données au store vuex
     */
    login: ({ commit }, userInfos) => {
      commit("setStatus");
      return new Promise((resolve, reject) => {
        instance
          .post("/user/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },

    /**
     * Au signup, ajoute les données au store vuex
     */
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/user/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    /**
     * Récupérer les données utilisateur
     */
    getUserInfos: ({ commit }) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      let data = {
        data: {
          userId: userId,
        },
      };

      instance.defaults.headers["Content-Type"] = "application/json";

      instance
        .post(`/user/${userId}`, data)
        .then(function (response) {
          commit("userInfos", response.data.user);
        })
        .catch(function () {
          commit("setStatus", "error_create");
        });
    },

    /**
     *
     * @param {*} param0
     * @returns
     */

    updateUserInfos: ({ commit }, { containImage, formData, userData }) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      const newUserData = {
        userId: userId,
        ...userData,
      };

      if (containImage) {
        formData.append("data", JSON.stringify(newUserData));
        instance
          .put(`/user/${userId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            commit("userInfos", response.data);
          })
          .catch(function (e) {
            console.log(e);
          });
      } else {
        instance
          .put(`/user/${userId}`, newUserData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            commit("userInfos", response.data);
          })
          .catch(function (e) {
            console.log(e);
            commit("setStatus", "error_create");
          });
      }
    },

    /**
     * Supprimer le compte utilisateur
     */
    deleteAccount: async ({ commit }) => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;

        let data = {
          data: {
            userId: userId,
          },
        };

        instance.defaults.headers["Content-Type"] = "application/json";

        const delRes = await instance.delete(`/user/${userId}`, data);

        if (delRes.status === 200) {
          const userData = {
            userId: -1,
            token: "",
            id: "",
            role: "",
            firstName: "",
            lastName: "",
            email: "",
            pictureUrl: "",
            jobTitle: "",
            bio: "",
          };

          commit("userInfos", userData);
          commit("logout");

          return {
            success: true,
          };
        } else {
          return {
            success: false,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
        };
      }
    },

    /**
     * Ajouter une publication
     * @param {*} param0
     * @param {*} post
     * @returns
     */

    addPost: ({ commit }, { postData, formData }) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      instance.defaults.headers["Content-Type"] = "multipart/form-data";

      const newUserData = {
        userId: userId,
        ...postData,
      };

      formData.append("data", JSON.stringify(newUserData));

      instance
        .put("/post/", formData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function () {
          commit("setStatus", "error_create");
        });
    },

    getPosts: ({ commit }) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      let data = {
        data: {
          userId: userId,
        },
      };

      instance.defaults.headers["Content-Type"] = "application/json";

      instance
        .post(`/post/`, data)
        .then(function (response) {
          commit("setPosts", response.data.posts);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
});

export default store;

export { instance };
