<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
            <v-card-text class="lighten-5 header_text_box" style="height: 120px;">
              <v-layout row wrap>
                <span class="display-3 fontsp ml-1 mt-0 mb-0 black--text">{{ plan.num_days === (5) ? '1 Semana - ' : '' }}{{ plan.num_days === (10) ? '1 Semana - ' : '' }}{{plan.num_days}}</span>
                <v-flex>

                </v-flex>

              </v-layout>
              <v-layout row>
                <v-flex style="margin-top:-25px;" :style="margemToc">
                  <span class="title grey--text fontsp" >{{ plan.num_days === 1 ? 'Turno' : 'Turnos'}}</span>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text class="green lighten-5"  style="height: 56px; position: relative">
              <selection-dialog-home @addCart="addPlanToUserDirect" :plan="plan" :colony="colony"></selection-dialog-home>
              <span class="headline fontsp">
                {{ plan.price | priceFilter}}
              </span>
            </v-card-text>
          </v-card>
        <v-alert v-model="success" type="success" dismissible>
          Plano adicionado!
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
        backgroundImageFull: [
          'http://voltzparkour.com/wp-content/uploads/2017/12/voltz.jpg',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fvoltz01.png?alt=media&token=acc9698e-fe02-41f6-b940-19ccacdbd367',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fvoltz02.png?alt=media&token=875c4703-4537-41e9-bdbe-d40c697cd396'
        ],
        showModal: true
      }
    },
    methods: {
      addPlanToUserDirect (data) {
          let plan = {
            plan: this.plan,
            period: data.selection.replace('ã', 'a').toLowerCase(),
            dates: data.dates,
            colonyId: this.colony.id
            }
          this.success = true
          this.$store.dispatch('addPlanToUserDirect', plan)
      },
      ModalFunc () {
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
