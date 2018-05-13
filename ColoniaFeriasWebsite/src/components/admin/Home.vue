<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid
                   v-if="Colonies.length > 0">
        <v-layout row wrap>
          <v-flex xs4
                  v-for="colony in Colonies"
                  :key="colony.id">
            <v-card tile>
              <v-card-title v-bind:style="styleHeader"> {{ plan.num_of_days }} dias</v-card-title>
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
      <v-container v-else>
        <v-flex>
          <header> Nenhum colônia</header>
          <v-card-actions>
            <v-btn>Adicionar Colônia</v-btn>
          </v-card-actions>
        </v-flex>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<script>

  export default {
    computed: {
      Colonies() {
        return this.$store.getters.colonies
      }
    },
    methods: {

    }
  }
</script>
