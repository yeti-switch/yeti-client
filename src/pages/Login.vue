<template>
  <div id="auth">
    <img
      src="https://picsum.photos/800/450"
      @load="onImageLoad"
      @error="onImageLoad"
    >
    <b-form
      v-if="imageLoaded"
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

import { AUTH, NOTIFICATION_TYPES } from '../constants';

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      imageLoaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.imageLoaded = true;
    }, 3000);
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true;
    },
    onSubmit() {
      const { login, password } = this;
      this.$store.dispatch(AUTH.ACTIONS.AUTH_REQUEST, { login, password })
        .then(() => this.$router.push(this.$route.query.redirect || '/'))
        .then(() => this.$notify({
          type: NOTIFICATION_TYPES.SUCCESS,
          text: 'Login successful',
        }));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
img {
  margin-bottom: 50px;
}
.login {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 300px;
  padding: 10px;
}
</style>
