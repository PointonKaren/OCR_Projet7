import { createStore } from "vuex";

const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

let user = localStorage.getItem("user");

if (!user) {
  user = {
    userId: -1,
    role: 0,
    token: "",
    firstName: "",
    surname: "",
    pictureUrl: "@/assets/profile-picture.png",
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
      surname: "",
      pictureUrl: "",
      jobTitle: "",
      bio: "",
    };
  }
}
const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      role: "",
      firstName: "",
      surname: "",
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
    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
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
