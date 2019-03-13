<template>
<div>
  <img alt="Yeti logo" src="../assets/logo.png">
  <br>
  Welcome to Yeti
  <form class="login" @submit.prevent="login">
    <h3>Please log in</h3>
    <input required v-model="username" type="text" placeholder="Login"/>
    <input required v-model="password" type="password" placeholder="Password"/>
    <hr/>
    <button type="submit">Login</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: 'sergtest',
      password: 'test'
    }
  },
  methods: {
    login: function () {
      const { username, password } = this
      this.$store.dispatch('authRequest', { username, password }).then(() => this.$router.push('/'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>
