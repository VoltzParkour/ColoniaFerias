<template>
  <v-slide-y-transition>
    <v-container>
      <v-layout row>
        <v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>
          <h1 class="primary--text">Nova Atividade</h1>
        </v-flex>
      </v-layout>
      <form @submit.prevent="onCreateColony">
        <v-layout row>
          <v-flex xs12>
            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="titulo"
                  label="Título"
                  id="titulo"
                  v-model="title"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="descricao"
                  label="Descrição"
                  id="descricao"
                  multi-line
                  v-model="description"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs10 offset-xs1 offset-sm1>
                <h3 class="headline mb-3 grey--text">Período da Colônia</h3>
              </v-flex>
            </v-layout>


            <DatePicker v-on:startDateChanged="startDate = $event"
                        v-on:endDateChanged="endDate = $event"></DatePicker>


            <v-layout>
              <v-flex xs10 mt-4 offset-xs1 offset-sm1>
                <h3 class="headline mb-3 grey--text">Dias da Semana</h3>
              </v-flex>
            </v-layout>

            <WeekDaysPicker v-on:weekDaysSelectedChange="weekDaysSelected = $event"></WeekDaysPicker>

            <v-layout>
              <v-flex xs10 mt-4 offset-xs1 offset-sm1>
                <PlanAdder></PlanAdder>
              </v-flex>
            </v-layout>

            <!--<v-layout row>-->
              <!--<v-flex xs10 offset-xs1 sm6 offset-sm3>-->
                <!--<v-text-field-->
                  <!--name="imageUrl"-->
                  <!--label="Url"-->
                  <!--id="imageUrl"-->
                  <!--v-model="imageUrl"-->
                <!--&gt;</v-text-field>-->
              <!--</v-flex>-->
            <!--</v-layout>-->
            <!--<v-layout row>-->
              <!--<v-flex xs10 offset-xs1 sm6 offset-sm3>-->
                <!--<img height="150px" :src="imageUrl"/>-->
              <!--</v-flex>-->
            <!--</v-layout>-->
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="primary"
                 :disabled="!formIsValid"
                 type="submit">{{ addString }}
          </v-btn>
        </v-card-actions>
      </form>
      <v-alert v-model="showAlert"
               type="error"
               dismissible
                transition="slide-y-reverse-transition">
        {{errorMessage}}
      </v-alert>
    </v-container>
  </v-slide-y-transition>

</template>

<script>

  import DatePicker from '../models/DateRangePicker'
  import WeekDaysPicker from '../models/WeekDaysPicker'
  import PlanAdder from '../models/PlanAdder'

  export default {
    name: "ColonyForm",
    data() {
      return {
        id: (new Date()).getMilliseconds(),
        title: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.title,
        createDate: '',
        //2018-05-18
        today: new Date().toISOString(),
        startDateSelected: false,
        endDateSelected: false,
        startDate: this.$store.getters.selectedColony === null ?  (new Date()).toISOString().substr(0, 10) : this.$store.getters.selectedColony.start_date,
        weekDaysSelected: this.$store.getters.selectedColony === null ? [false, false, false, false, false, false, false, false, false, false, false, false, false, false] : this.$store.getters.selectedColony.week_days,
        weekDaysNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        endDate: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.end_date,
        description: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.description,
        imageUrl: '',
        errorMessage: '',
        showAlert: false
      }
    },
    watch: { weekDaysSelected: function(value) {
          this.showAlert = false
      }

    },
    computed: {
      addString() {
        if (this.$store.getters.selectedColony) {
          return 'Editar'
        }
        return 'Criar'
      }
    },
    methods: {
      onCreateColony() {
        let start = new Date(this.startDate)
        let end = new Date(this.endDate)
        if (start > end) {
          this.errorMessage = 'Data final é anterior à data inicial'
          this.showAlert = true
          return false
        }
        let weekDaysEmpty = true
        for (let weekDays in this.weekDaysSelected) {
          if (this.weekDaysSelected[weekDays]) {
            weekDaysEmpty = false
          }
        }
        if (weekDaysEmpty){
          this.errorMessage = 'Nenhum dia da semana selecionado'
          this.showAlert = true
          return false
        }
        let savedColonies = this.$store.getters.colonies
        let colony = {
          plans: this.$store.getters.selectedPlans,
          week_days: this.weekDaysSelected,
          start_date: this.startDate,
          end_date: this.endDate,
          description: this.description,
          title: this.title
        }
        this.$store.dispatch('CreateColony', colony)
      },
      changedValue() {
      },
      formIsValid() {
        let start = new Date(this.startDate)
        let end = new Date(this.endDate)
        if (start > end) {
          return false
        }
        let weekDaysEmpty = true
        for (let weekDays in  this.weekDaysSelected) {
          if (weekDays)
            weekDaysEmpty = false
        }
        if (weekDaysEmpty){
          return false
        }
        return true
      },
    },
    components: {
      DatePicker,
      WeekDaysPicker,
      PlanAdder
    },
    beforeMount () {
      let selectedColony = this.$store.getters.selectedColony
      if (selectedColony != null) {
        this.startDate = selectedColony.start_date
        this.endDate = selectedColony.end_date
        this.weekDaysSelected = selectedColony.week_days
      }
    }
  }
</script>

<style scoped>
  .fade {
    opacity: 1;
    transition: all 0.3s ease;
  }

  .fade.fade-enter, .fade.fade-leave {
    opacity: 0
  }

  /* delay here */
  .fade.delay {
    transition-delay: 0.3s;
  }
</style>
