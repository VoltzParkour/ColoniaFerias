import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'
import axios from 'axios'
import VuexPersist from 'vuex-persist/dist/index'

// axios.defaults.baseURL = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var email = 'luisfnicolau@hotmail.com'
var token = '503F25BCA32146728390BA730AA376F1'

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
    buyersCount: {},
    cartAmount: null,


    //payment
    session_id: '',
    hash: null,
    payment_methods: null,
    payment_options_dialog: false,
    transaction: null,
    test: null,
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
      if (state.cartAmount === null) {
        state.cartAmount = parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
      } else {
        state.cartAmount = state.cartAmount + parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
      }
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
    },
    setSessionId (state, payload) {
      state.session_id = payload
    },
    setHash (state, payload) {
      state.hash = payload
    },
    setPaymentMethods (state, payload) {
      state.payment_methods = payload
    },
    setPaymentOptionsDialog (state, payload) {
      state.payment_options_dialog = payload
    },
    setTransactionInfo (state, payload) {
      state.transaction = payload
    },
    setTest (state, payload) {
      state.test = payload
    },
    setSessionId (state, payload) {
      state.session_id = payload
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

    createColonyParticipantTemporary ({commit, getters}, payload) {
      const user = {
        name: payload.userData.name,
        age: payload.userData.age,
        healthInsurance: payload.userData.healthInsurance,
        responsable: payload.userData.responsable,
        days: payload.userData.days,
        paymentCode: payload.paymentCode
      }
      let selectedColonyId = payload.userData.colonyId
      let string = 'colony_buyers_by_payment/'+ payload.paymentCode + '/' + selectedColonyId
      firebase.database().ref(string).push(user)
        .then((data) => {
          const key = data.key
          commit('createColonyParticipant', {
            ...user,
            id: key,
            temporary: true
          })
          

          let string_m = 'colony_buyers/' + selectedColonyId
          firebase.database().ref(string_m).push(user)
          
          let string_l = 'Colonies/' + selectedColonyId + '/Days/'
          user.days.forEach(turno => {//diminuir número de chamadas!!!
            firebase.database().ref(string_l + turno.day + '/' + turno.turno.replace('ã','a').toLowerCase()).push({userId: key, paymentCode: payload.paymentCode})
          })

        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    createColonyParticipant ({commit, getters}, payload) {
      const user = {
        name: payload.name,
        age: payload.age,
        healthInsurance: payload.healthInsurance,        
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
          let string_l = 'Colonies/' + selectedColonyId + '/Days/'
          user.days.forEach(turno => {
            firebase.database().ref(string_l + '/' + turno.date + '/' + turno.turno.replace('ã','a').toLowerCase()).push(data.key)
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
                days: obj[key].Days,
                capacity: obj[key].capacity,
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
    },
    requestPayPalSessionId ({commit}) {
      return new Promise((resolve, reject) => {
        let url = process.env.ROOT_API + 'api/session'
        axios.get(url)
          .then(
            function (response) {
              console.log(response)
              resolve(response.data)
              // console.log('sessionid: ' + response.data.session.id)
            }
          )
          .catch(
            function (error) {
              reject(error)
              console.log(error)
            }
          )
      })
    },
    requestPayPalBoletoTransaction ({commit}, payload) {
      // let url = 'transactions' + '?Accept=application%2Fvnd.pagseguro.com.br.v3%2Bxml&email=suporte%40lojamodelo.com.br&token=57BE455F4EC148E5A54D9BB91C5AC12C'
      let url = process.env.ROOT_API + 'api/payment/boleto'
      return new Promise((resolve, reject) => {
        axios.post(url, payload)
          .then(
            function (response) {
              console.log(response)
              resolve(response.data)
            }
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      })
    },
    requestPayPalCardTransaction ({commit}, payload) {
      // let url = 'transactions' + '?Accept=application%2Fvnd.pagseguro.com.br.v3%2Bxml&email=suporte%40lojamodelo.com.br&token=57BE455F4EC148E5A54D9BB91C5AC12C'
      let url = process.env.ROOT_API + 'api/payment/card'
      return new Promise((resolve, reject) => {
        axios.post(url, payload)
          .then(
            function (response) {
              console.log(response)
              resolve(response.data)
            }
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      })
    },
    setSessionId ({commit}, payload) {
      commit('setSessionId', payload)
    },
    setHash ({commit}, payload) {
      commit('setHash', payload)
    },
    setPaymentMethods ({commit}, payload) {
      commit('setPaymentMethods', payload)
    },
    setPaymentOptionsDialog ({commit}, payload) {
      commit('setPaymentOptionsDialog', payload)
    },
    setTransactionInfo ({commit}, payload) {
      commit('setTransactionInfo', payload)
    },
    setTest ({commit}, payload) {
      commit('setTest', payload)
    },
    setSessionId ({commit}, payload) {
      commit('setSessionId', payload)
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
    cartAmount(state) {
      return state.cartAmount
    },
    buyersCount (state) {
      return state.buyersCount
    },
    sessionId (state) {
      return state.session_id
    },
    hash (state) {
      return state.hash
    },
    peymentMethods (state) {
      return state.peyment_methods
    },
    paymentOptionsDialog (state) {
      return state.payment_options_dialog
    },
    transaction (state) {
      return state.transaction
    },
    sessionId (state) {
      return state.session_id
    }

  }
})
