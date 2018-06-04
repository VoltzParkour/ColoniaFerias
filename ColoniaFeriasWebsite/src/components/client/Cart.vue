<template>
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
        <td>Usuário</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(p,j) in cart" :key="j">
        <td>Plano de {{ p.plan.num_days }} turno{{p.plan.num_days > 1 ? 's':''}}</td>
        <td> R${{p.plan.price/100}}</td>
        <td>
          <v-select :items="kids"
          v-model="p.selectedUser"
          item-text="name"
          label="Selecione o usuário!"
          ></v-select>
        </td>
        <td>
          <inscricao-dialog @addUser="addUser"></inscricao-dialog>
          <v-btn flat class="red--text" @click="removePlan">Remover plano</v-btn>
        </td>

      </tr>
      <tr>
        <td><b>Total:</b></td>

        <td><b>R${{ cartTotal }}</b></td>
      </tr>
      </tbody>
    </table>
    
    <span v-show="cart.length">
    <v-layout row>
      <v-flex xs10 offset-xs1 sm10 offset-sm1>
        <v-text-field
          name="name_resp"
          label="Nome do Responsável"
          :rules="nameRules"
          id="name_resp"
          v-model="responsable.name"></v-text-field>
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
          v-model="responsable.cpf"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs10 offset-xs1 sm10 offset-sm1>
        <v-text-field
          name="tel"
          label="DDD + Telefone"
          mask="(##)####-####"
          id="tel"
          v-model="responsable.tel"></v-text-field>
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
          v-model="responsable.cel"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs10 offset-xs1 sm10 offset-sm1>
        <v-text-field
          name="email"
          label="E-Mail"
          :rules="emailRules"
          id="email"
          v-model="responsable.email"></v-text-field>
      </v-flex>
    </v-layout>
    </span>

    <p>
      <v-btn v-show="cart.length" round @click='checkout'>Finalizar compra</v-btn>
    </p>
    <PaymentDialogs></PaymentDialogs>
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
        kids: [],
        responsable: 
        {
          name: '',
          email: '',
          cpf: '',
          tel: '',
          cel: ''
        },
        nameRules: [v => !!v || 'Nome é obrigatório'],
        ageRules: 
        [
          v => !!v || 'Idade é obrigatória'
        ],
        cpfRules:
        [
          v => !!v || 'CPF é obrigatório',
          v => v.length == 11 || 'CPF precisa ter 11 dígitos'
        ],
        celRules: 
        [
          v => !!v || 'Celular é obrigatório',
          v => v.length == 11 || 'Celular precisa ter 11 dígitos'
        ],
        emailRules: 
        [
          v => !!v || 'E-mail é obrigatório',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail precisa ser válido'
        ] 
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
    methods: {
      addUser(data) {
        this.kids.push(data)
      },

      priceAsInt(n) {
        price = parseInt(n)
        return (price / 100).toString().replace('.', ',')
      },
      checkout() {
        console.log('çomecou')
        let payload = {
          resp_name: 'Joao da Silva',
          celphone: '21775748837',
          email: 'djhsad@dsd.com',
          cpf: '01212944208'
        }
        this.$store.dispatch('setTransactionInfo', payload)
        this.$store.dispatch('setPaymentOptionsDialog', true)
      },
      removePlan() {
        this.$store.dispatch('removePlanFromCart', this.cart.plan)
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
