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
    margin: 10px 0;
    padding: 15px;
}
button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}
p {
    margin: 40px;
    font-size: 13px;
}
p a {
    text-decoration: underline;
    cursor: pointer;
}
</style>
