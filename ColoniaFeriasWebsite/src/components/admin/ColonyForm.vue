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
                  v-model="description"
                  required></v-text-field>
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

            <v-layout row>
              <v-flex xs10 offset-xs1 sm6 offset-sm3>
                <v-text-field
                  name="imageUrl"
                  label="Url"
                  id="imageUrl"
                  v-model="imageUrl"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs10 offset-xs1 sm6 offset-sm3>
                <img height="150px" :src="imageUrl"/>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="primary"
                 @click.native="dialog = false"
                 :disabled="!formIsValid"
                 type="submit">Criar
          </v-btn>
          <v-btn flat color="primary" @click.native="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </form>
    </v-container>
  </v-slide-y-transition>

</template>

<script>

  import DatePicker from '../models/DateRangePicker'
  import WeekDaysPicker from '../models/WeekDaysPicker'

  export default {
    name: "ColonyForm",
    data() {
      return {
        id: (new Date()).getMilliseconds(),
        title: '',
        createDate: '',
        //2018-05-18
        today: new Date().toISOString(),
        startDateSelected: false,
        endDateSelected: false,
        startDate: (new Date()).toISOString().substr(0, 10),
        weekDaysSelected: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        weekDaysNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        endDate: '',
        description: '',
        imageUrl: ''
      }
    },
    methods: {
      onCreateColony() {
      },
      changedValue() {
      },
      formIsValid() {

      }
    },
    components: {
      DatePicker,
      WeekDaysPicker
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
