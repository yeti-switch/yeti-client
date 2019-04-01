<template>
<div>
  <b-form class="login" @submit.prevent="login">
    <b-form-group label="Welcome to Yeti">
      <Errors/>
      <b-form-input required v-model="username" type="text" placeholder="Login"/>
      <b-form-input required v-model="password" type="password" placeholder="Password"/>
    </b-form-group>
    <b-button type="submit" variant="primary">Login</b-button>
  </b-form>
</div>
</template>

<script>
import Errors from './Errors'

export default {
  name: 'login',
  components: {
    Errors
  },
  data () {
    return {
      username: 'sergtest',
      password: 'test'
    }
  },
  methods: {
    login () {
      const { username, password } = this
      this.$store.dispatch('authRequest', { username, password }).then(() => this.$router.push('/'))
    }
  },
  computed: {
    errors () {
      this.$store.state.errors.error
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
