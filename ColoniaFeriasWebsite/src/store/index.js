import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from 'firebase'
import VuexPersist from 'vuex-persist/dist/index'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})


export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    news: [
      {
        imageUrl: 'https://www.insidehighered.com/sites/default/server_files/media/iStock-520374378.jpg',
        id: 'first',
        title: 'Title First'
      },
      {
        imageUrl: 'https://www.timeshighereducation.com/sites/default/files/istock-499343530.jpg',
        id: 'second',
        title: 'Title Second'
      }
    ],
  },
  mutations: {},
  action: {},
  getters: {
    messages (state) {
      return state.messages.sort((messageA, messageB) => {
        return messageA.sent > messageB.sent
      })
    }
  }
})
