<template>
    <v-container>
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

            <v-slide-x-reverse-transition>
              <v-flex md6 lg8 v-show="startDateSelected">
                <v-layout mb2>
                  <h3 class="ml-3 grey--text">Último dia</h3>
                </v-layout>
                <v-date-picker :min="startDate"
                               v-model="endDate"
                               locale="pt-br"
                ></v-date-picker>
              </v-flex>
            </v-slide-x-reverse-transition>
          </v-layout>

        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

  export default {
        name: "DateRangePicker",
        props: ['startDateP', 'endDateP'],
      data () {
          return {
            startDateSelected: this.$store.getters.selectedColony === null ? false : true,
            // startDate: this.$store.getters.selectedColony === null ?  (new Date()).toISOString().substr(0, 10) : this.$store.getters.selectedColony.start_date,
            // endDate: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.end_date,
            today: ( d => new Date(d.setDate(d.getDate()-1)).toISOString() )(new Date),
            startDate: this.startDateP,
            endDate: this.endDateP
          }
      },
      watch: {
        startDate: function (date) {
          this.startDateSelected = true
          if (this.endDate === '') {
            this.endDate = date
          }
          if (Date.parse(this.endDate) < Date.parse(this.startDate)) {
            this.endDate = this.startDate
          }
          this.$emit('startDateChanged', this.startDate)
        },
        endDate: function (date) {
          this.$emit('endDateChanged', this.endDate)
        }
      }
    }
</script>

<style scoped>

</style>
