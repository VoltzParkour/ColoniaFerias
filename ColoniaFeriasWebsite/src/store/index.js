import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'
import VuexPersist from 'vuex-persist/dist/index'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

import Constants from '../utility/constants'

localStorage.removeItem('vuex')

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
      },
    ],
    messages: [],
    colonies: [],
    plans: [],
    cart: [],
    selectedColony: null,
    colonyParticipants: [],
    selectedPlans: '',
    buyersCount: {}
  },
  mutations: {
    addColony (state, payload) {
      state.colonies.push(payload)
    },
    setColonies (state, payload) {
      state.colonies = payload
    },
    removeColony (state, payload) {
      state.colonies.splice(payload, 1)
    },
    setSelectedColony (state, payload) {
      state.selectedColony = payload
    },
    clearSelectedColony (state, payload) {
      state.selectedColony = null
    },
    setColonyParticipants (state, payload) {
      state.colonyParticipants = payload
    },
    setSelectedPlans (state, payload) {
      state.selectedPlans = payload
    },
    addPlanToCart (state, payload) {
      state.cart.push(payload)
    },
    removePlanFromCart (state, payload) {
      state.cart.splice(payload, 1)
    },
    setBuyersCount (state, payload) {
      state.buyersCount = payload
    },
    createColonyParticipant (state, payload) {
      state.colonyParticipants.push(payload)
    }
  },
  actions: {
    CreateColony ({commit, getters}, payload) {
      if (getters.selectedColony != null) {
        firebase.database().ref('Colonies').child(getters.selectedColony.id)
          .set(payload)
          .then(
            (data) => {

            }
          )
      } else {
        firebase.database().ref('Colonies').push(payload)
          .then((data) => {
            // console.log(data)
            // commit('addColony', payload)
            router.push('/admin')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },


    createColonyParticipant ({commit, getters}, payload) {
      const user = {
        name: payload.name,
        age: payload.age,
        responsable: payload.responsable,
        days: payload.days
      }
      let selectedColonyId = payload.colonyId
      let string = 'colony_buyers/' + selectedColonyId
      firebase.database().ref(string).push(user)
        .then((data) => {
          const key = data.key
          commit('createColonyParticipant', {
            ...user,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },


    LoadColonies ({commit}) {
      // firebase.database().ref('Colonies').on('value')
      firebase.database().ref('Colonies').once('value')
        .then(
          (data) => {
            const colonies = []
            const obj = data.val()
            for (let key in obj) {
              colonies.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                start_date: obj[key].start_date,
                end_date : obj[key].end_date,
                plans: obj[key].plans,
                week_days: obj[key].week_days,
                active: true
              })
            }
            commit('setColonies', colonies)
          }
        )
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    LoadColonyParticipants ({commit, getters}) {
      firebase.database().ref('colony_buyers').child(getters.selectedColony.id).once('value')
        .then(
          (data) => {
            const colony_buyers = []
            const obj = data.val()
            for (let key in obj) {
              let colonyParticipant = {
                cpf: key,
                name: obj[key].name,
                age: obj[key].age,
                responsable : obj[key].responsable,
                days: obj[key].days
              }
              let days = []
              for (let selectedDay in obj[key].days) {
                days.push({
                  day: obj[key].days[selectedDay].day,
                  morning: obj[key].days[selectedDay].morning,
                  afternoon: obj[key].days[selectedDay].afternoon
                })
              }
              colonyParticipant = {
                colonyParticipant,
                days
              }
              colony_buyers.push(
                colonyParticipant)
            }
            commit('setColonyParticipants', colony_buyers)
          }
        )
    },
    selectColony ({commit}, payload) {
      commit('setSelectedColony', payload)
    },
    deleteColony ({commit, getters}, payload) {
      firebase.database().ref('Colonies')
        .child(payload.id)
        .remove()
        .then(
          (data) => {
            for (let i = 0; i < getters.colonies.length; i++) {
              if (payload.id === getters.colonies[i].id) {
                commit('removeColony', i)
              }
            }
            // location.reload()
          }
        )
    },
    clearSelectedColony ({commit}) {
      commit('clearSelectedColony')
    },
    setCreatePlans({commit}, payload) {
      commit('setSelectedPlans', payload)
    },
    addPlanToCart ({commit}, payload) {
      commit('addPlanToCart', payload)
    },
    removePlanFromCart ({commit}, payload) {
      commit('removePlanFromCart', payload)
    },
    LoadBuyersCount ({commit}) {
      firebase.database().ref('colony_buyers').once('value')
      .then(
        (data) => {
          const buyersCount = {}
          const obj = data.val()
          for (let colonia in obj) {
            buyersCount[colonia] = Object.keys(obj[colonia]).length
          }
          console.log(buyersCount)
          commit('setBuyersCount', buyersCount)
        })
      .catch(
        (error) => {
          console.log(error)
        }
      )
    }
  },
  getters: {
    messages (state) {
      return state.messages.sort((messageA, messageB) => {
        return messageA.sent > messageB.sent
      })
    },
    selectedPlans (state) {
      return state.selectedPlans
    },
    colonies (state) {
      return state.colonies
    },
    colonyParticipants (state) {
      return state.colonyParticipants
    },
    selectedColony (state) {
      return state.selectedColony
    },
    cart (state) {
      return state.cart
    },
    buyersCount (state) {
      return state.buyersCount
    }
  }
})
