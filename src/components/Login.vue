<template>
<div>
  <b-form class="login" @submit.prevent="login">
    <b-form-group label="Please log in">
      <b-form-input required v-model="username" type="text" placeholder="Login"/>
      <b-form-input required v-model="password" type="password" placeholder="Password"/>
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
