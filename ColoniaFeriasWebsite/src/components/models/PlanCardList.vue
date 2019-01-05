<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3 v-for="plan in plans" :key="plan.id" mb-3>
        <v-layout row wrap align-center>
          <v-card class="primary">
            <v-flex>
              <v-card flat width="125px">
                <v-card-actions class=" remove text-xs-center">
                  <v-btn flat icon color="primary" @click.stop="removePlan(plan)">
                    <v-icon>highlight_off</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-text>
                  <h1 class="grey--text element">{{plan.num_days}}</h1>
                  <h3>Turnos</h3>
                  <h3>{{plan.title}}</h3>
                  <span>{{plan.subtitle}}</span>
                </v-card-text>
              </v-card>
              <!--<v-divider></v-divider>-->
              <v-card class="primary" mt-3 height="40px" width="125px">
                <v-card-title>{{plan.price | priceFilter}}</v-card-title>
              </v-card>
            </v-flex>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
    export default {
        name: "PlanCard",
      data () {
          return {
            numDays: null,
            price: null
          }
      },
      props: ['plans'],
      methods: {
        removePlan(plan) {
          var index = this.plans.indexOf(plan);
          if (index > -1) {
            this.plans.splice(index, 1);
          }
        }
      }
    }
</script>

<style lang="stylus" scoped>

  .element {
    padding: 0
    margin: 0
    font-size: 500%
  }

  .remove {
    top: 0
    right: 0
    position: absolute
    max-width 36px
    max-height 36px
    z-index 2
  }

  .add {
    width 200px
    height 200px
  }
</style>
