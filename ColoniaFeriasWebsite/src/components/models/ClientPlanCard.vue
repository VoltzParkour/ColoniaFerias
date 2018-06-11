<template>
  <v-slide-x-transition>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
        <v-card-media :src="this.backgroundImage" height="180px">
        </v-card-media>
            <v-card-text class="lighten-5 header_text_box" style="height: 120px;">
              <v-layout row wrap>
                <span class="headline fontsp ml-1 mt-0 mb-0 black--text">{{ plan.title }}</span>
                <v-flex>

                </v-flex>

              </v-layout>
              <v-layout row>
                <v-flex style="margin-top:px;" :style="margemToc">
                  <span class="title grey--text fontsp" >{{plan.subtitle}}</span>
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
  </v-slide-x-transition>
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
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fvoltz02.png?alt=media&token=875c4703-4537-41e9-bdbe-d40c697cd396',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk3.jpeg?alt=media&token=390ecbde-6c60-4645-8cd1-90e4c90f3094',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk4.jpeg?alt=media&token=283d7569-c702-4f3d-b13c-f02ad9b63e35',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk5.jpeg?alt=media&token=bafb1df5-2cde-4b90-a169-72ef1f56f81f',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk6.jpeg?alt=media&token=aa9b124b-409d-4912-b717-211ecf70d4f4',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk7.jpeg?alt=media&token=bee0a362-4da4-4946-803e-6df743e29404',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk8.jpeg?alt=media&token=8a9128d2-caa2-46a3-ab38-75d00c54241a',
          'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/backgrounds%2Fcards%2Fbk9.jpeg?alt=media&token=72ececc7-9c9c-4dd5-b935-5bcecbd03f8d'
        ],
        showModal: true
      }
    },
    methods: {
      addPlanToCart (data) {
          let plan = {
            plan: this.plan,
            period: data.selection.replace('ã', 'a').toLowerCase(),
            dates: data.dates,
            lunchDates: data.lunchDates,
            colonyId: this.colony.id
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
      },
      backgroundImage () {
        return this.backgroundImageFull[Math.floor(Math.random() * this.backgroundImageFull.length)];
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
