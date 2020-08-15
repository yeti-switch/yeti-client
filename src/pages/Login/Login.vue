<template>
  <div id="auth">
    <div class="background" />
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
          {{ $t('message.loginTitle') }}
        </h1>
      </a-row>
      <a-form-item>
        <a-input
          v-decorator="[
            'login',
            { rules: [{ required: true, message: $t('message.userNameError') }] },
          ]"
          :placeholder="$t('message.userName')"
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
            { rules: [{ required: true, message: $t('message.passwordError') }] },
          ]"
          type="password"
          :placeholder="$t('message.password')"
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
          {{ $t('message.loginAction') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { AUTH, NOTIFICATION_TYPES } from '@/constants';

import locale from './locale';

export default {
  name: 'Login',
  i18n: locale,
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
  height: calc(100% + 10px);
  margin: -10px -10px 0 -10px;
  display: flex;
  justify-content: flex-end;
  position: relative;

  .background {
    background: url('https://picsum.photos/1800/900') left top/cover no-repeat;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  #components-form-demo-normal-login {
    padding: 20px 10px 0;
    max-width: 30%;
    height: 100%;
    background-color: #fff;
    flex: 1 1 30%;
    position: relative;

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
