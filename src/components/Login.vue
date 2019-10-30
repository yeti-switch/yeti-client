<template>
  <div id="auth">
    <b-form
      class="login"
      @submit.prevent="onSubmit"
    >
      <b-form-group label="Welcome to Yeti">
        <b-form-input
          v-model="login"
          required
          type="text"
          placeholder="Login"
          autocomplete="login"
        />
        <b-form-input
          v-model="password"
          required
          type="password"
          placeholder="Password"
          autocomplete="current-password"
        />
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >
        Login
      </b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      const { login, password } = this;
      this.$store.dispatch('authRequest', { login, password })
        .then(() => this.$router.push(this.$route.query.redirect || '/'))
        .then(() => this.$notify({
          type: 'success',
          text: 'Login successful',
        }))
        .catch((err) => {
          this.$notify({
            type: 'error',
            text: err,
          });
        });
    },
  },
};
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
