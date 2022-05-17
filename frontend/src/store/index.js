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
    pictureUrl: "",
    jobTitle: "",
    bio: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
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
      instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
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
      commit("setStatus", "loading");
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
      instance
        .get("/user/2")
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
