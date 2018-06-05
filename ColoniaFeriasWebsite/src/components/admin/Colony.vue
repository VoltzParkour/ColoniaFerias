<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid>
      <!--<v-layout row wrap>-->
        <!--&lt;!&ndash;<v-icon class="grey&#45;&#45;text mr-3">filter_list</v-icon>&ndash;&gt;-->
        <!--<v-flex xs2>-->
          <!--<v-select-->
            <!--:items="filter_itens"-->
            <!--v-model="filter_choice"-->
            <!--:label="filter_choice"-->
            <!--append-icon="filter_list"-->
            <!--single-line></v-select>-->
        <!--</v-flex>-->
      <!--</v-layout>-->

      <v-expansion-panel>
        <v-expansion-panel-content v-for="date in ArrayOfDays" @click="$refs[modal.ref].open()" :key="date">
          <div slot="header">{{ date.substring(7, date.length) }} de {{ dateGetMonth(date) | monthNameFilter }} de {{
            date.substring(0, 4)}}
          </div>
          <v-card>
            <!--<v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut-->
            <!--labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut-->
            <!--aliquip ex ea commodo consequat.-->
            <!--</v-card-text>-->
            <!--<v-card-text>{{ participant.name }}</v-card-text>-->
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="getParticipantByDate(date)"
                hide-actions
                item-key="cpfPart"
                class="elevation-1"
                no-data-text="Ninguem para este dia"
              >
                <template slot="items" slot-scope="props">
                 <tr @click="props.expanded = !props.expanded">
                  <td>{{ props.item.participant.name }}</td>
                  <td>{{ props.item.participant.responsable.name_resp }}</td>
                  <td>{{ props.item.participant.age }}</td>
                  <td>{{ props.item.period }}</td>
                  </tr>
                </template>
                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <v-card-text>
                      <span>Responsável: {{props.item.participant.responsable.name_resp }}</span><br>
                      <span>CPF: {{props.item.participant.responsable.cpf }}</span><br>
                      <span>E-mail: {{props.item.participant.responsable.email }}</span><br>
                      <span>Celular: {{props.item.participant.responsable.celphone }}</span><br>
                      <span>Telefone: {{props.item.participant.responsable.tel}}</span>
                      </v-card-text>
                  </v-card>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </v-slide-y-transition>

</template>

<script>


import firebase from 'firebase'

  export default {
    data() {
      return {
        filter_itens: ['Data', 'Pessoas'],
        filter_choice: 'Data',
        headers: [
          {
            text: 'Nome',
            align: 'left',
            value: 'name'
          },
          {text: 'Responsável', value: 'responsable'},
          {text: 'Idade', value: 'age' },
          {text: 'Período', value: 'period'},
        ],
      }
    },
    computed: {
      ColonyParticipants() {
        // console.log(colony.plans)
        return this.$store.getters.colonyParticipants
      },
      ArrayOfDays() {
        let arrayOfDays = []
        let startDate = new Date(this.$store.getters.selectedColony.start_date)
        let endDate = new Date(this.$store.getters.selectedColony.end_date)
        while (startDate <= endDate) {
          startDate.setDate(startDate.getDate() + 1)
          arrayOfDays.push(startDate.getFullYear() + '-'
            + (startDate.getMonth() + 1) + '-'
            + startDate.getDate())
        }
        return arrayOfDays
      },
      Colony() {
        return this.$store.getters.selectedColony
      }
    },
    methods: {
      goColonyForm() {
        this.$router.push({name: "ColonyForm"});
      },
      dateGetMonth(dateString) {
        let date = new Date(dateString)
        return date.getMonth() + 1
      },
      getParticipantByDate(dateString) {
        let participants = []
        let date2 = new Date(dateString)
        let colonyParticipants = this.$store.getters.colonyParticipants
        for (let colonyParticipant in colonyParticipants) {
          // console.log('index: ' + colonyParticipant)
          for (let day in colonyParticipants[colonyParticipant]['days']) {
            // console.log('day index: ' + day)

            let date1 = new Date(colonyParticipants[colonyParticipant]['days'][day].day)
            date1.setDate(date1.getDate() + 1)
            // if (colonyParticipants[colonyParticipants]['days'][day].day === dateString) {
            // console.log('date 1: ' + date1)
            // console.log('date 2: ' + date2)
            if (date1.getDate() === date2.getDate()
              && date1.getMonth() === date2.getMonth()
              && date1.getFullYear() === date2.getFullYear()) {
              //console.log('add: ' + colonyParticipants[colonyParticipant]['colonyParticipant'].name)
              let period = ''
              if (colonyParticipants[colonyParticipant]['days'][day].morning && colonyParticipants[colonyParticipant]['days'][day].afternoon) {
                period = 'Integral'
              } else {
                if (colonyParticipants[colonyParticipant]['days'][day].morning) {
                  period = 'Manhã'
                } else {
                  period = 'Tarde'
                }
              }
              let cpfPart = colonyParticipants[colonyParticipant]['colonyParticipant'].cpf

              let participant = colonyParticipants[colonyParticipant]['colonyParticipant']
              participants.push({
                participant,
                period,
                cpfPart
              })
            }
          }
        }
        return participants
      }
    },
    beforeMount() {
      this.$store.dispatch('LoadColonyParticipants')
    }
  }
</script>
