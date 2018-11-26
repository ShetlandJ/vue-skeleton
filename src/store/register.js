import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// VUEX Store
export default({

  state: {
    user: ''
  },
  actions: {

    async CREATE_NEW_USER(context, payload) {
      try {      
        const url = '/api/new-user';
        const request = new Request(url, {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(
            {
              username: payload.username,
              firstName: payload.firstName,
              lastName: payload.lastName,
              password: payload.password
            })
          });

        const requestData = await fetch(request);
        const json = await requestData.json();

        // context.commit('UPDATE_USERNAME_STATUS', json);

        return requestData;

      } catch(error) {
        console.error(error);
      }
    },

  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = payload;
    },

  },

  getters: {

    user(state) {
      return state.user
    },
  }
});
