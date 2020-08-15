<template>
  <div>
    {{ $t('message.account') }}
    <a-dropdown
      v-if="activeAccount"
      :trigger="['click']"
      @visibleChange="visibleChange"
    >
      <a-menu
        slot="overlay"
        @click="handleMenuClick"
      >
        <a-menu-item
          v-for="account in accounts"
          :key="account.id"
        >
          {{ account.name }}
        </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px">
        <a-row
          type="flex"
          align="middle"
        >
          <span>
            {{ activeAccount.name }}
          </span>
          <a-icon
            type="down"
            :rotate="bgIconRotate"
          />
        </a-row>
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { ACCOUNTS } from '@/constants';

import locale from './locale';

export default {
  i18n: locale,
  data() {
    return {
      visible: undefined,
    };
  },
  computed: {
    ...mapGetters(['activeAccount', 'accounts']),
    bgIconRotate() {
      return this.visible ? 180 : 0;
    },
  },
  created() {
    this[ACCOUNTS.ACTIONS.GET_ACCOUNTS]();
  },
  methods: {
    ...mapActions([ACCOUNTS.ACTIONS.GET_ACCOUNTS, ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]),
    handleMenuClick(e) {
      if (this.activeAccount.id !== e.key) {
        this[ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID](e.key);
      }
    },
    visibleChange(visible) {
      this.visible = visible;
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-dropdown-trigger {
  span {
    margin-right: 8px;
  }
}
</style>
