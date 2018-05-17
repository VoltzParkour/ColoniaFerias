<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid>
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
        <v-layout row wrap>
          <v-flex xs4
                  v-for="plan in Colony.plans"
                  :key="plan.id">
            <v-card tile>
              <v-card-title> {{ plan.num_days }} dias</v-card-title>
              <div>
                <div> {{ plan.price | priceFilter }}</div>
                <div> {{ plan.price | priceFilter}}</div>
              </div>
              <!--<v-card-text> {{ plan.price }}</v-card-text>-->
              <!--<v-card-text> {{ plan.num_of_days }}</v-card-text>-->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary"> Adicionar ao Carrinho </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </v-slide-y-transition>

</template>

<script>

  export default {
    computed: {
      Colony() {
        let colony = console.log(this.$store.getters.selectedColony)
          // console.log(colony.plans)
        return this.$store.getters.selectedColony
      }
    },
    methods: {
      goColonyForm() {
        this.$router.push({ name: "ColonyForm" });
      }
    }
  }
</script>
