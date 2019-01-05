<template>
  <v-dialog v-model="dialog" max-width="520">
    <v-btn
      right
      slot="activator"
      flat
      class="green--text darken-1"
    ><v-icon>add_circle</v-icon> </v-btn>
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>
              <h1 class="primary--text">Nova Inscrição</h1>
            </v-flex>
          </v-layout>
          <form @submit.prevent="onCreateUser">
          <!-- <form> -->
            <v-layout row>
              <v-flex xs12>

                <v-layout row>
                  <v-flex xs10 offset-xs1 sm10 offset-sm1>
                    <v-text-field
                      name="name"
                      label="Nome Completo do Aluno"
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
                      name="healthInsurance"
                      label="Plano de Saúde (Colocar empresa)"
                      id="healthInsurance"
                      v-model="healthInsurance"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs10 offset-xs1 sm10 offset-sm1>
                    <v-text-field
                      name="observations"
                      label="Observações"
                      id="obs"
                      multi-line
                      v-model="obs"></v-text-field>
                  </v-flex>
                </v-layout>

                <!-- <v-layout row>
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
                </v-layout> -->

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
                    class="green--text"
                    :disabled="!formIsValid"
                    type="submit">Adicionar usuário
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
      </v-card>
  </v-dialog>

</template>

<script>
  import {bus} from '../../main'
  export default {
    created () {
      var vm = this
      bus.$on('dialog', function (value) {
        vm.dialog = value
      })
    },
    data() {
      return {
        dialog: false,
        // teste: [
        //   this.$store.getters.colonies[0].plans[0].price,
        //   this.$store.getters.cart[0].dates[0].turno,
        //   this.$store.getters.colonies[2].title,
        //   this.$store.getters.colonies[3].title,
        // ],
        selection: '',
        healthInsurance: '',
        name: '',
        obs: '',
        nameRules: [
          v => !!v || 'Nome é obrigatório',
          v => /^[a-zA-z \ç \ã \õ \á \é \í \ó \ú \ê \â]+\s+[[a-zA-z \ç \ã \õ \á \é \í \ó \ú \ê \â \s]+$/.test(v) || 'Favor inserir nome completo'
        ],
        age: '',
        ageRules: [
        v => !!v || 'Idade é obrigatória',
        v => v >= 5 || 'Idade mínima é 5 anos' //Idade Dummy
      ],
        name_resp: '',
        cpf: '',
        cpfRules: [
        v => !!v || 'CPF é obrigatório',
        v => v.length == 11 || 'CPF precisa ter 11 dígitos'
      ],
        tel: '',
        celphone: '',
        celRules: [
        v => !!v || 'Celular é obrigatório',
        v => v.length == 11 || 'Celular precisa ter 11 dígitos'
      ],
        email: '',
        emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail precisa ser válido'
      ]
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' &&
          this.age !== ''
          // this.name_resp !== '' &&
          // this.cel !== '' &&
          // this.email !== '' &&
          // this.cpf !== ''
        },
        colonies() {
          return this.$store.getters.colonies
        }
      },
    methods: {
      onCreateUser () {
        if (!this.formIsValid) {return}
        let emitObj = {
              name: this.name,
              age: this.age,
              healthInsurance: this.healthInsurance,
              obs: this.obs
            }
            this.$emit('addUser', emitObj)
            this.dialog = false
            this.name = ''
            this.age = ''
            this.healthInsurance = ''
            this.obs = ''
      }
    }
      // onCreateUser() {
      //   if (!this.formIsValid) {
      //     return
      //   }
      //   let responsable = {
      //     name_resp: this.name_resp,
      //     cpf: this.cpf,
      //     tel: this.tel,
      //     celphone: this.celphone,
      //     email: this.email
      //   }
      //   let days = []
      //   let colonyId = []
      //   for(let j = 0; j < this.$store.getters.cart.length; j++){
      //   for(let i = 0; i < this.$store.getters.cart[j].dates.length; i++){
      //     let morning = false
      //     let afternoon = false
      //     if(this.$store.getters.cart[j].dates[i].turno === 'Manhã'){
      //       morning = true
      //     }
      //     if(this.$store.getters.cart[j].dates[i].turno === 'Tarde'){
      //       afternoon = true
      //     }
      //     days.push({day: this.$store.getters.cart[j].dates[i].date.getFullYear() + '-'
      //          + (this.$store.getters.cart[j].dates[i].date.getMonth() + 1) + '-' + this.$store.getters.cart[j].dates[i].date.getUTCDate(),
      //         morning: morning,afternoon: afternoon})
      //   }
      //   let userData = {
      //     name: this.name,
      //     age: this.age,
      //     responsable,
      //     days,
      //     colonyId: this.$store.getters.cart[j].colonyId
      //   }
      //   this.$store.dispatch('createColonyParticipant', userData)
      //   days.splice(0,this.$store.getters.cart[j].dates.length)
      // }
        // for(let i = 0; i < days.length; i++){
        //   for(let j = i+1; j < days.length; j++){
        //     if(days[i].day === days[j].day){
        //       days.day
        //     }
        //   }
        // }
  //      let colonyName = this.selection
  //   let colonyId = '-LDUmFGwINBwthrWVTPY'
  //     let colonyId = []
       //this.$store.getters.cart[0].colonyId
  //      let colonyId = ''
        //this.$store.getters.colonies[1].id
       // for (let i = 0; i < this.$store.getters.colonies.length; i++){
       //   if(this.$store.getters.colonies[i].title == colonyName){
       //     colonyId = this.$store.getters.colonies[i].id
       //   }
       // }
      // for(let j = 0; j < this.$store.getters.cart.length; j++){
      //
      //   let userData = {
      //     name: this.name,
      //     age: this.age,
      //     responsable,
      //     days,
      //     colonyId[i]
      //   }
      //
      //   this.$store.dispatch('createColonyParticipant', userData)
      //
      // }
        //this.$router.push('/')

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
