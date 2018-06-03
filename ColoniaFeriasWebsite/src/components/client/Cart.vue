<template>
  <!--<v-slide-y-transition>-->
  <!--<v-container>-->
  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>-->
  <!--<h1 class="primary&#45;&#45;text">Nova Inscrição</h1>-->
  <!--</v-flex>-->
  <!--</v-layout>-->
  <!--<form-->
  <!--@submit.prevent="onSubmitForm">-->
  <!--&lt;!&ndash; <form> &ndash;&gt;-->
  <!--<v-layout row>-->
  <!--<v-flex xs12>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="name"-->
  <!--label="Nome do Aluno"-->
  <!--:rules="nameRules"-->
  <!--id="name"-->
  <!--v-model="name"-->
  <!--&gt;</v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="age"-->
  <!--label="Idade"-->
  <!--id="age"-->
  <!--mask="##"-->
  <!--:rules="ageRules"-->
  <!--v-model="age"></v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="name_resp"-->
  <!--label="Nome do Responsável"-->
  <!--:rules="nameRules"-->
  <!--id="name_resp"-->
  <!--v-model="name_resp"></v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="cpf"-->
  <!--label="CPF do Responsável"-->
  <!--mask="###.###.###-##"-->
  <!--:rules="cpfRules"-->
  <!--id="cpf"-->
  <!--v-model="cpf"></v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="tel"-->
  <!--label="DDD + Telefone"-->
  <!--mask="(##)####-####"-->
  <!--id="tel"-->
  <!--v-model="tel"></v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="celphone"-->
  <!--label="DDD + Celular"-->
  <!--mask="(##)#####-####"-->
  <!--id="celphone"-->
  <!--:rules="celRules"-->
  <!--v-model="celphone"></v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-text-field-->
  <!--name="email"-->
  <!--label="E-Mail"-->
  <!--:rules="emailRules"-->
  <!--id="email"-->
  <!--v-model="email"></v-text-field>-->
  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--&lt;!&ndash; <v-layout row>-->
  <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
  <!--<v-select-->
  <!--:items="teste"-->
  <!--v-model="selection"-->
  <!--label="Colonias"-->
  <!--single-line-->
  <!--&gt;</v-select>-->
  <!--</v-flex>-->
  <!--</v-layout> &ndash;&gt;-->

  <!--</v-flex>-->
  <!--</v-layout>-->

  <!--<v-card-actions>-->
  <!--<v-spacer></v-spacer>-->
  <!--<v-btn flat-->
  <!--color="primary"-->
  <!--:disabled="!formIsValid"-->
  <!--type="submit">Submeter-->
  <!--</v-btn>-->
  <!--</v-card-actions>-->
  <!--</form>-->
  <!--&lt;!&ndash; <v-alert v-model="showAlert"-->
  <!--type="error"-->
  <!--dismissible-->
  <!--transition="slide-y-reverse-transition">-->
  <!--{{errorMessage}}-->
  <!--</v-alert> &ndash;&gt;-->
  <!--<v-slide-x-transition>-->
  <!--<payment-dialogs></payment-dialogs>-->
  <!--</v-slide-x-transition>-->
  <!--</v-container>-->
  <!--</v-slide-y-transition>-->

  <div class="cart">
    <h1 class="title">Seu Carrinho</h1>
    <p v-show="!cart.length">
      <i>Seu carrinho está vazio!</i>
      <router-link to="/">Ver planos</router-link>
    </p>
    <table class="table is-striped" v-show="cart.length">
      <thead>
      <tr>
        <td>Plano</td>
        <td>Preço</td>
        <td>Criança</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in cart">
        <td>Plano de {{ p.plan.num_days }} turno{{p.plan.num_days > 1 ? 's':''}}</td>
        <td> R${{p.plan.price/100}}</td>
        <td>
          <v-select :items="kids"></v-select>
          <inscricao-dialog></inscricao-dialog>
        </td>
        <td>
          <v-btn color="red" @click="removePlan">Excluir</v-btn>
        </td>
      </tr>
      <tr>
        <td><b>Total:</b></td>

        <td><b>R${{ cartTotal }}</b></td>
      </tr>
      </tbody>
    </table>
    <p>
      <v-btn v-show="cart.length" round @click='checkout'>Pagar</v-btn>
    </p>
  </div>
