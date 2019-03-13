<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <p>
      Please authorize:
    </p>
      <form @submit.prevent="login">
        <label><input placeholder="email"></label><br>
        <label><input placeholder="password" type="password"></label><br>
        <button type="submit">Login</button>
        <p class="error">Bad login information</p>
    </form>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      auth.login('admin@example.com','123', res => {
        console.log(res);
      });
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
