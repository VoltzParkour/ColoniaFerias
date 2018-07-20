<template>
  <v-app :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
    <!--<v-navigation-drawer-->
    <!--persistent-->
    <!--:mini-variant="miniVariant"-->
    <!--:clipped="clipped"-->
    <!--v-model="drawer"-->
    <!--enable-resize-watcher-->
    <!--fixed-->
    <!--app-->
    <!--&gt;-->
    <!--<v-list>-->
    <!--<v-list-tile-->
    <!--value="true"-->
    <!--v-for="(item, i) in items"-->
    <!--:key="i"-->
    <!--&gt;-->
    <!--<v-list-tile-action>-->
    <!--<v-icon v-html="item.icon"></v-icon>-->
    <!--</v-list-tile-action>-->
    <!--<v-list-tile-content>-->
    <!--<v-list-tile-title v-text="item.title"></v-list-tile-title>-->
    <!--</v-list-tile-content>-->
    <!--</v-list-tile>-->
    <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <v-toolbar
      app
      :clipped-left="clipped"
      class=""
      flat>
      <!-- <v-toolbar-items class="ml-0 mr-0">
        <v-btn small flat @click.stop="goHome" class="primary hidden-xs-only" light>
          <v-icon>home</v-icon>
          Início
        </v-btn>
      </v-toolbar-items> -->
      <v-divider class="primary mr-2 ml-0" style="height: 15px"></v-divider>
      <img src='http://voltzparkour.com/blogs/logo.png' width="110px" @click.stop="goHome" style="cursor: pointer;">
      <v-divider class="primary ml-3 mr-0" style="height: 15px"></v-divider>
      <v-divider v-for="n in 10" :key="n" class="primary ml-0 mr-0" style="height: 15px"></v-divider>
      <v-toolbar-items class="mr-0">
        <v-btn small flat @click.stop="goCart" class="primary" light>
          <v-icon>shopping_cart</v-icon>
          <v-card-text>{{ cart.length == 0 ? 'nenhum': cart.length}} plano{{cart.length > 1 ? 's':''}}
            (R${{cartTotal}})
          </v-card-text>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <v-dialog
        v-model="browserDialog"
        max-width="500"
      >
        <v-card>
          <v-card-title class="headline">Internet Explorer</v-card-title>

          <v-card-text>
            Identificamos que você está usando o Internet Explorer para navegar no nosso site.
            <br>
            Este navegador não é mais suportado e pode causar alguns problemas, para uma melhor experiência utilize navegadores mais novos.
            <br>
            Clique abaixo para baixar um navegador mais recente:
          </v-card-text>

          <v-card-actions>

            <v-flex xs2 ml-5>

            <a href="https://www.google.com/chrome/">Chrome</a><br>

            </v-flex>

            <!--<v-btn-->
              <!--class="primary"-->
              <!--flat="flat"-->
            <!--&gt;-->

            <!--</v-btn>-->

            <!--<v-btn-->
              <!--class="primary"-->
              <!--flat="flat"-->
              <!--@click="browserDialog = false"-->
            <!--&gt;-->
              <!--Firefox-->
            <!--</v-btn>-->

            <v-flex xs2>
            <a href="https://www.mozilla.org/pt-BR/firefox/new/">Firefox</a><br>
            </v-flex>

            <!--<v-btn-->
              <!--class="primary"-->
              <!--flat="flat"-->
              <!--@click="browserDialog = false"-->
            <!--&gt;-->
              <!--Edge-->
            <!--</v-btn>-->

            <v-spacer></v-spacer>


            <v-btn
              color="green darken-1"
              flat="flat"
              @click="browserDialog = false"
            >
              Agora Não
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <div>
        <router-view/>
      </div>

    </v-content>
    <v-footer :fixed="fixed" app class="primaryt">
      <span>  Voltz&copy; 2018</span>
      <v-spacer></v-spacer>
      <v-btn small flat @click.stop="goAdmin" class="primary" light>
        <v-icon>account_circle</v-icon>
        <v-card-text>ADMIN</v-card-text>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        browserDialog: this.$store.getters.oldBrowser,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Voltz'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Voltz',
        backgroundImage: 'http://voltzparkour.com/blogs/back.png'
      }
    },
    methods: {
      goAdmin() {
        this.$router.push({name: "Admin"});
      },
      goCart() {
        this.$router.push({name: "Cart"})
      },
      goHome() {
        this.$router.push({name: "Home"})
      },
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
        return (total / 100).toString().replace('.', ',')
      }
    },
    mounted() {
      this.checkBrowser
    },
    name: 'App'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  .fontsp {
    font-family: 'Roboto', sans-serif;
  }
</style>
