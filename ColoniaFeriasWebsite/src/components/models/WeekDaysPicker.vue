<template>
  <v-container grid-list-md text-xs-center class="">
    <v-layout row wrap>
      <v-flex offset-xs1 offset-sm1>
        <v-layout row wrap>
          <v-flex xs6 md4 lg3 xl3 v-for="i in 7" :key="i">
            <v-flex xs10>
              <h3>{{weekDaysNames[i - 1]}}</h3>
              <v-layout>
                <v-flex>
                  <v-card :class="weekDaysSelected[2 * i - 2] ? 'primary white--text' : 'green lighten-5'"
                          @click.native="selectWeekDay(2 * i - 2)">
                    <v-card-text class="px-0">Manhã</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex>
                  <v-card :class="weekDaysSelected[2 * i - 1]  ? 'primary white--text' : 'green lighten-5'"
                          @click.native="selectWeekDay(2 * i - 1)">
                    <v-card-text class="px-0">Tarde</v-card-text>
                  </v-card>
                </v-flex>               
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "WeekDaysPicker",
    data() {
      return {
        weekDaysSelected: this.$store.getters.selectedColony === null ? [false, false, false, false, false, false, false, false, false, false, false, false, false, false] : this.$store.getters.selectedColony.week_days,
        weekDaysNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
      }
    },
    methods: {
      selectWeekDay(i) {
        Vue.set(this.weekDaysSelected, i, !this.weekDaysSelected[i])
        this.$emit('weekDaysSelectedChange', this.weekDaysSelected)
      },
    },
  }
</script>

<style scoped>

</style>
