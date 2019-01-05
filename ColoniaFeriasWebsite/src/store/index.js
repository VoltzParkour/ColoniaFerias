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
    estates: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
    messages: [],
    colonies: [],
    plans: [],
    cart: [],
    kids: [],
    userDirect: [],
    userDirectAmount: null,
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
    addColony(state, payload) {
      state.colonies.push(payload)
    },
    setColonies(state, payload) {
      state.colonies = payload
    },
    removeColony(state, payload) {
      state.colonies.splice(payload, 1)
    },
    setSelectedColony(state, payload) {
      state.selectedColony = payload
    },
    clearSelectedColony(state, payload) {
      state.selectedColony = null
    },
    setColonyParticipants(state, payload) {
      state.colonyParticipants = payload
    },
    setSelectedPlans(state, payload) {
      state.selectedPlans = payload
    },
    addPlanToCart(state, payload) {
      if (state.cartAmount === null) {
        state.cartAmount = parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
      } else {
        state.cartAmount = state.cartAmount + parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
      }
      state.cart.push(payload)
    },
    setPlanToCart(state, payload) {
      state.cart[payload.index] = payload.data
    },
    removePlanFromCart(state, payload) {
      state.cart.splice(payload, 1)
      state.cartAmount = state.cartAmount - payload.price
    },
    setPlanUser (state, payload) {
      state.cart[payload.index].selectedUser = payload.user
    },
    addKid (state, payload) {
      state.kids.push(payload)
    },
    addPlanToUserDirect(state, payload) {
      if (state.userDirectAmount === null) {
        state.userDirectAmount = parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
      } else {
        state.userDirectAmount = state.userDirectAmount + parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
      }
      state.userDirect.push(payload)
    },
    removePlanFromUserDirect(state, payload) {
      state.userDirect.splice(payload, 1)
    },
    setBuyersCount(state, payload) {
      state.buyersCount = payload
    },
    createColonyParticipant(state, payload) {
      state.colonyParticipants.push(payload)
    },
    setSessionId(state, payload) {
      state.session_id = payload
    },
    setHash(state, payload) {
      state.hash = payload
    },
    setPaymentMethods(state, payload) {
      state.payment_methods = payload
    },
    setPaymentOptionsDialog(state, payload) {
      state.payment_options_dialog = payload
    },
    setTransactionInfo(state, payload) {
      state.transaction = payload
    },
    setTest(state, payload) {
      state.test = payload
    },
    setSessionId(state, payload) {
      state.session_id = payload
    }
  },
  actions: {
    CreateColony({commit, getters}, payload) {
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

    createColonyParticipantTemporary({commit, getters}, payload) {
      const user = {
        name: payload.userData.name,
        age: payload.userData.age,
        healthInsurance: payload.userData.healthInsurance,
        responsable: payload.userData.responsable,
        days: payload.userData.days,
        paymentCode: payload.paymentCode
      }
      let selectedColonyId = payload.userData.colonyId
      let string = 'colony_buyers_by_payment/' + payload.paymentCode + '/' + selectedColonyId
      console.log('endereco: ' + string)
      firebase.database().ref(string).push(user)
        .then((data) => {
          // const key = data.key
          // commit('createColonyParticipant', {
          //   ...user,
          //   id: key,
          //   temporary: true
          // })


          // let string_m = 'colony_buyers/' + selectedColonyId
          // firebase.database().ref(string_m).push(user)

          // let string_l = 'Colonies/' + selectedColonyId + '/Days/'
          // user.days.forEach(turno => {//diminuir número de chamadas!!!
          //   firebase.database().ref(string_l + turno.day + '/' + turno.turno.replace('ã','a').toLowerCase()).push({userId: key, paymentCode: payload.paymentCode})
          // })

        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    createColonyParticipant({commit, getters}, payload) {
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
            firebase.database().ref(string_l + '/' + turno.date + '/' + turno.turno.replace('ã', 'a').toLowerCase()).push(data.key)
          })

        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },


    LoadColonies({commit}) {
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
                end_date: obj[key].end_date,
                plans: obj[key].plans,
                week_days: obj[key].week_days,
                days: obj[key].Days,
                capacity: obj[key].capacity,
                active: true,
                sellStart: obj[key].sellStart,
                sellEnd: obj[key].sellEnd
              })
            }
            commit('setColonies', colonies)
            // .filter(new Date(sellStart) >= today && new Date(sellEnd) >= today )
          }
        )
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    LoadColonyParticipants({commit, getters}) {
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
                responsable: obj[key].responsable,
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
    selectColony({commit}, payload) {
      commit('setSelectedColony', payload)
    },
    deleteColony({commit, getters}, payload) {
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
    clearSelectedColony({commit}) {
      commit('clearSelectedColony')
    },
    setCreatePlans({commit}, payload) {
      commit('setSelectedPlans', payload)
    },
    addPlanToCart({commit}, payload) {
      commit('addPlanToCart', payload)
    },
    setPlanToCart({commit}, payload) {
      commit('setPlanToCart', payload)
    },
    removePlanFromCart({commit}, payload) {
      commit('removePlanFromCart', payload)
    },
    setPlanUser({commit}, payload) {
      commit('setPlanUser', payload)
    },
    addKid({commit}, payload) {
      commit('addKid', payload)
    },
    addPlanToUserDirect({commit}, payload) {
      commit('addPlanToUserDirect', payload)
    },
    removePlanFromUserDirect({commit}, payload) {
      commit('removePlanFromUserDirect', payload)
    },
    LoadBuyersCount({commit}) {
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
    requestPayPalSessionId({commit}) {
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
    requestPayPalBoletoTransaction({commit}, payload) {
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
    requestPayPalCardTransaction({commit}, payload) {
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
    getAddressByCEP({commit}, payload) {
      console.log('payload')
      console.log(payload)
        return new Promise((resolve, reject) => {
          let url = 'https://viacep.com.br/ws/' + payload +'/json/'
          axios.get(url)
            .then(
              function (response) {
                resolve(response)
              }
            )
            .catch(
              function (error) {
                reject(error)
              }
            )
        })
    },
    setSessionId({commit}, payload) {
      commit('setSessionId', payload)
    },
    setHash({commit}, payload) {
      commit('setHash', payload)
    },
    setPaymentMethods({commit}, payload) {
      commit('setPaymentMethods', payload)
    },
    setPaymentOptionsDialog({commit}, payload) {
      commit('setPaymentOptionsDialog', payload)
    },
    setTransactionInfo({commit}, payload) {
      commit('setTransactionInfo', payload)
    },
    setTest({commit}, payload) {
      commit('setTest', payload)
    },
    setSessionId({commit}, payload) {
      commit('setSessionId', payload)
    }
  },
  getters: {
    messages(state) {
      return state.messages.sort((messageA, messageB) => {
        return messageA.sent > messageB.sent
      })
    },
    selectedPlans(state) {
      return state.selectedPlans
    },
    colonies(state) {
      return state.colonies
    },
    colonyParticipants(state) {
      return state.colonyParticipants
    },
    selectedColony(state) {
      return state.selectedColony
    },
    cart(state) {
      return state.cart
    },
    cartAmount(state) {
      return state.cartAmount
    },
    userDirect(state) {
      return state.userDirect
    },
    userDirectAmount(state) {
      return state.userDirectAmount
    },
    buyersCount(state) {
      return state.buyersCount
    },
    sessionId(state) {
      return state.session_id
    },
    hash(state) {
      return state.hash
    },
    peymentMethods(state) {
      return state.peyment_methods
    },
    paymentOptionsDialog(state) {
      return state.payment_options_dialog
    },
    transaction(state) {
      return state.transaction
    },
    sessionId(state) {
      return state.session_id
    },
    estates(state) {
      return state.estates
    },
    kids(state) {
      return state.kids
    },
    oldBrowser() {
      var ua = window.navigator.userAgent;

      // Test values; Uncomment to check result …

      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

      // Edge 12 (Spartan)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

      // Edge 13
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        // return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        return true
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        // return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        return true;
      }

      // var edge = ua.indexOf('Edge/');
      // if (edge > 0) {
      //   // Edge (IE 12+) => return version number
      //   return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      // }

      // other browser
      return false;
    }

  }
})
