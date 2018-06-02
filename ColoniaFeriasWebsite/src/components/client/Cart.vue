<template>
  <v-slide-y-transition>
    <v-container>
      <v-layout row>
        <v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>
          <h1 class="primary--text">Nova Inscrição</h1>
        </v-flex>
      </v-layout>
      <form
        @submit.prevent="onSubmitForm">
      <!-- <form> -->
        <v-layout row>
          <v-flex xs12>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="name"
                  label="Nome do Aluno"
                  :rules="nameRules"
                  id="name"
                  v-model="name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="age"
                  label="Idade"
                  id="age"
                  mask="##"
                  :rules="ageRules"
                v-model="age"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="name_resp"
                  label="Nome do Responsável"
                  :rules="nameRules"
                  id="name_resp"
                  v-model="name_resp"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="cpf"
                  label="CPF do Responsável"
                  mask="###.###.###-##"
                  :rules="cpfRules"
                  id="cpf"
                  v-model="cpf"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="tel"
                  label="DDD + Telefone"
                  mask="(##)####-####"
                  id="tel"
                  v-model="tel"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="celphone"
                  label="DDD + Celular"
                  mask="(##)#####-####"
                  id="celphone"
                  :rules="celRules"
                  v-model="celphone"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="email"
                  label="E-Mail"
                  :rules="emailRules"
                  id="email"
                  v-model="email"></v-text-field>
              </v-flex>
            </v-layout>

            <!-- <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-select
              :items="teste"
              v-model="selection"
              label="Colonias"
              single-line
              ></v-select>
            </v-flex>
          </v-layout> -->

          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="primary"
                 :disabled="!formIsValid"
                 type="submit">Submeter
          </v-btn>
        </v-card-actions>
      </form>
      <!-- <v-alert v-model="showAlert"
               type="error"
               dismissible
                transition="slide-y-reverse-transition">
        {{errorMessage}}
      </v-alert> -->
    </v-container>
  </v-slide-y-transition>

</template>

<script>

export default {
    data() {
      return {
        // teste: [
        //   this.$store.getters.colonies[0].plans[0].price,
        //   this.$store.getters.cart[0].dates[0].turno,
        //   this.$store.getters.colonies[2].title,
        //   this.$store.getters.colonies[3].title,
        // ],
        selection: '',
        name: 'jnsadjsa',
        nameRules: [v => !!v || 'Nome é obrigatório'],
        age: '34',
        ageRules: [
        v => !!v || 'Idade é obrigatória'
      ],
        name_resp: 'cascsa',
        cpf: '34554366659',
        cpfRules: [
        v => !!v || 'CPF é obrigatório',
        v => v.length == 11 || 'CPF precisa ter 11 dígitos'
      ],
        tel: '',
        celphone: '887678887',
        celRules: [
        v => !!v || 'Celular é obrigatório',
        v => v.length == 11 || 'Celular precisa ter 11 dígitos'
      ],
        email: '32423@gmail.com',
        emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail precisa ser válido'
      ]
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' &&
          this.age !== '' &&
          this.name_resp !== '' &&
          this.celphone !== '' &&
          this.email !== '' &&
          this.cpf !== ''
        },

        colonies() {
          return this.$store.getters.colonies
        }
      },
  created() {
    let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute('src', 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js')
    //sandbox
    recaptchaScript.setAttribute('src', 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
    document.head.appendChild(recaptchaScript)
  },
    methods: {

      onSubmitForm () {
        console.log('çomecou')
        let payload = {
          checkout: {
            sender: {
              name: this.name_resp,
              email: this.email,
              phone: {
                areaCode: this.celphone.substring(0, 2),
                number: this.celphone.substring(2, this.celphone.length)
              },
              documents: {
                document: {
                  type: 'CPF',
                  value: this.cpf
                }
              },
            },
            currency: 'BRL',
            items: {
              item: {
                id: 0,
                description: 'descricao',
                amount: '99.99',
                quantity: 1,
              }
            },
            redirectURL: 'localhost:8080'
          }
        }
        console.log('mandando dispatch')
        this.$store.dispatch('requestPayPalSessionId', payload)
          .then( response => {
            console.log('idazao: ' + response.id)
            PagSeguroDirectPayment.setSessionId(response.id)
            PagSeguroDirectPayment.onSenderHashReady(function(response){
              if(response.status == 'error') {
                console.log(response.message);
                return false;
              }

              var hash = response.senderHash;//Hash estará disponível nesta variável.
              console.log('hash: ' + hash)
              PagSeguroDirectPayment.getPaymentMethods({
                amount: this.$store.getters.cartAmount,
                success: function(response) {
                  console.log('methods: ' + response)
                },
                error: function(response) {
                  //tratamento do erro
                },
                complete: function(response) {
                  //tratamento comum para todas chamadas
                }
              });
            });
          })
          .catch( error => {
''
          })
      },

      onCreateUser() {
        if (!this.formIsValid) {
          return
        }

        PagSeguroLightbox('2e576af2d1b34fa7a6580d3dc7c8311a')
        return

        let responsable = {
          name_resp: this.name_resp,
          cpf: this.cpf,
          tel: this.tel,
          celphone: this.celphone,
          email: this.email
        }

        let days = []

        let colonyId = []

        for(let j = 0; j < this.$store.getters.cart.length; j++){

        for(let i = 0; i < this.$store.getters.cart[j].dates.length; i++){

          let morning = false
          let afternoon = false

          if(this.$store.getters.cart[j].dates[i].turno === 'Manhã'){
            morning = true
          }

          if(this.$store.getters.cart[j].dates[i].turno === 'Tarde'){
            afternoon = true
          }

          days.push({day: this.$store.getters.cart[j].dates[i].date.getFullYear() + '-'
               + (this.$store.getters.cart[j].dates[i].date.getMonth() + 1) + '-' + this.$store.getters.cart[j].dates[i].date.getUTCDate(),
              morning: morning,afternoon: afternoon})

        }

        let userData = {
          name: this.name,
          age: this.age,
          responsable,
          days,
          colonyId: this.$store.getters.cart[j].colonyId
        }

        this.$store.dispatch('createColonyParticipant', userData)

        days.splice(0,this.$store.getters.cart[j].dates.length)

      }
        this.$router.push('/')
      },


    // },
    // components: {
    //   DatePicker,
    //   WeekDaysPicker,
    //   PlanAdder
    // },
    // beforeMount () {
    //   let selectedColony = this.$store.getters.selectedColony
    //   if (selectedColony != null) {
    //     this.startDate = selectedColony.start_date
    //     this.endDate = selectedColony.end_date
    //     this.weekDaysSelected = selectedColony.week_days
    //   }
    // }
  }

}

</script>



<style scoped>
  .fade {
    opacity: 1;
    transition: all 0.3s ease;
  }

  .fade.fade-enter, .fade.fade-leave {
    opacity: 0
  }

  /* delay here */
  .fade.delay {
    transition-delay: 0.3s;
  }
</style>
