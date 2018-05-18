<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid>
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid
                   v-if="Colonies.length > 0">
        <v-flex>
          <v-card-actions>
            <v-btn @click.stop="goColonyForm" class="primary">Adicionar Colônia</v-btn>
          </v-card-actions>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs4
                  v-for="colony in Colonies"
                  :key="colony.id"
                  @click.stop="goColony(colony)"
          >
            <v-card tile>
              <v-card-text>
                <h3 class="top_right_header">{{ dateGetYear(colony.start_date)}} </h3>
              </v-card-text>
              <v-card-title>
                <v-layout row wrap>
                  <v-flex>
                    <h1 class="main_text">{{ dateGetDay(colony.start_date) }}</h1>
                    {{ dateGetMonth(colony.start_date) | monthNameFilter}}
                  </v-flex>
                  <v-flex>
                    <h1 class="main_text"> - </h1>
                  </v-flex>
                  <v-flex>
                  <h1 class="main_text">{{ dateGetDay(colony.end_date) }}</h1>
                    {{ dateGetMonth(colony.end_date) | monthNameFilter}}
                  </v-flex>
                </v-layout>
              </v-card-title>
              <!--<div>-->
              <!--<div> {{ plan.price | priceFilter }}</div>-->
              <!--<div> {{ plan.price | priceFilter}}</div>-->
              <!--</div>-->
              <!--<v-card-text> {{ plan.price }}</v-card-text>-->
              <!--<v-card-text> {{ plan.num_of_days }}</v-card-text>-->
              <v-card-actions>
                <v-spacer></v-spacer>
                <!--<v-btn class="primary" @click.stop="goColony(colony)"> Esta</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-else>
        <v-flex>
          <header> Nenhum colônia</header>
          <v-card-actions>
            <v-btn @click.stop="goColonyForm">Adicionar Colônia</v-btn>
          </v-card-actions>
        </v-flex>
      </v-container>
    </v-container>
  </v-slide-y-transition>

</template>

<script>

  export default {
    computed: {
      Colonies() {
        return this.$store.getters.colonies
      }
    },
    methods: {
      goColonyForm() {
        this.$router.push({name: "ColonyForm"})
      },
      goColony(colony) {
        this.$store.dispatch('selectColony', colony)
        this.$router.push({name: "Colony"})
      },
      dateGetDay(dateString) {
        let date = new Date(dateString)
        return date.getDay()
      },
      dateGetMonth(dateString) {
        let date = new Date(dateString)
        return date.getMonth()
      },
      dateGetYear(dateString) {
        let date = new Date(dateString)
        return date.getFullYear()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main_text {
    padding: 0
    margin: 0
    margin-left 4px
    color: grey
    font-size: 300%
  }

  .top_right_header {
    top: 10px
    right: 16px
    position: absolute
    max-width 36px
    max-height 36px
    z-index 2
  }
</style>
