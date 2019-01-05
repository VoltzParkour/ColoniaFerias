<template>
  <v-slide-y-transition>
    <v-container>
      <v-layout row>
        <v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>
          <h1 class="primary--text">Novo Usuário</h1>
        </v-flex>
      </v-layout>
      <form @submit.prevent="onAdminAddUser">
        <v-layout row>
          <v-flex xs12>
            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="name"
                  label="Nome Completo"
                  id="nome"
                  :rules="nameRules"
                  v-model="name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="age"
                  label="Idade"
                  id="idade"
                  mask="##"
                  :rules="ageRules"
                  v-model="age"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                  name="healthInsurance"
                  label="Plano de Saúde (colocar empresa ou 'nenhum')"
                  id="healthInsurance"
                  value=""
                  v-model="healthInsurance"></v-text-field>
              </v-flex>
            </v-layout>   

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
                    :rules="nameRules"
                    id="fetcher"
                    value="aaa"
                    v-model="responsable.fetcher"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                <v-text-field
                    name="fetcherPhone"
                    :disabled="isRespFetcher"
                    label="Telefone de quem buscará a criança (com DDD)"
                    :rules="celRules"
                    id="fetcherPhone"
                    mask="(##)#####-####"
                    value=""
                    v-model="responsable.fetcherPhone"></v-text-field>
                </v-flex>
            </v-layout>

          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="primary"
                 :disabled="!formIsValid"
                 type="submit">Criar Usuário
          </v-btn>
        </v-card-actions>
      </form>
    </v-container>
  </v-slide-y-transition>

</template>

<script>

  import DatePicker from '../models/DateRangePicker'
  import WeekDaysPicker from '../models/WeekDaysPicker'
  import PlanAdder from '../models/PlanAdder'

  export default {
    name: "AdminAddForm",

    data() {
      return {
        id: (new Date()).getMilliseconds(),
        title: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.title,
        createDate: '',
        //2018-05-18
        today: new Date().toISOString(),
        startDateSelected: false,
        endDateSelected: false,
        startDate: this.$store.getters.selectedColony === null ?  (new Date()).toISOString().substr(0, 10) : this.$store.getters.selectedColony.start_date,
        weekDaysSelected: this.$store.getters.selectedColony === null ? [false, false, false, false, false, false, false, false, false, false, false, false, false, false] : this.$store.getters.selectedColony.week_days,
        weekDaysNames: ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        endDate: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.end_date,
        description: this.$store.getters.selectedColony === null ? '' : this.$store.getters.selectedColony.description,
        imageUrl: '',
        errorMessage: '',
        showAlert: false,
        lotacao: '',
        name: '',
        isRespFetcher: true,
        healthInsurance: '',
        nameRules: [
          v => !!v || 'Nome é obrigatório',
          v => /^[a-zA-z \ç \ã \õ \á \é \í \ó \ú \ê \â]+\s+[[a-zA-z \ç \ã \õ \á \é \í \ó \ú \ê \â \s]+$/.test(v) || 'Favor inserir nome completo'
        ],
        age: '',
        ageRules:
        [
          v => !!v || 'Idade é obrigatória'
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
    watch: { weekDaysSelected: function(value) {
          this.showAlert = false
      }

    },
    computed: {
      addString() {
        if (this.$store.getters.selectedColony) {
          return 'Editar'
        }
        return 'Criar'
      }
    },
    methods: {
      onAdminAddUser() {
        console.log('çheck')
        let responsable = {
          name_resp: this.responsable.name,
          cpf: this.responsable.cpf,
          tel: this.responsable.tel,
          celphone: this.responsable.cel,
          email: this.responsable.email,
          isRespFetcher: this.isRespFetcher,
          fetcher: this.responsable.fetcher,
          fetcherPhone: this.responsable.fetcherPhone
        }
        console.log('çheck 2')
        let days = []
        let colonyId = []

        for (let j = 0; j < this.$store.getters.userDirect.length; j++) {//Fazer esses loops mais eficientes! Vai muitas vezes no getters!!

          for (let i = 0; i < this.$store.getters.userDirect[j].dates.length; i++) {
            let turno = ''
            let afternoon = false
            let morning = false

            if (this.$store.getters.userDirect[j].dates[i].turno === 'Manhã') {
              turno = 'manha'
              morning = true
            } else

            if (this.$store.getters.userDirect[j].dates[i].turno === 'Tarde') {
              turno = 'tarde'
              afternoon = true
            }

            let day = this.$store.getters.userDirect[j].dates[i].date.getUTCDate() > 9 ? this.$store.getters.userDirect[j].dates[i].date.getUTCDate():'0' + this.$store.getters.userDirect[j].dates[i].date.getUTCDate()
            let month = (this.$store.getters.userDirect[j].dates[i].date.getUTCMonth() + 1) > 9 ? (this.$store.getters.userDirect[j].dates[i].date.getUTCMonth() + 1):'0' + (this.$store.getters.userDirect[j].dates[i].date.getUTCMonth() + 1)
            let DateStr = this.$store.getters.userDirect[j].dates[i].date.getUTCFullYear() + '-' + month + '-' + day

            days.push({
              day: DateStr,
              turno: turno,
              afternoon: afternoon,
              morning: morning
            })
          }
          console.log('çheck 3')
          let userData = {
            name:  this.name,
            age: this.age,
            healthInsurance: this.healthInsurance,            
            responsable: responsable,
            days: days,
            colonyId: this.$store.getters.userDirect[j].colonyId
          }
          console.log('@@@@@')
          this.$store.dispatch('createColonyParticipant', userData)
          this.$router.push({ name: "Admin" });
          
          //days.splice(0, this.$store.getters.cart[j].dates.length)
        }
      },
      goAdmin () {
      this.$router.push({ name: "Admin" });
        },
      changedValue() {
      },
      formIsValid() {
        let start = new Date(this.startDate)
        let end = new Date(this.endDate)
        if (start > end) {
          return false
        }
        let weekDaysEmpty = true
        for (let weekDays in  this.weekDaysSelected) {
          if (weekDays)
            weekDaysEmpty = false
        }
        if (weekDaysEmpty){
          return false
        }
        return true
      },
    },
    components: {
      DatePicker,
      WeekDaysPicker,
      PlanAdder
    },
    beforeMount () {
      let selectedColony = this.$store.getters.selectedColony
      if (selectedColony != null) {
        this.startDate = selectedColony.start_date
        this.endDate = selectedColony.end_date
        this.weekDaysSelected = selectedColony.week_days
      }
    },
    addPlanToUserDirect (data) {
      let plan = {
        plan: this.plan,
        period: data.selection.replace('ã', 'a').toLowerCase(),
        dates: data.dates,
        colonyId: this.colony.id
        }
      this.success = true
      this.$store.dispatch('addPlanToUserDirect', plan)
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
