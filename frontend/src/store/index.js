import { createStore } from "vuex";

const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const store = createStore({
  state: {},
  actions: {
    login: ({ commit }, userInfos) => {
      commit;
      instance
        .post("/user/login", userInfos)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createAccount: ({ commit }, userInfos) => {
      commit;
      instance
        .post("/user/signup", userInfos)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export default store;
