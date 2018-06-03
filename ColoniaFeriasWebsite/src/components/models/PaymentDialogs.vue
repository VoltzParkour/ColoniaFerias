<template>
  <v-container>
    <v-dialog v-model="paymentOptionsDialog" :max-width="dialogWidth">
      <v-card>
        <v-container class="text-xs-center">
          <v-layout justify-center>
            <v-card-actions>
              <v-btn flat @click.native="onBoletoSelected">
                <img src="../../assets/barcode.png">
              </v-btn>
              <v-btn flat @click.native="onCardSelected">
                <img src="../../assets/credit-card.png">
              </v-btn>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="boletoDialog" :max-width="dialogWidth">
      <v-card>
        <v-container class="text-xs-center">
          <v-layout justify-center>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <v-card-actions v-else>
              <v-btn flat @click.native="onBoletoSelected">
                <img src="../../assets/barcode.png">
              </v-btn>
              <a :href="boletoLink">Clique para gerar seu boleto</a>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: "PaymentDialogs",
    data() {
      return {
        dialogWidth: '500px',
        paymentOptionsDialogg: true,
        boletoDialog: false,
        boletoLink: null,
        loading: false
      }
    },
    computed: {
      paymentOptionsDialog() {
        return this.$store.getters.paymentOptionsDialog
      }
    },
    created() {
      let recaptchaScript = document.createElement('script')
      // recaptchaScript.setAttribute('src', 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js')
      //sandbox
      recaptchaScript.setAttribute('src', 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
      document.head.appendChild(recaptchaScript)
    },
    beforeMount() {
      console.log('mandando dispatch')
      this.$store.dispatch('requestPayPalSessionId')
        .then(response => {
          console.log('idazao: ' + response.id)
          PagSeguroDirectPayment.setSessionId(response.id)
          this.$store.dispatch('setSessionId', response.id)
          console.log('idzao 2')
          var self = this
          PagSeguroDirectPayment.onSenderHashReady(function (response) {
            if (response.status == 'error') {
              console.log(response.message);
              return false;
            }

            var hash = response.senderHash//Hash estará disponível nesta variável.
            self.$store.dispatch('setHash', hash)
            console.log('hash: ' + hash)
            // PagSeguroDirectPayment.getPaymentMethods({
            //   amount: this.$store.getters.cartAmount,
            //   success: function(response) {
            //     console.log('methods: ' + response)
            //     this.$store.dispatch('setPaymentMethods', response)
            //   },
            //   error: function(response) {
            //     //tratamento do erro
            //   },
            //   complete: function(response) {
            //     //tratamento comum para todas chamadas
            //   }
            // });
          });
        })
        .catch(error => {
          ''
        })
    },
    methods: {
      onBoletoSelected() {
        this.paymentOptionsDialogg = false
        this.boletoDialog = true
        this.loading = true

        let info = this.$store.getters.transaction
        console.log('info: ' + info)
        let cartAmountString = ''+ this.$store.getters.cartAmount
        let payload = {
          hash: this.$store.getters.hash,
          email: info.email,
          name: info.resp_name,
          phone_code: info.celphone.substring(0, 2),
          phone: info.celphone.substring(2, info.celphone.length),
          cpf: info.cpf,
          amount: cartAmountString[this.$store.getters.cartAmount.length - 2] === '.' ? cartAmountString : cartAmountString + '.00',
        }

        this.$store.dispatch('requestPayPalTransaction', payload).then(
          response => {
            this.loading = false
            console.log('response: ' + response)
            console.log('response data: ' + response.data)
            this.boletoLink = response
          }
        )
      },
      onCardSelected() {

      },
    }
  }
</script>

<style scoped>

</style>
