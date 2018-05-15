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

            <v-layout>
              <v-flex xs10 offset-xs1 offset-sm1>
                <v-layout row wrap>
                  <v-slide-x-reverse-transition>
                    <v-flex md6 lg4 class="mb-3">
                      <v-layout mb2>
                        <h3 class="ml-3 grey--text">Primeiro Dia</h3>
                      </v-layout>
                      <v-date-picker :min="today"
                                     locale="pt-br"
                                     v-model="startDate"
                      >
                      </v-date-picker>
                    </v-flex>
                  </v-slide-x-reverse-transition>

                  <v-slide-x-transition>
                    <v-flex md6 lg8 v-show="startDateSelected">
                      <v-layout mb2>
                        <h3 class="ml-3 grey--text">Último dia</h3>
                      </v-layout>
                      <v-date-picker :min="startDate"
                                     v-model="endDate"
                                     locale="pt-br"
                      ></v-date-picker>
                    </v-flex>
                  </v-slide-x-transition>
                </v-layout>

              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs10 mt-4 offset-xs1 offset-sm1>
                <h3 class="headline mb-3 grey--text">Dias da Semana</h3>
              </v-flex>
            </v-layout>

            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex offset-xs1 offset-sm1>
                  <v-layout row wrap>
                    <v-flex xs4 v-for="i in 7" :key="i">
                      <v-card :class="weekDaysSelected[i - 1] ? 'primary white--text' : 'light'"
                              @click.native="selectWeekDay(i - 1)">
                        <v-card-text class="px-0">{{weekDaysNames[i - 1]}}</v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>

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

  import Vue from 'vue'

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
        weekDaysSelected: [false, false, false, false, false, false, false],
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
      selectWeekDay(i) {
        // this.weekDaysSelected[i] = !this.weekDaysSelected[i]
        Vue.set(this.weekDaysSelected, i, !this.weekDaysSelected[i])
      },
      formIsValid() {

      }
    },
    watch: {
      startDate: function (newVal) {
        this.startDateSelected = true
        if (this.endDate === '') {
          this.endDate = newVal
        }
        if (Date.parse(this.endDate) < Date.parse(this.startDate)) {
          this.endDate = this.startDate
        }
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
