<template>
  <v-dialog width="450px" v-model="registerDialog">
    <v-btn
      absolute
      fab
      top
      right
      large
      color="success white--text"
      slot="activator"
      style="z-index: 1"
    >
      <v-icon>add_shopping_cart</v-icon>
    </v-btn>
    <v-card>
      <v-container>
      <v-alert :value="alert" type="warning" dismissable>
        {{alertMessage}}
      </v-alert>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline black--text">Selecione os turnos das atividades!</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider class="primary"></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-container grid-list-md text-xs-center class="">
              <v-layout row wrap>
                <v-flex >
                  <v-layout row wrap>
                    <v-flex >
                      <span class="left body-1 grey--text">Turnos restantes: {{remainingDays}}</span>
                    </v-flex>
                    <v-spacer></v-spacer>
                  </v-layout>
                  <v-layout row wrap>
                    <v-container>
                      <v-layout row wrap>
                          <v-flex xs6 sm4 md3 style="border: solid 1px; border-radius: 15px; border-color: #f2f2f2" v-for="(day,i) in dates" :key="i">
                            <span class="body-2">{{day.date | dayFilter }} de {{ day.date | monthNameFullDateFilter }} </span>
                            <div>({{day.date | weekdayFilter }})</div>
                            <v-flex v-for="(turno,j) in day.turnos" :key="j">
                              <v-card
                                flat
                                :class=" datesStatus[turno.pos]  ? ' body-1 primary white--text' : 'body-1 green lighten-5'"
                                @click.native="selectDate(turno.pos)"
                                style="cursor: pointer;">
                                <v-card-text class="pt-1 pb-1">{{turno.name}}</v-card-text>
                              </v-card>
                            </v-flex>
                          </v-flex>
                      </v-layout>
                    </v-container>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
              class="red--text darken-1"
              flat
              @click="registerDialog = false"
              >Cancelar</v-btn>
              <v-spacer></v-spacer>
             <!-- <v-btn
              class="green--text darken-1"
              flat
              @click="onAgree">Adicionar!</v-btn> -->
              <inscricao-dialog @click="onAgree"></inscricao-dialog>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import WeekDaysPicker from '../models/WeekDaysPicker'
  import Vue from 'vue'
  import {bus} from '../../main'

  export default {
    props: ['colony', 'plan'],
    data () {
      return {
        registerDialog: false,
        dates: [],
        datesStatus: [],
        items: ['Manhã', 'Tarde', 'Integral'],
        selection: '',
        alert: false,
        alertMessage: '',
        datesFlat: []

      }
    },
    computed: {
      remainingDays () {
        return (parseInt(this.plan.num_days) - this.datesStatus.filter(v => v).length)
      }
    },
    methods: {
      selectDate(i) {
        if (this.remainingDays > 0 || this.datesStatus[i]) {
          Vue.set(this.datesStatus, i, !this.datesStatus[i])
          this.alert = false
          return
        }
        this.alert = true
        this.alertMessage = 'Máximo de dias já selecionado!'
      },
      onAgree () {
        if (this.remainingDays !== 0) {
          this.alert = true
          this.alertMessage = 'Por favor, selecione os ' + this.remainingDays + ' dias restantes. '
          return
        } else {
            let selectedDates = []
            for (let j in this.datesStatus) {
              if (this.datesStatus[j] === true) {
                selectedDates.push(this.datesFlat[j])
              }
            }
            let emitObj = {
              dates: selectedDates,
              selection: this.selection
            }
            this.$emit('addCart', emitObj)
            this.registerDialog = false
            this.resetSelection()
            console.log('active?')
            bus.$emit('dialog', true)
        }
      },
      resetSelection () {
        var arr = [];
        for (var i = 0; i < this.datesStatus.length; i++) {
          arr.push(false);
        }
        this.datesStatus = arr;
      }
    },
    created () {
        let startDate = new Date (this.colony.start_date)
        let stopDate = new Date (this.colony.end_date)
        var dateArray = new Array()
        var currentDate = startDate
        while (currentDate <= stopDate) {
          let arrPos = 0
          let turnos = []
            if (this.colony.week_days[currentDate.getUTCDay()*2] === true) {
              turnos.push({name:'Manhã',pos:this.datesStatus.length})
              this.datesFlat.push({date: new Date (currentDate), turno: 'Manhã'})
              this.datesStatus.push(false)
            }
            if (this.colony.week_days[currentDate.getUTCDay()*2 + 1] === true) {
              turnos.push({name:'Tarde',pos:this.datesStatus.length})
              this.datesFlat.push({date: new Date (currentDate), turno: 'Tarde'})
              this.datesStatus.push(false)
            }
            if (turnos.length > 0){
            dateArray.push({date: new Date (currentDate), turnos: turnos})
            }
            currentDate.setDate(currentDate.getDate() + 1)
        }
        this.dates = dateArray
    }
  }
</script>
