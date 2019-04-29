<template>
<div id='auth'>
  <b-form class="login" @submit.prevent="login">
    <b-form-group label="Welcome to Yeti">
      <b-form-input required v-model="username" type="text" placeholder="Login"  autocomplete="username"/>
      <b-form-input required v-model="password" type="password" placeholder="Password" autocomplete="current-password"/>
    </b-form-group>
    <b-button type="submit" variant="primary">Login</b-button>
  </b-form>
</div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login () {
      const { username, password } = this
      this.$store.dispatch('authRequest', { username, password })
        .then(() => this.$router.push(this.$route.query.redirect || '/'))
        .then(() => this.$notify({
          type: 'success',
          text: 'Login successful'
          }))
        .catch(err => {
          this.$notify({
            type: 'error',
            text: err
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .login {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>
