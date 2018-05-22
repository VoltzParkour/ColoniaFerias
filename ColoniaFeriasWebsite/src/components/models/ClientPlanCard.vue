<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-text class="grey lighten-5 header_text_box">
            <v-layout row wrap>
              <h1 class="header ml-4 mt-3">{{ plan.num_days }}</h1>
              <v-flex>
                <v-select
                  :items="items"
                  v-model="selection"
                  label="Período"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
            <h2 class="sub-header ml-2">dias</h2>

          </v-card-text>
          <v-card-text style="height: 56px; position: relative">
            <v-btn
              absolute
              fab
              top
              right
              color="primary--text"
              @click.stop="addPlanToCart"
            >
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <h3 class="bottom">
              {{ plan.price | priceFilter}}
            </h3>
          </v-card-text>
        </v-card>
        <v-alert :value="alert" type="error">
          Escolha um período.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "client-plan-card",
    props: ['plan'],
    data() {
      return {
        items: ['Manhã', 'Tarde', 'Integral'],
        selection: '',
        alert: false
      }
    },
    methods: {
      addPlanToCart () {
        if (this.selection == '') {
          this.alert = true
        } else {
          let plan = {
            plan: this.plan,
            period: this.selection.replace('ã', 'a').toLowerCase()
          }
          this.$store.dispatch('addPlanToCart', plan)
        }
      }
    },
    watch: {
      selection: function(data) {
        this.alert = false
      }
    }
  }
</script>

<style scoped>
  .header {
    padding: 0;
    margin: 0;
    color: grey;
    font-weight: 400;
    font-family: 'Open Sans';
    font-size: 500%;
  }

  .sub-header {
    padding: 0;
    margin: 0;
    color: grey;
    font-weight: 400;
    font-family: 'Open Sans';
  }

  .bottom {
    font-weight: 600;
    font-family: 'Open Sans'
  }

  .header_text_box {
    height: 200px;
  }
</style>
