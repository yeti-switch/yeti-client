<i18n>
{
  "en": {
    "loginTitle": "Login",
    "userName": "Username",
    "userNameError": "Username can't be empty",
    "password": "Password",
    "passwordError": "Password can't be empty",
    "loginAction": "Log in"
  },
  "ua": {
    "loginTitle": "Логування",
    "userName": "Ім'я користувача",
    "userNameError": "Будь-ласка, введіть ім'я користувача",
    "password": "Пароль",
    "passwordError": "Будь-ласка, введіть пароль",
    "loginAction": "Увійти"
  }
}
</i18n>

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
          {{ $t('loginTitle') }}
        </h1>
      </a-row>
      <a-form-item>
        <a-input
          v-decorator="[
            'login',
            { rules: [{ required: true, message: $t('userNameError') }] },
          ]"
          :placeholder="$t('userName')"
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
            { rules: [{ required: true, message: $t('passwordError') }] },
          ]"
          type="password"
          :placeholder="$t('password')"
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
          {{ $t('loginAction') }}
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
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    ...mapActions([AUTH.ACTIONS.AUTH_REQUEST]),
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
  height: calc(100% + 10px);
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
