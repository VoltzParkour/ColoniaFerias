<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
        <v-layout row wrap>
          <v-flex xs4
                  v-for="plan in plans"
                  :key="plan.id">
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
    </v-slide-y-transition>
  </v-container>
</template>

<script>
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
      plans() {
        return this.$store.getters.plans
      }
    }
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
