<template>
  <v-container>
    <v-container>
      <v-dialog v-if="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-dialog>
      <v-dialog v-model="paymentOptionsDialog" :max-width="dialogWidth" persistent>
        <v-card height="300px">
          <v-container class="text-xs-center">
            <v-layout row wrap>
              <h2 class="mt-4">Pagamento por Boleto</h2>
              <v-spacer></v-spacer>
              <img src="../../assets/pagseguro_logo.png" alt="Banner PagSeguro"
                   title="Compre com PagSeguro e fique sossegado">
            </v-layout>
            <v-divider class="primary mb-3"></v-divider>
            <v-layout row wrap justify-center class="mt-5 pt-3">
              <v-layout row wrap justify-center>
                <v-flex xs12>
                  <v-btn color="transparent" flat @click.native="onBoletoSelected">
                    <img src="../../assets/boleto_icon.png">
                  </v-btn>
                </v-flex>
                <span class="mt-5">Boleto</span>
              </v-layout>
              <v-layout row wrap justify-center>
                <v-flex xs12>
                  <v-btn color="transparent" flat @click.native="onCardSelected">
                    <img src="../../assets/credit_card_icon.png">
                  </v-btn>
                </v-flex>
                <span class="mt-5">Cartão de Crédito</span>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="boletoDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout row wrap>
              <h2 class="mt-4">Pagamento por Boleto</h2>
              <v-spacer></v-spacer>
              <img src="../../assets/pagseguro_logo.png" alt="Banner PagSeguro"
                   title="Compre com PagSeguro e fique sossegado">
            </v-layout>
            <v-divider class="primary mb-3"></v-divider>
            <v-layout row wrap justify-center>
              <v-flex xs6>
                <v-layout row wrap justify-center class="mb-3">
                  <img src="../../assets/boleto_icon.png">
                </v-layout>
                <v-layout row wrap justify-center>
                  <transition name="fade" mode="out-in">
                    <v-progress-circular :size="50" indeterminate color="primary" v-if="loading"></v-progress-circular>
                    <button style="background: none;border: none;" @click="openBoleto" class="link primary--text"
                            v-else>
                      Clique para gerar seu boleto
                    </button>
                  </transition>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap justify-center class="mb-3">
                  <img src="../../assets/contract_icon.png">
                </v-layout>
                <v-layout row wrap justify-center>
                  <transition name="fade" mode="out-in">
                    <v-progress-circular :size="50" indeterminate color="primary" v-if="loading"></v-progress-circular>
                    <v-flex v-else>
                      <button style="background: none;border: none;" @click="openContract" class="link primary--text"
                      >
                        Clique para imprimir o contrato
                      </button>
                      <button style="background: none;border: none;" @click="openContract2" class="link primary--text"
                      >
                        Clique para imprimir o Termo de Adesão
                      </button>
                    </v-flex>
                  </transition>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardDialog" :max-width="dialogWidth">
        <v-card>
          <v-container>
            <v-layout row wrap>
              <h2 class="mt-4">Dados do Cartão</h2>
              <v-spacer></v-spacer>
              <img src="../../assets/pagseguro_logo.png" alt="Banner PagSeguro"
                   title="Compre com PagSeguro e fique sossegado">
            </v-layout>
            <v-divider class="primary"></v-divider>
            <v-layout justify-center>
              <v-flex>
                <v-form
                  lazy-validation>
                  <v-text-field
                    v-model="card.number"
                    :rules="cardNumberRules"
                    :counter="16"
                    validate-on-blur
                    label="Número do Cartão"
                    mask="####.####.####.####"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="card.name"
                    label="Nome do Titular"
                    required
                  ></v-text-field>
                  <v-layout row wrap>
                    <v-flex sm5 mr-1>
                      <v-text-field
                        v-model="card.expiration"
                        :rules="expirationRules"
                        :counter="4"
                        validate-on-blur
                        label="Data de validade"
                        mask="##/##"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex sm5 ml-1>
                      <v-text-field
                        v-model="card.cvc"
                        :rules="cvcRules"
                        :counter="3"
                        validate-on-blur
                        label="Cvv"
                        mask="###"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-layout row wrap>
                      <v-spacer></v-spacer>
                      <v-progress-circular v-if="cardNumberLoading" indeterminate color="primary"></v-progress-circular>
                      <v-btn
                        flat
                        class="primary--text ml-5"
                        @click.native="onCardInfoInputed">
                        Continuar
                      </v-btn>
                    </v-layout>
                  </v-card-actions>
                </v-form>
                <v-alert v-model="failure" type="error" dismissible>
                  {{ failureMessage }}
                </v-alert>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardHolderDialog" :max-width="dialogWidth">
        <v-card>
          <v-container class="text-xs-center">
            <v-layout row wrap>
              <h2 class="mt-4">Dados do Titular</h2>
              <v-spacer></v-spacer>
              <img src="../../assets/pagseguro_logo.png" alt="Banner PagSeguro"
                   title="Compre com PagSeguro e fique sossegado">
            </v-layout>
            <v-divider class="primary"></v-divider>
            <v-layout justify-center>
              <v-flex>
                <v-checkbox
                  label="Mesmo do responsável"
                  v-model="sameAsResponsable"></v-checkbox>
                <v-form>
                  <v-layout row wrap>
                    <v-flex sm5>
                      <v-layout row wrap>
                        <v-text-field
                          v-model="card.cep"
                          label="CEP"
                          @change="onCepChange"
                          mask="##.###-###"
                          required
                        ></v-text-field>
                        <v-progress-circular v-if="cepLoading" indeterminate
                                             color="primary"></v-progress-circular>
                      </v-layout>
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
                        v-model="card.city"
                        label="Cidade"
                        required
                      ></v-text-field>
                      <v-select
                        :items="estates"
                        v-model="card.estate"
                        label="Estado"
                        single-line
                      ></v-select>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex sm5>
                      <v-text-field
                        v-model="card.cpf"
                        label="CPF"
                        mask="###.###.###-##"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="card.birth_date"
                        label="Data de Nascimento"
                        mask="##/##/####"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      class="primary--text"
                      @click.native="onCardHolderInputed">
                      Continuar
                    </v-btn>
                  </v-card-actions>
                </v-form>
                <v-alert v-model="failure" type="error" dismissible>
                  {{ failureMessage }}
                </v-alert>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardConfirmationDialog">
        <v-card>
          <v-container>
            <v-layout row wrap>
              <h2 class="mt-4">Confimação dos dados</h2>
              <v-spacer></v-spacer>
              <img src="../../assets/pagseguro_logo.png" alt="Banner PagSeguro"
                   title="Compre com PagSeguro e fique sossegado">
            </v-layout>
            <v-divider class="primary mb-3"></v-divider>
            <v-layout row wrap>
              <v-flex>
                <v-layout>
                  <v-flex sm5>
                    <h3 class="mb-2">Dados do Cartão</h3>
                    <v-card
                      raised
                      height="160px">
                      <v-flex sm12>
                        <v-card-text>
                          Número do cartão: ####.####.####.{{ card.number.substring(card.number.length - 4,
                          card.number.length) }}
                        </v-card-text>
                        <v-card-text>
                          Nome do Titular: {{ card.name }}
                        </v-card-text>
                        <v-layout row wrap>
                          <v-flex sm5>
                            <v-card-text>
                              Validade: {{ card.expiration }}
                            </v-card-text>
                          </v-flex>
                          <v-flex sm5>
                            <v-card-text>
                              CVV: {{ card.cvc }}
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-card>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex sm5>
                    <h3 class="mb-2">Dados do Titular</h3>
                    <v-card
                      height="160px"
                      raised>
                      <v-flex sm12>
                        <v-card-text>
                          Nome: {{ card.name}}
                        </v-card-text>
                        <v-card-text>
                          CPF: {{ card.cpf }}
                        </v-card-text>
                      </v-flex>
                    </v-card>
                  </v-flex>
                </v-layout>


                <v-layout>
                  <v-flex sm12 class="mt-3">
                    <h3 class="mb-2">Endereço de cobrança</h3>
                    <v-card
                      raised>
                      <v-flex sm12>
                        <v-card-text>
                          Rua: {{ card.street}}, {{ card.street_number }}
                        </v-card-text>
                        <v-card-text>
                          Cep: {{ card.cep }}
                        </v-card-text>
                        <v-card-text>
                          Complemento: {{ card.complement }}
                        </v-card-text>
                        <v-layout row wrap>
                          <v-flex sm5>
                            <v-card-text>
                              Cidade: {{ card.city }}
                            </v-card-text>
                          </v-flex>
                          <v-flex sm5>
                            <v-card-text>
                              Estado: {{ card.estate }}
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn
                flat
                class="primary--text mt-3"
                @click.native="onBackDialog">
                Voltar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                flat
                class="primary--text mt-3"
                @click.native="onCardRequestPayment">
                Finalizar Pagamento
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cardFinalizedDialog" :max-width="dialogWidth" persistent>
        <v-card height="350px">
          <v-container class="text-xs-center">
            <v-layout row wrap justify-center class="mt-3">
              <transition name="fade" mode="out-in">
                <v-progress-circular v-if="loading" :size="50" indeterminate color="primary"></v-progress-circular>
                <v-icon size="60" v-else-if="paymentResult" class="primary--text">check_circle_outline</v-icon>
                <v-icon size="60" v-else="paymentResult" class="error--text">error_outline</v-icon>
              </transition>
            </v-layout>
            <v-layout row wrap justify-center>
              <transition name="fade" mode="out-in">
                <v-card-text v-bind:key="resultText">
                  {{ resultText }}
                </v-card-text>
              </transition>
            </v-layout>
            <v-slide-x-transition>
              <v-card-text v-if="paymentResult">
                <v-flex xs12>
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/termo_adesao_colonia_ferias.pdf?alt=media&token=7615d77e-a90d-4e8f-919a-e743d5dc004c">Clique
                    aqui para imprimir seu contrato</a>
                  <a href="http://voltzparkour.com/wp-content/uploads/2017/12/ADESAOCOLONIA.pdf">Clique aqui para
                    imprimir seu Termo de Adesão</a>
                </v-flex>
              </v-card-text>
            </v-slide-x-transition>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!loading && paymentResult"
              flat
              class="primary--text"
              @click.native="onCompleteTransaction">
              Voltar
            </v-btn>
            <v-btn
              v-else-if="!loading && !paymentResult"
              flat
              class="primary--text"
              @click.native="onTransactionFailed">
              Voltar
            </v-btn>
          </v-card-actions>
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
        dialogWidth: '600px',
        failure: false,
        failureMessage: '',
        boletoDialog: false,
        cardDialog: false,
        cardHolderDialog: false,
        cardFinalizedDialog: false,
        cardConfirmationDialog: false,
        paymentResult: false,
        resultText: 'Processando Pagamento',
        card: {
          number: '',
          cvc: '',
          expiration: '',
          name: '',
          street: ''
        },
        cardHolder: null,
        cardNumberRules: [
          v => !!v || 'O número é necessário',
          v => v.length === 16 || 'Número Incorreto'
        ],
        expirationRules: [
          v => !!v || 'A data de validade é necessária',
          v => v.length === 4 || 'Número de caracteres inválido'
        ],
        cvcRules: [
          v => !!v || 'A Cvv é necessário',
          //v => v.length === 3 || 'Número de caracteres inválido'
        ],
        boletoLink: null,
        loading: false,
        cepLoading: false,
        cardNumberLoading: false,
        brand: null,
        sameAsResponsable: false,
      }
    },
    computed: {
      paymentOptionsDialog() {
        return this.$store.getters.paymentOptionsDialog
      },
      estates() {
        return this.$store.getters.estates
      },
      expirationGetter() {
        let month = this.card.expiration.substring(0, 2)
        let year = this.card.expiration.substring(2, 4)
        return month + '20' + year
      }
    },
    created() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
      //sandbox
      // recaptchaScript.setAttribute('src', 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
      document.head.appendChild(recaptchaScript)

    },
    beforeMount() {
      this.$store.dispatch('requestPayPalSessionId')
        .then(response => {
          // if (this.$store.getters.sessionId === '') {
          // console.log('Veio setar session id: ' + response.id)
          PagSeguroDirectPayment.setSessionId(response.id)
          // this.$store.dispatch('setSessionId', response.id)
          // } else {
          //   PagSeguroDirectPayment.setSessionId(this.$store.getters.sessionId)
          // }
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
    watch: {
      sameAsResponsable: function (value) {
        if (value) {
          this.card.cpf = this.$store.getters.transaction.cpf
        }
      }
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
          name: info.name,
          phone_code: info.cel.substring(0, 2),
          phone: info.cel.substring(2, info.cel.length),
          cpf: info.cpf,
          amount: cartAmountString
        }

        // let self = this
        // setTimeout(function () {
        //   self.loading = false
        //   self.paymentResult = true
        //   self.resultText = 'Pagamento realizado com sucesso'
        // }, 3000)
        this.$store.dispatch('requestPayPalBoletoTransaction', payload).then(
          response => {
            this.loading = false
            this.boletoLink = response.paymentLink
            this.paymentCode = response.transactionCode
            this.$emit('paymentRequested', {code: this.paymentCode})
          })

      },
      cardInfoIsValid() {
        let date = new Date()
        if (this.card.name.split(' ') < 2) {
          this.failure = true
          this.failureMessage = 'Nome do portador do cartão inválido'
          return false
        } else if ((this.expirationGetter + '').length < 6) {
          this.failure = true
          this.failureMessage = 'Expiração inválido'
          return false
        } else if (parseInt((this.expirationGetter+ '').substring(0, 2)) > 12 || parseInt((this.expirationGetter + '').substring(0, 2)) < 1) {
          this.failure = true
          this.failureMessage = 'Mês de expiração inválido'
          return false
        } else if (parseInt((this.expirationGetter + '').substring(2, 6)) < date.getFullYear()) {
          this.failure = true
          this.failureMessage = 'Ano de expiração inválido'
          return false
        } else if ((this.card.cvc + '').length != 3) {
          this.failure = true
          this.failureMessage = 'Cvv inválido'
          return false
        }
        return true
      },
      onCardInfoInputed() {
        var self = this
        this.cardNumberLoading = true
        if (this.cardInfoIsValid()) {
          PagSeguroDirectPayment.getBrand({
            cardBin: self.card.number,
            success: function (response) {
              self.brand = response.brand.name
              self.cardNumberLoading = false
              self.failure = false
              self.cardDialog = false
              self.cardHolderDialog = true
            },
            error: function (response) {
              self.failure = true
              self.failureMessage = 'Número do cartão inválido'
              self.cardNumberLoading = false
              self.cardDialog = true
              self.cardHolderDialog = false
            },
            complete: function (response) {
              //tratamento comum para todas chamadas
            }
          })
        }
      },
      cardHolderInfoIsvalid() {
        let date = new Date()
        let birthDateDay = parseInt((this.card.birth_date + '').substring(0, 2))
        let birthDateMonth = parseInt((this.card.birth_date + '').substring(2, 4))
        let birthDateYear = parseInt((this.card.birth_date + '').substring(4, 8))

        if (this.card.birth_date === undefined || (this.card.birth_date + '').length < 8) {
          this.failure = true
          this.failureMessage = 'Data de nascimento inválida'
          return false
        } else if (birthDateDay > 31 || birthDateDay < 1) {
          this.failure = true
          this.failureMessage = 'Dia de nascimento inválido'
          return false
        } else if (birthDateMonth > 12 || birthDateMonth < 1) {
          this.failure = true
          this.failureMessage = 'Mês de nascimento inválido'
          return false
        } else if (birthDateYear > date.getFullYear() || birthDateYear < 1900) {
          this.failure = true
          this.failureMessage = 'Ano de nascimento inválido'
          return false
        } else if (this.card.cpf === undefined || this.card.cpf.length != 11) {
          this.failure = true
          this.failureMessage = 'CPF inválido'
          return false
        } else if (this.card.estate === undefined || this.card.estate.length !== 2) {
          this.failure = true
          this.failureMessage = 'Estado inválido'
          return false
        } else if (this.card.city === undefined || this.card.city.length < 1) {
          this.failure = true
          this.failureMessage = 'Cidade inválida'
          return false
        } else if (this.card.street_number === undefined || (this.card.street_number + '').length < 1) {
          this.failure = true
          this.failureMessage = 'Número inválido'
          return false
        } else if (this.card.street === undefined || this.card.street.length < 1) {
          this.failure = true
          this.failureMessage = 'Rua inválido'
          return false
        } else if (this.card.cep === undefined || (this.card.cep + '').length != 8) {
          this.failure = true
          this.failureMessage = 'CEP inválido'
          return false
        }
        return true
      },
      onCardHolderInputed() {
        if (this.cardHolderInfoIsvalid()) {
          this.cardHolderDialog = false
          this.cardConfirmationDialog = true
        }
      },
      onCardSelected() {
        this.$store.dispatch('setPaymentOptionsDialog', false)
        this.cardDialog = true
      },
      onCompleteTransaction() {
        this.$router.push('/')
      },
      onCardRequestPaymentt() {
        this.loading = true
        this.cardConfirmationDialog = false
        this.cardFinalizedDialog = true
        let self = this
        setTimeout(function () {
          self.loading = false
          self.paymentResult = true
          self.resultText = 'Pagamento realizado com sucesso'
        }, 3000)
      },
      onTransactionFailed() {
        this.cardFinalizedDialog = false
      },
      onCardRequestPayment() {
        this.loading = true
        this.cardConfirmationDialog = false
        this.cardFinalizedDialog = true
        let self = this
        self.$store.dispatch('setTest', 'teste')

        PagSeguroDirectPayment.createCardToken({
          cardNumber: self.card.number,
          cvv: self.card.cvc,
          expirationMonth: parseInt((self.expirationGetter + '').substring(0, 2)),
          expirationYear: parseInt((self.expirationGetter + '').substring(2, (self.expirationGetter + '').length)),
          brand: self.brand,
          success: function (response) {
            self.token = response['card']['token']
            self.$store.dispatch('setTest', response)
            console.log('sucess: ' + response)
            self.finalizeCardPayment()
          },
          error: function (response) {
            self.$store.dispatch('setTest', response)
            console.log('failure: ')
            console.log(response)

          },
          complete: function (response) {
            self.$store.dispatch('setTest', response)
            console.log('complete: ')
            console.log(response)
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
          name: info.name,
          phone_code: info.cel.substring(0, 2),
          phone: info.cel.substring(2, info.cel.length),
          cpf: info.cpf,
          amount: cartAmountString,
          card_holder_name: this.card.name,
          card_holder_birth_date: (this.card.birth_date + '').substring(0, 2) + '/' + (this.card.birth_date + '').substring(2, 4) + '/' + (this.card.birth_date + '').substring(4, 8),
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
            this.$emit('paymentRequested', {code: response.transactionCode})
            this.loading = false
            this.paymentResult = true
            this.resultText = 'Pagamento realizado com sucesso'
            // this.boletoLink = response
          }
        ).catch(error => {
          this.loading = false
          this.paymentResult = false
          this.resultText = 'Houve um erro ao processar o seu pagamento, tentar novamente mais tarde'
        })
      },
      onBackDialog() {
        this.cardConfirmationDialog = false
        this.cardDialog = true
      },
      openBoleto() {
        window.open(this.boletoLink)
      },
      openContract() {
        window.open('http://voltzparkour.com/wp-content/uploads/2017/12/ADESAOCOLONIA.pdf')
      },
      openContract2() {
        window.open('https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/termo_adesao_colonia_ferias.pdf?alt=media&token=7615d77e-a90d-4e8f-919a-e743d5dc004c')

      },
      onCepChange(change) {
        console.log('cep change')
        this.cepLoading = true
        let self = this
        this.$store.dispatch('getAddressByCEP', change).then(
          function (response) {
            let address = response.data
            self.card.street = address.logradouro
            self.card.city = address.localidade
            self.card.estate = address.uf
            self.cepLoading = false
          }
        ).catch(
          function (error) {

          }
        )
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
