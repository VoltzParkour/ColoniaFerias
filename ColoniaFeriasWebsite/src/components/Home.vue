<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
        <v-layout row wrap class="transparent">
          <v-flex xs12
                  v-for="colony in colonies"
                  :key="colony.id"
          v-if="colony.active">
            <v-divider  class="primary ml-0" style="height: 2px"></v-divider>
            <v-container>
              <v-layout row wrap>
                <v-flex>
                  <span class="display-2 right fontsp">{{ colony.title }} -</span>
                </v-flex>
                <v-flex style="margin-top: 10px">
                  <span class="headline fontsp">{{ colony.start_date | dayFilter }} de {{ colony.start_date | monthNameFullDateFilter }} até
                        {{ colony.end_date | dayFilter }} de {{ colony.end_date | monthNameFullDateFilter }}</span>
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                  <h2 class="display grey--text fontsp">{{ colony.description }}</h2>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6 lg3 v-for="plan in colony.plans" :key="plan.id">
                  <plan-card :colony="colony" :plan="plan"></plan-card>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider  class="primary ml-0" style="height: 2px"></v-divider>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import PlanCard from './models/ClientPlanCard'

  export default {
    data () {
      return {
        styleHeader: {
          color: 'gray',
          fontSize: '64px',
          alignContent: 'center',
        },
      }
    },
    computed: {
      colonies() {
        let today = new Date()
        return this.$store.getters.colonies.filter( function (ea){
              return new Date(ea.sellStart) <= today && new Date(ea.sellEnd) >= today
            })
      }
    },
    beforeMount() {
      this.$store.dispatch('LoadColonies')
    },
    components: {
      PlanCard
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  header {
    color: gray;
    font-size: 150px;
  }

</style>
