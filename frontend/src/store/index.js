import { createStore } from "vuex";

const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const store = createStore({
  state: {
    status: "",
    user: {
      userId: -1,
      role: 0,
      token: "",
      firstName: "",
      surname: "",
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
      state.user = user;
    },
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      instance
        .post("/user/signup", userInfos)
        .then(function () {
          commit("setStatus", "created");
        })
        .catch(function () {
          commit("setStatus", "error_create");
        });
    },
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      instance
        .post("/user/login", userInfos)
        .then(function (response) {
          commit("setStatus", "");
          commit("logUser", response.data);
        })
        .catch(function () {
          commit("setStatus", "error_login");
        });
    },
  },
});

export default store;
