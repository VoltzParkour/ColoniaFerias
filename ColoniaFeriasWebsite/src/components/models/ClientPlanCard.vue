<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
        <v-card-media :src="this.backgroundImage" height="120px">
        </v-card-media>
            <v-card-text class="lighten-5 header_text_box" style="height: 120px;">
              <v-layout row wrap>
                <span class="display-3 fontsp ml-1 mt-0 mb-0 black--text">{{ plan.num_days }}</span>
                <v-flex>
                 
                </v-flex>
                
              </v-layout>
              <v-layout row>
                <v-flex style="margin-top:-25px;" :style="margemToc">
                  <span class="title grey--text fontsp" >DIAS</span>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text class="green lighten-5"  style="height: 56px; position: relative">
              <selection-dialog-home @addCart="addPlanToCart" :plan="plan" :colony="colony"></selection-dialog-home>                  
              <span class="headline fontsp">
                {{ plan.price | priceFilter}}
              </span>
            </v-card-text>
          </v-card>
        <v-alert v-model="success" type="success" dismissible>
          Plano adicionado ao carrinho!
        </v-alert>
        <v-alert :value="alert" type="error" dismissable>
          Escolha um período.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: "client-plan-card",
    props: ['plan','colony'],
    data() {
      return {
        filled: true,
        items: ['Manhã', 'Tarde', 'Integral'],
        selection: '',
        alert: false,
        success: false,
        backgroundImage: 'http://voltzparkour.com/wp-content/uploads/2017/12/voltz.jpg',
        showModal: true
      }
    },
    methods: {
      addPlanToCart (data) {
          let plan = {
            plan: this.plan,
            period: data.selection.replace('ã', 'a').toLowerCase(),
            dates: data.dates
            }
          this.success = true
          this.$store.dispatch('addPlanToCart', plan)
      },
      showModalFunc () {
        this.showModal = true
      }
    },
    watch: {
      selection: function(data) {
        this.alert = false
      }
    },
    computed: {
      margemToc () {
        if (parseInt(this.plan.num_days) > 9) {
          return "margin-left: 1px"
        }
        return "margin-left: -13px"
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
