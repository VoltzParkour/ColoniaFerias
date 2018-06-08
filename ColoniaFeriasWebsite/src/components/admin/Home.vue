<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid>
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid
                   v-if="Colonies.length > 0">
        <v-flex>
          <v-card-actions>
            <v-btn @click.stop="goColonyForm" class="primary">Adicionar Colônia</v-btn>
            <v-btn @click.stop="goAdminSelectPlans" class="primary">Adicionar Usuário</v-btn>
            <v-btn @click.stop="logout" class="primary">Sair</v-btn>
          </v-card-actions>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12 md6 lg3
                  v-for="colony in Colonies"
                  :key="colony.id">
            <v-card tile>
              <v-container fluid class="ma-1 pa-1">
                <v-card-text>
                  <v-layout row>
                      <v-flex headline xs class="ma-0 pa-0">
                        {{ dateGetYear(colony.start_date)}}
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs10 class="ma-0  pa-0">
                        <v-card-actions class="ma-0 pa-0 right" >
                          <v-btn small flat class="primary--text" @click.stop="editColony(colony)">
                            <v-icon>edit</v-icon>
                            Editar
                          </v-btn>
                          <v-btn small flat class="red--text" @click.stop="showDeleteDialog(colony)">
                            <v-icon>close</v-icon>
                            Excluir
                          </v-btn>
                        </v-card-actions>
                      </v-flex>
                  </v-layout>
                </v-card-text>
                <v-divider></v-divider>
              </v-container>
                <v-card-title class="pt-0">
                  <v-layout row wrap>
                    <v-flex class="pt-2 pb-0">
                      <span class="main_text">{{ dateGetDay(colony.start_date) }}</span>
                      <span>{{ dateGetMonth(colony.start_date) | monthNameFilter}}</span>
                    </v-flex>
                    <v-flex class="pt-2 pb-0">
                      <span class="main_text"> - </span>
                    </v-flex>
                    <v-flex class="pt-2 pb-0">
                    <span class="main_text">{{ dateGetDay(colony.end_date) }}</span>
                      <span>{{ dateGetMonth(colony.end_date) | monthNameFilter}}</span>
                    </v-flex>
                  </v-layout>
                </v-card-title>

                <v-container fluid class="ma-1 pa-1">
                <v-card-text>
                  <v-layout row>
                      <v-flex xs5 class="ma-0 pa-0">
                        <span class="subheading ma-0 pa-0 grey--text"> {{nInscritos(colony.id)}} inscrições</span>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs5 class="ma-0 pa-0">
                        <v-card-actions class="ma-0 pa-0 right" >
                          <v-btn small flat class="grey--text" @click.stop="goColony(colony)">
                            <v-icon>details</v-icon>
                            Ver detalhes!
                          </v-btn>
                        </v-card-actions>
                      </v-flex>
                  </v-layout>
                </v-card-text>
              </v-container>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-else>
        <v-flex>
          <header> Nenhuma colônia</header>
          <v-card-actions>
            <v-btn @click.stop="goColonyForm">Adicionar Colônia</v-btn>
          </v-card-actions>
        </v-flex>
      </v-container>


      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h3>Apagar Colônia</h3>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <span>Tem certeza que deseja apagar esta colônia?</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.stop="eraseColony">Apagar</v-btn>
            <v-btn color="primary" flat @click.stop="dialog=false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-container>
  </v-slide-y-transition>

</template>

<script>

import firebase from 'firebase'

  export default {
    data () {
      return {
        dialog: false,
        selectedColonyToDelete: ''
      }
    },
    computed: {
      Colonies() {
        return this.$store.getters.colonies
      },
      buyersCount () {
        return this.$store.getters.buyersCount
      }
    },
    methods: {
      goColonyForm() {
        this.$router.push({name: "ColonyForm"})
      },
      goAdminSelectPlans() {
        this.$router.push({name: "AdminSelectPlans"})
      },
      goColony(colony) {
        this.$store.dispatch('selectColony', colony)
        this.$router.push({name: "Colony"})
      },
      editColony(colony) {
        this.$store.dispatch('selectColony', colony)
        this.$router.push({name: "ColonyForm"})
      },
      showDeleteDialog(colony) {
        this.selectedColonyToDelete = colony
        this.dialog = true
      },
      eraseColony() {
        this.$store.dispatch('deleteColony', this.selectedColonyToDelete)
        this.dialog = false
      },
      dateGetDay(dateString) {
        let date = new Date(dateString)
        return date.getUTCDate()
      },
      dateGetMonth(dateString) {
        let date = new Date(dateString)
        return date.getMonth() + 1
      },
      dateGetYear(dateString) {
        let date = new Date(dateString)
        return date.getFullYear()
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
        },
      nInscritos (id) {
        if (this.buyersCount[id]) {
          return this.buyersCount[id]
        } else {
          return 0
        }
      }
    },
    beforeMount() {
      this.$store.dispatch('LoadColonies')
      this.$store.dispatch('LoadBuyersCount')
      this.$store.dispatch('clearSelectedColony')
    }
  }
</script>

<style lang="stylus" scoped>
  .main_text {
    padding: 0
    margin: 0
    margin-left 4px
    color: grey
    font-size: 300%
    font-weight: 500;
  }

  .top_right_header {
    top: 0px
    left: 0px
    position: absolute
    max-width 36px
    max-height 36px
    z-index 2
  }

  .top_left_header {
    top: 6px
    left: 16px
    position: absolute
    max-width 36px
    max-height 36px
    z-index 2
  }
</style>
