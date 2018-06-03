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
          <td>Criança</td>          
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in cart">
            <td>Plano de {{ p.plan.num_days }} turno{{p.plan.num_days > 1 ? 's':''}}</td>
            <td> R${{p.plan.price/100}}</td>
            <td><v-select :items="kids" ></v-select></td>
            <td><v-btn color="red" @click="removePlan">Excluir</v-btn></td>
          </tr>
          <tr>
            <td><b>Total:</b></td>

            <td><b>R${{ cartTotal }}</b></td>
          </tr>
      </tbody>
</table>
    <p><v-btn v-show="cart.length" round @click='checkout'>Pagar</v-btn></p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {  
    return {
      kids: ['new kid', 'old kid']  
  }},
  computed: {
    cart () {
        return this.$store.getters.cart
    },
    cartTotal () {
      let total = 0
      for (let i in this.cart) {
        total = total + parseInt(this.cart[i].plan.price)
      }
      return (total/100).toString().replace('.',',')
    },
    priceAsInt (n) {
        price = parseInt(n)
      return (price/100).toString().replace('.',',')
    },    
  },
  methods: {
    checkout(){
      alert('Pagar')
    },
    removePlan(){
        this.$store.dispatch('removePlanFromCart', this.cart.plan)
    }
  }
}
</script>