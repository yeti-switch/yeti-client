<template>
  <div id="auth">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit.prevent="onSubmit"
    >
      <a-icon
        type="login"
        height="30"
      />
      <a-row>
        <h1 class="login-title">
          Login
        </h1>
      </a-row>
      <a-form-item>
        <a-input
          v-decorator="[
            'login',
            { rules: [{ required: true, message: 'Please input your login!' }] },
          ]"
          placeholder="Login"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { AUTH, NOTIFICATION_TYPES } from '@/constants';

export default {
  name: 'Login',
  data() {
    return {
      imageLoaded: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  mounted() {
    setTimeout(() => {
      this.imageLoaded = true;
    }, 3000);
  },
  methods: {
    ...mapActions([AUTH.ACTIONS.AUTH_REQUEST]),
    onImageLoad() {
      this.imageLoaded = true;
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const { login, password } = values;
          this[AUTH.ACTIONS.AUTH_REQUEST]({ login, password })
            .then(() => this.$router.push(this.$route.query.redirect || '/'))
            .then(() => this.$notify({
              type: NOTIFICATION_TYPES.SUCCESS,
              text: 'Login successful',
            }));
        }
      });
    },
  },
};
</script>

<style lang="scss">
img {
  margin-bottom: 50px;
}

#auth {
  display: flex;
  background: url('https://picsum.photos/1800/900') center/cover no-repeat;
  height: calc(100% + 20px);
  margin: -10px -10px 0 -10px;
  display: flex;
  justify-content: flex-end;

  #components-form-demo-normal-login {
    padding: 20px 10px 0;
    max-width: 30%;
    height: 100%;
    background-color: #fff;
    flex: 1 1 30%;

    .anticon-login svg {
      height: 30px;
      width: 30px;
    }
  }

  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
}

</style>
