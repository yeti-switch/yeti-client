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
      <img
        v-show="!navOpened"
        alt="Yeti logo"
        src="@/assets/images/logo.png"
      >
      <img
        v-show="navOpened"
        width="50px"
        height="40px"
        alt="Yeti logo"
        src="@/assets/images/yeti.svg"
      >
    </a>
    <a-menu
      mode="inline"
      theme="dark"
      :default-selected-keys="activeLink"
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
          <span>{{ getItemText(link.routeName) }}</span>
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
        <span>Logout</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { capitalize } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import {
  AUTH, ACCOUNT_INFO_ROUTE_NAMES, UI_STATE,
} from '@/constants';

import { NAV_ITEMS } from './constants';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isAuthenticated', 'linkOnLogo', 'navOpened', 'blockedPages']),
    collapsed: {
      get() {
        return this.navOpened;
      },
      set(value) {
        this[UI_STATE.ACTIONS.SET_NAV_STATE](value);
      },
    },
    navLinks() {
      return NAV_ITEMS.filter(this.isNavItemVisible);
    },
    activeLink() {
      console.log(this.$route);
      return [(this.$route.query.redirect || this.$route.path).slice(1)];
    },
  },
  methods: {
    ...mapActions([UI_STATE.ACTIONS.SET_NAV_STATE, AUTH.ACTIONS.LOGOUT]),
    logoutHandler() {
      this[AUTH.ACTIONS.LOGOUT]().then(() => this.$router.push('/login'));
    },
    getItemText(routeName) {
      return capitalize(routeName);
    },
    isNavItemVisible({ routename }) {
      return !this.blockedPages.has(routename);
    },
    getIconType(routeName) {
      if (routeName === ACCOUNT_INFO_ROUTE_NAMES.RATES) {
        return 'dollar';
      }
      if (routeName === ACCOUNT_INFO_ROUTE_NAMES.CDRS) {
        return 'bars';
      }
      if (routeName === ACCOUNT_INFO_ROUTE_NAMES.STATISTICS) {
        return 'line-chart';
      }
      if (routeName === ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT) {
        return 'team';
      }
      if (routeName === ACCOUNT_INFO_ROUTE_NAMES.NETWORKS) {
        return 'cluster';
      }
      return '';
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
  margin: 13px 0 30px;
  color: #fff;
  display: flex;
  justify-content: center;
}

.vertical-navbar-menu {
  height: 100%;
  text-align: left;
  position: relative;
}

.ant-layout-sider-collapsed {
  .logo {
    margin: 10px 0 20px 0;
  }
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
