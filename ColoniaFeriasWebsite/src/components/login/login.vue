<template>
    <div class="login">
        <h3> Sign In</h3>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Senha"><br>
        <button v-on:click="signIn">Entrar</button>
    </div>
</template>

<script>
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
                function(user) {
                    alert('Login feito com sucesso')
                },
                function(err) {
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
