// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import PriceFilter from './filters/price'
import MonthNameFilter from './filters/month_name'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  primary: '#BED609',
  secondary: '#b2c400',
  accent: '#dea12b',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

Vue.filter('priceFilter', PriceFilter)
Vue.filter('monthNameFilter', MonthNameFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var config = {
      apiKey: "AIzaSyApZlXNnuN_bChc3PIbPs4ikI6inLussy4",
      authDomain: "coloniaferiasvoltz.firebaseapp.com",
      databaseURL: "https://coloniaferiasvoltz.firebaseio.com",
      storageBucket: "coloniaferiasvoltz.appspot.com",
      projectId: "coloniaferiasvoltz",
      messagingSenderId: "358510411110"
    };
    firebase.initializeApp(config);
  }
})
