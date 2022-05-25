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
      token: "",
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
        token: "",
      };
      localStorage.removeItem("user");
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
        .get(`/user/${userId}`, data)
        .then(function (response) {
          commit("userInfos", response.data.user);
        })
        .catch(function () {
          commit("setStatus", "error_create");
        });
    },

    /**
     * Supprimer le compte utilisateur
     */
    deleteAccount: ({ commit }) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      let data = {
        data: {
          userId: userId,
        },
      };

      instance.defaults.headers["Content-Type"] = "application/json";

      instance
        .delete(`/user/${userId}`, data)
        .then(function (response) {
          commit("userInfos", response.data.user);
        })
        .catch(function () {
          commit("setStatus", "error_create");
        });
    },
  },
});
export default store;
