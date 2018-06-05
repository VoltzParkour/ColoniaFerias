<template>
  <v-container>
    <v-container>
      <v-dialog v-if="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-dialog>
      <v-dialog v-model="paymentOptionsDialog" :max-width="dialogWidth" persistent="">
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
                <v-btn @click.native="dummyEmit">Teste</v-btn>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="boletoDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout justify-center>
              <v-card-actions>
                <v-btn flat @click.native="onBoletoSelected">
                  <img src="../../assets/barcode.png">
                </v-btn>
                <a :href="boletoLink">Clique para gerar seu boleto</a>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout justify-center>
              <v-form>
                <v-text-field
                  v-model="card.number"
                  :rules="cardNumberRules"
                  :counter="16"
                  label="Número"
                  mask="####.####.####.####"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.expiration"
                  :rules="expirationRules"
                  :counter="4"
                  label="Data de validade"
                  mask="##/####"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.cvc"
                  :rules="cvcRules"
                  :counter="3"
                  label="Cvv"
                  mask="###"
                  required
                ></v-text-field>
                <v-card-actions>
                  <v-btn
                    flat
                    class="primary--text"
                    @click.native="onCardInfoInputed">
                    Continuar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardHolderDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout justify-center>
              <v-form>
                <v-text-field
                  v-model="card.name"
                  label="Nome"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.birth_date"
                  label="Data de Nascimento"
                  mask="##/##/####"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.cpf"
                  label="CPF"
                  mask="###.###.###-##"
                  required
                ></v-text-field>
                <v-card-actions>
                  <v-btn
                    flat
                    class="primary--text"
                    @click.native="onCardHolderInputed">
                    Continuar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardHolderAddressDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout justify-center>
              <v-form>
                <v-text-field
                  v-model="card.street"
                  label="Rua"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.street_number"
                  label="Número"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.complement"
                  label="Complemento"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.cep"
                  label="CEP"
                  mask="##.###-###"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.city"
                  label="Cidade"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.estate"
                  label="Estado"
                  required
                ></v-text-field>
                <v-card-actions>
                  <v-btn
                    flat
                    class="primary--text"
                    @click.native="onCardRequestPayment">
                    Finalizar Pagamento
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardFinalizedDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout justify-center>
              <v-card-text>
                Compra realizada com susexo
              </v-card-text>
              <v-card-actions>
                <v-btn
                  flat
                  class="primary--text"
                  @click.native="onCompleteTransaction">
                  Voltar
                </v-btn>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    name: "PaymentDialogs",
    data() {
      return {
        dialogWidth: '500px',
        boletoDialog: false,
        cardDialog: false,
        cardHolderDialog: false,
        cardFinalizedDialog: false,
        cardHolderAddressDialog: false,
        card: {
        },
        cardHolder: null,
        cardNumberRules: [
          v => !!v || 'O número é necessário',
          // v => v.length === 16 || 'Número de caracteres inválido'
        ],
        expirationRules: [
          v => !!v || 'A data de validade é necessária',
          // v => v.length === 4 || 'Número de caracteres inválido'
        ],
        cvcRules: [
          v => !!v || 'A Cvv é necessário',
          // v => v.length === 3 || 'Número de caracteres inválido'
        ],
        boletoLink: null,
        loading: false,
        brand: null,
      }
    },
    computed: {
      paymentOptionsDialog() {
        return this.$store.getters.paymentOptionsDialog
      }
    },
    created() {
      let recaptchaScript = document.createElement('script')
      // recaptchaScript.setAttribute('src', 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
      //sandbox
      recaptchaScript.setAttribute('src', 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
      document.head.appendChild(recaptchaScript)
    },
    beforeMount() {
      this.$store.dispatch('requestPayPalSessionId')
        .then(response => {
          if (this.$store.getters.sessionId === '') {
            PagSeguroDirectPayment.setSessionId(response.id)
            this.$store.dispatch('setSessionId', response.id)
          } else {
            PagSeguroDirectPayment.setSessionId(this.$store.getters.sessionId)
          }
          this.$store.dispatch('setSessionId', response.id)
          var self = this
          PagSeguroDirectPayment.onSenderHashReady(function (response) {
            if (response.status == 'error') {
              console.log(response.message);
              return false;
            }

            var hash = response.senderHash//Hash estará disponível nesta variável.
            self.$store.dispatch('setHash', hash)
          });
        })
        .catch(error => {
          ''
        })
    },
    methods: {
      onBoletoSelected() {
        this.$store.dispatch('setPaymentOptionsDialog', false)
        this.boletoDialog = true
        this.loading = true

        let info = this.$store.getters.transaction
        let cartAmountString = '' + this.$store.getters.cartAmount
        let payload = {
          hash: this.$store.getters.hash,
          email: info.email,
          name: info.resp_name,
          phone_code: info.celphone.substring(0, 2),
          phone: info.celphone.substring(2, info.celphone.length),
          cpf: info.cpf,
          amount: cartAmountString[this.$store.getters.cartAmount.length - 2] === '.' ? cartAmountString : cartAmountString + '.00',
        }

        this.$store.dispatch('requestPayPalBoletoTransaction', payload).then(
          response => {
            this.loading = false
            this.boletoLink = response.paymentLink
            this.paymentCode = response.code
          })
        
        this.$emit('paymentRequested', {code: this.paymentCode})
      },
      dummyEmit () {
        let date = new Date()
        this.$emit('paymentRequested', {code: 'kljsaduh89sajmns' + date.getUTCMonth().toString() + date.getUTCDate().toString() + date.getUTCMinutes().toString() + date.getUTCSeconds().toString()})
      }
      ,
      onCardInfoInputed() {
        this.cardDialog = false
        this.cardHolderDialog = true
        PagSeguroDirectPayment.getBrand({
          cardBin: this.card.number,
          success: function(response) {
            this.brand = response
          },
          error: function(response) {
            //tratamento do erro
          },
          complete: function(response) {
            //tratamento comum para todas chamadas
          }
        });
      },
      onCardHolderInputed() {
        this.cardHolderDialog = false
        this.cardHolderAddressDialog = true
      },
      onCardSelected() {
        this.$store.dispatch('setPaymentOptionsDialog', false)
        this.cardDialog = true
      },
      onCompleteTransaction() {
        this.$router.push('/')
      },
      onCardRequestPayment() {
        let self = this
        self.$store.dispatch('setTest', 'teste')
        this.loading = true
        PagSeguroDirectPayment.createCardToken({
          cardNumber: this.card.number,
          brand: this.brand,
          cvv: this.card.cvc,
          expirationMonth: (this.card.expiration + '').substring(0, 2),
          expirationYear: (this.card.expiration + '').substring(2, (this.card.expiration + '').length),
          // expirationMonth: 8,
          // expirationYear: 2020,
          success: function(response) {
            self.token = response['card']['token']
            self.$store.dispatch('setTest', response)
            self.finalizeCardPayment()
          },
          error: function (response) {
            self.$store.dispatch('setTest', response)

          },
          complete: function (response) {
            self.$store.dispatch('setTest', response)
            // self.finalizeCardPayment()
          }
        });
        // this.loading = true
      },
      finalizeCardPayment() {
        let info = this.$store.getters.transaction
        let cartAmountString = '' + this.$store.getters.cartAmount
        let payload = {
          hash: this.$store.getters.hash,
          token: this.token,
          email: info.email,
          name: info.resp_name,
          phone_code: info.celphone.substring(0, 2),
          phone: info.celphone.substring(2, info.celphone.length),
          cpf: info.cpf,
          amount: cartAmountString[this.$store.getters.cartAmount.length - 2] === '.' ? cartAmountString : cartAmountString + '.00',
          card_holder_name: this.card.name,
          card_holder_birth_date: this.card.birth_date,
          card_holder_cpf: this.card.cpf,
          street: this.card.street,
          number: this.card.street_number,
          cep: this.card.cep,
          city: this.card.city,
          estate: this.card.estate,
          complement: this.card.complement
        }

        this.$store.dispatch('requestPayPalCardTransaction', payload).then(
          response => {
            this.loading = false
            // this.boletoLink = response
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
