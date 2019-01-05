<template>
    <div class="login">
        <h3> Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Senha"><br>
        <button v-on:click="signIn">Entrar</button>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Login',
    data: function(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn: function() {

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    alert('Login feito com sucesso'),
                    this.$router.replace('admin')
                },
                (err) => {
                    alert('Falha no Login')
                }
            );
        }
    }
}
</script>

<style scoped>
.login{
    margin-top: 150px;
    text-align: center;
}
input {
    margin: 10px;
    padding: 15px;
    width: 20%;
    background-color: transparent;
    border: 1px black solid;
//    text-align: center;
}
button {
    margin-top: 20px;
    width: 20%;
    cursor: pointer;
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 22px;
    color: white;
    background: #BED609;
    outline-style: none;
}
</style>
