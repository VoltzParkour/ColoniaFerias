<template>
  <v-app>
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
      class="primary"
    >
      <v-toolbar-side-icon @click.stop="goAdmin">
        <v-icon>account_circle</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title class="accent--text" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-show="cart.length > 0" flat @click.stop="goCart">
          <v-icon>shopping_cart</v-icon>
          <v-card-text>{{ cart.length }}</v-card-text>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app class="primary">
      <span>Voltz&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Voltz'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Voltz'
      }
    },
    methods: {
      goAdmin() {
        this.$router.push({name: "Admin"});
      },
      goCart() {
        this.$router.push({name: "Cart"})
      }
    },
    computed: {
      cart () {
        return this.$store.getters.cart
      }
    },
    name: 'App'
  }
</script>
