<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
        <v-layout row wrap>
          <v-flex xs4
                  v-for="colony in colonies"
                  :key="colony.id"
          v-if="colony.active">
            <h1>{{ colony.title }}</h1>
            <h2>{{ colony.start_date | dayFilter }} de {{ colony.start_date | monthNameFullDateFilter }} - {{ colony.end_date | dayFilter }} de {{ colony.end_date | monthNameFullDateFilter }}</h2>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex v-for="plan in colony.plans" :key="plan.id">
                  <plan-card :plan="plan"></plan-card>
                </v-flex>
              </v-layout>
            </v-container>
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
        return this.$store.getters.colonies
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
