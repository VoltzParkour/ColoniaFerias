<template>
  <v-slide-y-transition>
    <v-container>
      <h1 class="title">Seu Carrinho</h1>
      <p v-show="!cart.length">
        <i>Seu carrinho está vazio!</i>
        <router-link to="/">Ver planos</router-link>
      </p>
      <v-data-table
      :items="getPlans()"
      :headers="headers"
      class="elevation-1"
      hide-actions=""
      no-data-text="Nenhum plano selecionado!"
      >
        <template slot="items" slot-scope="props">
            <td> Plano de {{ props.item.plan.num_days }} turno{{props.item.plan.num_days > 1 ? 's':''}}</td>
            <td>R$ {{ props.item.plan.priceWithLunch ? props.item.plan.priceWithLunch/100 : props.item.plan.price/100 }}</td>
            <td>
              <v-select :items="kids"
              v-model="props.item.selectedUser"
                        v-on:change="setIndex($event, props.index)"
              item-text="name"
              label="Selecione o usuário!"
              ></v-select>
            </td>
            <td>
              <inscricao-dialog @addUser="addUser($event, props.index)"></inscricao-dialog>
              <v-btn flat class="red--text" @click="removePlan">Remover plano</v-btn>
            </td>
        </template>
        <template slot="footer">
          <td><strong>Total: </strong>  R$ {{ cartTotal }}</td>

        </template>
      </v-data-table>

      <span v-show="cart.length">
      <v-layout row>
        <v-flex xs10 offset-xs1 sm10 offset-sm1>
          <v-text-field
            name="name_resp"
            label="Nome do Responsável"
            validate-on-blur
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
            validate-on-blur
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
            validate-on-blur
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
            validate-on-blur
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
            validate-on-blur
            :rules="emailRules"
            id="email"
            v-model="responsable.email"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs10 offset-xs1 sm10 offset-sm1>
          <v-checkbox v-model="isRespFetcher" hide-details label="O responsável irá buscar a criança?" class="shrink mr-2"></v-checkbox>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs10 offset-xs1 sm10 offset-sm1>
          <v-text-field
            name="fetcher"
            :disabled="isRespFetcher"
            label="Pessoa que irá buscar a criança"
            validate-on-blur
            :rules="nameRules"
            id="fetcher"
            v-model="responsable.fetcher"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs10 offset-xs1 sm10 offset-sm1>
          <v-text-field
            name="fetcherPhone"
            :disabled="isRespFetcher"
            label="Telefone de quem buscará a criança (com DDD)"
            validate-on-blur
            :rules="celRules"
            id="fetcherPhone"
            v-model="responsable.fetcherPhone"></v-text-field>
        </v-flex>
      </v-layout>
      </span>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn v-show="cart.length" round @click='checkout'>Finalizar compra</v-btn>
      </v-layout>
      <PaymentDialogs @paymentRequested="processRequest"></PaymentDialogs>
      <v-alert v-model="alert" type="error" dismissible>
        {{ alertMessage }}
      </v-alert>
    </v-container>
  </v-slide-y-transition>
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
        isRespFetcher: true,
        // kids: [],
        alert: false,
        alertMessage: '',
        headers: [
          {
            text: 'Plano',
            align: 'left',
            value: 'plan'
          },
          {text: 'Preço', value: 'price'},
          {text: 'Usuário', value: 'user' },
          {text: '' }
        ],
        responsable:
        {
          name: '',
          email: '',
          cpf: '',
          tel: '',
          cel: '',
          isRespFetcher: '',
          fetcher: '',
          fetcherPhone: ''
        },
        nameRules: [
          v => !!v || 'Nome é obrigatório',
          v => /^[a-zA-z \ç \ã \õ \á \é \í \ó \ú \ê \â]+\s+[[a-zA-z \ç \ã \õ \á \é \í \ó \ú \ê \â \s]+$/.test(v) || 'Favor inserir nome completo'
          ],
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
          if (this.cart[i].plan.priceWithLunch !== undefined && this.cart[i].lunchDates.length > 0) {
            total = total + parseInt(this.cart[i].plan.priceWithLunch)
          } else {
            total = total + parseInt(this.cart[i].plan.price)
          }
        }
        return (total/100).toString().replace('.',',')
      },
      kids() {
        return this.$store.getters.kids
      }
    },
    beforeMount() {
      for (let i in this.cart) {
        this.cart[i].selectedUser = undefined
      }
    },
    methods: {
      addUser(data, index) {
        // this.kids.push(data)
        this.$store.dispatch('addKid', data)
        // for (let i in this.cart) {
          let payload = {
            index: index,
            user: data
          }
          this.$store.dispatch('setPlanUser', payload)
          // this.cart[i].selectedUser = this.kids[0]
        // }
      },
      setIndex(event, index) {
        let payload = {
          index: index,
          user: event
        }
        this.$store.dispatch('setPlanUser', payload)
      },
      priceAsInt(n) {
        price = parseInt(n)
        return (price / 100).toString().replace('.', ',')
      },
      checkout() {
        let payload = this.responsable
        if (this.dataIsValid()) {
          this.$store.dispatch('setTransactionInfo', payload)
          this.$store.dispatch('setPaymentOptionsDialog', true)
        }
      },
      dataIsValid() {
        if (this.responsable.name.split(' ').length < 2) {
          this.alertMessage = 'Por favor inserir o nome completo'
          this.alert = true
          return false
        } else if (this.responsable.cpf.length != 11) {
          this.alertMessage = 'CPF inválido'
          this.alert = true
          return false
        } else if (this.responsable.cel.length != 11) {
          this.alertMessage = 'Número de celular incorreto'
          this.alert = true
          return false
        } else if (this.responsable.email.indexOf('@') == -1 || this.responsable.email.indexOf('.com') == -1) {
          this.alertMessage = 'E-Mail inválido'
          this.alert = true
          return false
        }
        for (let i in this.cart) {
          if (this.cart[i].selectedUser === undefined) {
            this.alertMessage = 'Escolha as crianças para cada plano'
            this.alert = true
            return false
          }
        }
        for (let i = 0; i < this.cart.length - 1; i++) {
          for (let j = i + 1; j < this.cart.length; j++) {
            if (this.cart[i].selectedUser.name === this.cart[j].selectedUser.name) {
              console.log('nome do dito cujo')
              console.log(this.cart[i].selectedUser.name)
              console.log(this.cart[j].selectedUser.name)
              for (let k = 0; k < this.cart[i].dates.length; k++) {
                for (let l = 0; l <  this.cart[j].dates.length; l++) {
                  let firstDay = new Date(this.cart[i].dates[k].date)
                  let secondDay = new Date(this.cart[j].dates[l].date)
                  console.log(firstDay)
                  console.log(secondDay)
                  console.log(firstDay.getTime() === secondDay.getTime())
                  console.log(this.cart[i].dates[k].turno)
                  console.log(this.cart[j].dates[l].turno)
                  console.log(this.cart[i].dates[k].turno === this.cart[j].dates[l].turno)
                  if (firstDay.getTime() === secondDay.getTime() &&
                    this.cart[i].dates[k].turno === this.cart[j].dates[l].turno) {
                    console.log('entrou')
                    this.alertMessage = 'Existem duas crianças para o mesmo dia, mesmo turno'
                    this.alert = true
                    return false
                  }
                }
              }
            }
          }
        }
        return true
      },
      removePlan() {
        this.$store.dispatch('removePlanFromCart', this.cart.plan)
      },
      getPlans() {
        return this.$store.getters.cart
      },

      //Método não está sendo usado!
      onCreateUser(){
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
          email: this.email,
          isRespFetcher: this.isRespFetcher,
          fetcher: this.fetcher,
          fetcherPhone: this.fetcherPhone
        }

        let LunchDays = []

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
          for (let i = 0; i < this.$store.getters.cart[j].lunchDates.length; i++) {
            lunchDays.push({
              lunchDay: this.$store.getters.cart[j].lunchDates[i].date.getFullYear() + '-'
              + (this.$store.getters.cart[j].lunchDates[i].date.getMonth() + 1) + '-' + this.$store.getters.cart[j].lunchDates[i].date.getUTCDate()
            })
          }

          let userData = {
            name: this.name,
            age: this.age,
            healthInsurance: this.healthInsurance,
            responsable,
            days,
            lunchDays,
            colonyId: this.$store.getters.cart[j].colonyId
          }

          this.$store.dispatch('createColonyParticipant', userData)

          days.splice(0, this.$store.getters.cart[j].dates.length)
          days.splice(0, this.$store.getters.cart[j].lunchDates.length)

        }
        this.$router.push('/')
      },

      processRequest (data) {
        let responsable = {
          name_resp: this.responsable.name,
          cpf: this.responsable.cpf,
          tel: this.responsable.tel,
          celphone: this.responsable.cel,
          email: this.responsable.email
        }
        let days = []
        let colonyId = []

        for (let j = 0; j < this.$store.getters.cart.length; j++) {//Fazer esses loops mais eficientes! Vai muitas vezes no getters!!

          for (let i = 0; i < this.$store.getters.cart[j].dates.length; i++) {
            let turno = ''
            let afternoon = false
            let morning = false

            if (this.$store.getters.cart[j].dates[i].turno === 'Manhã') {
              turno = 'manha'
              morning = true
            } else

            if (this.$store.getters.cart[j].dates[i].turno === 'Tarde') {
              turno = 'tarde'
              afternoon = true
            }

            let day = this.$store.getters.cart[j].dates[i].date.getUTCDate() > 9 ? this.$store.getters.cart[j].dates[i].date.getUTCDate():'0' + this.$store.getters.cart[j].dates[i].date.getUTCDate()
            let month = (this.$store.getters.cart[j].dates[i].date.getUTCMonth() + 1) > 9 ? (this.$store.getters.cart[j].dates[i].date.getUTCMonth() + 1):'0' + (this.$store.getters.cart[j].dates[i].date.getUTCMonth() + 1)
            let DateStr = this.$store.getters.cart[j].dates[i].date.getUTCFullYear() + '-' + month + '-' + day

            days.push({
              day: DateStr,
              turno: turno,
              afternoon: afternoon,
              morning: morning
            })
          }
          let userData = {
            name:  this.$store.getters.cart[j].selectedUser.name,
            age: this.$store.getters.cart[j].selectedUser.age,
            healthInsurance: this.$store.getters.cart[j].selectedUser.healthInsurance,
            responsable: responsable,
            days: days,
            colonyId: this.$store.getters.cart[j].colonyId
          }
          this.$store.dispatch('createColonyParticipantTemporary', {userData: userData, paymentCode: data.code})

          //days.splice(0, this.$store.getters.cart[j].dates.length)

        }
      }


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

