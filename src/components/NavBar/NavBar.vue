<template>
  <a-layout-sider
    v-if="isAuthenticated"
    v-model="collapsed"
    collapsible
  >
    <a
      class="logo"
      :href="linkOnLogo"
      target="_blank"
    >
      <div
        v-show="!navCollapsed"
        class="logo-regular"
      />
      <div
        v-show="navCollapsed"
        class="logo-collapsed"
      />
    </a>
    <a-menu
      mode="inline"
      theme="dark"
      :selected-keys="selectedKeys"
    >
      <a-menu-item
        v-for="link in navLinks"
        :key="link.routeName"
        :level="2"
      >
        <router-link :to="link.routePath">
          <a-icon
            :type="getIconType(link.routeName)"
          />
          <span>{{ $t(`message.${link.routeName}`) }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
    <a-menu
      class="logout-wrapper"
      theme="dark"
      mode="vertical"
    >
      <a-menu-item
        v-if="isAuthenticated"
        href="#"
        @click="logoutHandler"
      >
        <a-icon type="logout" />
        <span>{{ $t('message.logout') }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { AUTH, UI_STATE } from '@/constants';

import { NAV_ITEMS, ROUTE_TO_ICON_MAPPINGS } from './constants';
import locale from './locale';

export default {
  name: 'NavBar',
  i18n: locale,
  data() {
    return {
      selectedKeys: [''],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'linkOnLogo', 'navCollapsed', 'blockedPages']),
    collapsed: {
      get() {
        return this.navCollapsed;
      },
      set(value) {
        this[UI_STATE.ACTIONS.SET_NAV_STATE](value);
      },
    },
    navLinks() {
      return NAV_ITEMS.filter(this.isNavItemVisible);
    },
  },
  watch: {
    $route(to) {
      this.selectedKeys = [to.name];
    },
  },
  mounted() {
    this.selectedKeys = [this.$route.name];
  },
  methods: {
    ...mapActions([UI_STATE.ACTIONS.SET_NAV_STATE, AUTH.ACTIONS.LOGOUT]),
    logoutHandler() {
      this[AUTH.ACTIONS.LOGOUT]().then(() => this.$router.push('/login'));
    },
    isNavItemVisible({ routename }) {
      return !this.blockedPages.has(routename);
    },
    getIconType(routeName) {
      return ROUTE_TO_ICON_MAPPINGS[routeName];
    },
  },
};
</script>

<style lang="scss">
.ant-layout-sider {
  padding-bottom: 0;
  height: 100%;
  background-color: #222d32;
}

.logo {
  margin: 13px 0 20px;
  color: #fff;
  display: flex;
  justify-content: center;
}

.vertical-navbar-menu {
  height: 100%;
  text-align: left;
  position: relative;
}

.logo-regular {
  height: 80px;
  width: 100%;
  background: url('../../assets/images/logo.png') top center no-repeat;
}

.logo-collapsed {
  height: 80px;
  width: 100%;
  background: url('../../assets/images/yeti.svg') top/50px no-repeat;
}

.ant-menu-item > a {
  display: flex;
  align-items: center;
}

.logout-wrapper {
  position: absolute;
  left: 0;
  bottom: 60px;
  width: 100%;

  .ant-menu-item {
    display: flex;
    align-items: center;
  }
}
</style>
