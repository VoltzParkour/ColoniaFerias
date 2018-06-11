<template>
  <v-container>

    <v-slide-x-transition>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs1 mt-4>
            <h3 class="headline grey--text">Planos</h3>
          </v-flex>
          <v-flex xs1 offset-xs1 offset-sm1 mt-3>
            <v-btn flat icon color="primary" @click.stop="dialog = true">
              <v-icon>add_circle_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-x-transition>

    <v-dialog
      v-model="dialog"
      max-width="500px"
      hide-overlay>
      <v-card>

        <v-card-title>Adicionar Plano</v-card-title>
        <v-card-text>
          <v-text-field label="Título" v-model.number="title"></v-text-field>
          <v-text-field label="Subtítulo" v-model.number="subtitle"></v-text-field>
          <v-text-field label="Número de turnos" v-model.number="numDays" mask="##"></v-text-field>
          <v-text-field label="Preço" v-model.number="price" mask="R$ ####,##"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="addPlan">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--<v-slide-x-transition>-->
    <!--<v-layout v-show="addPlanListener">-->
    <!--<v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>-->
    <!--<v-card>-->
    <!--<v-text-field label="Número de dias"></v-text-field>-->
    <!--<v-text-field label="Preço"></v-text-field>-->
    <!--</v-card>-->
    <!--</v-flex>-->
    <!--</v-layout>-->
    <!--</v-slide-x-transition>-->
    <v-layout row wrap>
      <!--<v-container grid-list-md text-xs-center>-->
      <!--<v-layout row wrap>-->
      <!--<v-flex xs3 v-for="plan in plans" :key="plan.id" mb-3>-->
      <!--<v-layout row wrap align-center>-->
      <!--<v-card class="primary">-->
      <!--<v-flex>-->
      <!--<v-card flat height="180px" width="125px">-->
      <!--<v-card-actions class=" remove text-xs-center">-->
      <!--<v-btn flat icon color="primary" @click.stop="removePlan(plan)">-->
      <!--<v-icon>highlight_off</v-icon>-->
      <!--</v-btn>-->
      <!--</v-card-actions>-->
      <!--<v-card-text>-->
      <!--<h1 class="grey&#45;&#45;text element">{{plan.num_days}}</h1>-->
      <!--<h3>Dias</h3>-->
      <!--</v-card-text>-->
      <!--</v-card>-->
      <!--&lt;!&ndash;<v-divider></v-divider>&ndash;&gt;-->
      <!--<v-card class="primary" mt-3 height="40px" width="125px">-->
      <!--<v-card-title>{{plan.price | priceFilter}}</v-card-title>-->
      <!--</v-card>-->
      <!--</v-flex>-->
      <!--</v-card>-->
      <!--</v-layout>-->
      <!--</v-flex>-->
      <!--</v-layout>-->

      <!--</v-container>-->
      <PlanCard v-bind:plans="plans"></PlanCard>
    </v-layout>
  </v-container>
</template>

<script>
  import PlanCard from './PlanCardList'

  export default {
    name: "PlanAdder",
    data() {
      return {
        dialog: false,
        plans: this.$store.getters.selectedColony === null ? [] : this.$store.getters.selectedColony.plans,
        numDays: null,
        price: null,
        subtitle: '',
        title: ''
      }
    },
    watch: {
      plans: function (plan) {
      },
    },
    methods: {
      addPlan() {
        let plan = {
          id: this.plans.length,
          price: this.price.substring(1, this.price.length),
          num_days: this.numDays,
          title: this.title,
          subtitle: this.subtitle
        }
        this.plans.push(plan)
        this.$emit('addPlan', this.plans)
        this.dialog = false
        this.$store.dispatch('setCreatePlans', this.plans)
      },
    },
    beforeMount() {
      if (this.$store.getters.selectedColony != null) {
        this.$store.dispatch('setCreatePlans', this.$store.getters.selectedColony.plans)
      }
    },
    components: {
      PlanCard
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
