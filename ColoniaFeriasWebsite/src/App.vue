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
      flat
    >
<<<<<<< HEAD
    <v-divider  class="primary ml-0" style="height: 5px"></v-divider>
    <img src='http://voltzparkour.com/blogs/logo.png' width="110px" >
    <v-divider  class="primary mr-0" style="height: 5px"></v-divider>
=======
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
>>>>>>> d0ee6d034c420223a09bec9b9097b37fa6c8d162
    </v-toolbar>
    <v-content>
      <div >
        <router-view/>
      </div>
      
    </v-content>
    <v-footer :fixed="fixed" app class="primaryt">
      <span>  Voltz&copy; 2018</span>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="goAdmin">
        <v-icon>account_circle</v-icon>
      </v-toolbar-side-icon>
      <span class="mr-1" @click.stop="goAdmin">Admin</span>
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
<<<<<<< HEAD
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Voltz',
      backgroundImage: 'http://voltzparkour.com/blogs/back.png'
    }
  },
  methods: {
    goAdmin () {
      this.$router.push({ name: "Admin" });
    }
  },
  name: 'App'
}
=======
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
>>>>>>> d0ee6d034c420223a09bec9b9097b37fa6c8d162
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  .fontsp {
    font-family: 'Roboto', sans-serif;
  }
</style>