</template>
<script>
  import PaymentDialogs from '../models/PaymentDialogs'

  // export default {
  //
  //   data() {
  //     return {
  //       // teste: [
  //       //   this.$store.getters.colonies[0].plans[0].price,
  //       //   this.$store.getters.cart[0].dates[0].turno,
  //       //   this.$store.getters.colonies[2].title,
  //       //   this.$store.getters.colonies[3].title,
  //       // ],
  //       selection: '',
  //       name: 'jnsadjsa',
  //       nameRules: [v => !!v || 'Nome é obrigatório'],
  //       age: '34',
  //       ageRules: [
  //       v => !!v || 'Idade é obrigatória'
  //     ],
  //       name_resp: 'cascsa fsdfds',
  //       cpf: '01212944208',
  //       cpfRules: [
  //       v => !!v || 'CPF é obrigatório',
  //       v => v.length == 11 || 'CPF precisa ter 11 dígitos'
  //     ],
  //       tel: '',
  //       celphone: '887678887',
  //       celRules: [
  //       v => !!v || 'Celular é obrigatório',
  //       v => v.length == 11 || 'Celular precisa ter 11 dígitos'
  //     ],
  //       email: '32423@gmail.com',
  //       emailRules: [
  //       v => !!v || 'E-mail é obrigatório',
  //       v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail precisa ser válido'
  //     ]

  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        kids: ['new kid', 'old kid'] //Funciona e está associado ao select
      }
    },
    computed: {
      cart() {
        return this.$store.getters.cart
      },
      cartTotal() {
        let total = 0
        for (let i in this.cart) {
          total = total + parseInt(this.cart[i].plan.price)
        }
        return (total / 100).toString().replace('.', ',')
      },
    },
    // computed: {
    //   formIsValid () {
    //     return this.name !== '' &&
    //       this.age !== '' &&
    //       this.name_resp !== '' &&
    //       this.celphone !== '' &&
    //       this.email !== '' &&
    //       this.cpf !== ''
    //     },
    //
    //     colonies() {
    //       return this.$store.getters.colonies
    //     }
    //   },
    // created() {
    //   let recaptchaScript = document.createElement('script')
    //   // recaptchaScript.setAttribute('src', 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js')
    //   //sandbox
    //   recaptchaScript.setAttribute('src', 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
    //   document.head.appendChild(recaptchaScript)
    // },
    methods: {

      priceAsInt(n) {
        price = parseInt(n)
        return (price / 100).toString().replace('.', ',')
      },
      checkout() {
        alert('Pagar')
      },
      removePlan() {
        this.$store.dispatch('removePlanFromCart', this.cart.plan)
      },

      onSubmitForm() {
        console.log('çomecou')
        let payload = {
          // child_name: this.name,
          // child_age: this.age,
          resp_name: this.name_resp,
          celphone: this.celphone,
          email: this.email,
          cpf: this.cpf
        }
        this.$store.dispatch('setTransactionInfo', payload)
        this.$store.dispatch('setPaymentOptionsDialog', true)
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

        for (let j = 0; j < this.$store.getters.cart.length; j++) {

          for (let i = 0; i < this.$store.getters.cart[j].dates.length; i++) {

            let morning = false
            let afternoon = false

            if (this.$store.getters.cart[j].dates[i].turno === 'Manhã') {
              morning = true
            }

            if (this.$store.getters.cart[j].dates[i].turno === 'Tarde') {
              afternoon = true
            }

            days.push({
              day: this.$store.getters.cart[j].dates[i].date.getFullYear() + '-'
              + (this.$store.getters.cart[j].dates[i].date.getMonth() + 1) + '-' + this.$store.getters.cart[j].dates[i].date.getUTCDate(),
              morning: morning, afternoon: afternoon
            })

          }

          let userData = {
            name: this.name,
            age: this.age,
            responsable,
            days,
            colonyId: this.$store.getters.cart[j].colonyId
          }

          this.$store.dispatch('createColonyParticipant', userData)

          days.splice(0, this.$store.getters.cart[j].dates.length)

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
    },
    components: {
      PaymentDialogs,
    },
  }
</script>
