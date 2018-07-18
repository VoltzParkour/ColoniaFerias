// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import axios from 'axios'
import * as firebase from 'firebase'
import PriceFilter from './filters/price'
import MonthNameFilter from './filters/month_name'
import MonthNameFullDateFilter from './filters/month_name_from_full_date'
import DayFilter from './filters/day'
import YearFilter from './filters/year'
import WeekdayFilter from './filters/weekdayFilter'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import InscForm from './components/models/InscForm'
import SelectionDialog from './components/models/SelectionDialog'

let app;
let config = {
  apiKey: "AIzaSyApZlXNnuN_bChc3PIbPs4ikI6inLussy4",
  authDomain: "coloniaferiasvoltz.firebaseapp.com",
  databaseURL: "https://coloniaferiasvoltz.firebaseio.com",
  storageBucket: "coloniaferiasvoltz.appspot.com",
  projectId: "coloniaferiasvoltz",
  messagingSenderId: "358510411110"
};

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
/* eslint-disable no-new */
  app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
    })
  }})

window.axios = require('axios')
// window.axios.defaults.headers.common['Accept'] = 'application/xml; charset=ISO-8859-1'
// window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.baseURL = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.use(Vuetify, { theme: {
  primary: '#BED609',
  primaryt: '#BCD601',
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
Vue.filter('monthNameFullDateFilter', MonthNameFullDateFilter)
Vue.filter('dayFilter', DayFilter)
Vue.filter('yearFilter', YearFilter)
Vue.filter('weekdayFilter', WeekdayFilter)

Vue.component('selection-dialog-home', SelectionDialog)
Vue.component('inscricao-dialog', InscForm)

export const bus = new Vue()

