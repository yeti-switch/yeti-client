<template>
  <div
    v-if="isAuthenticated"
    :class="mainNavClass"
  >
    <b-navbar-brand
      :href="linkOnLogo"
      target="_blank"
    >
      <img
        v-show="navOpened"
        alt="Yeti logo"
        src="@/assets/images/logo.png"
      >
      <img
        v-show="!navOpened"
        width="50px"
        height="40px"
        alt="Yeti logo"
        src="@/assets/images/yeti.svg"
      >
    </b-navbar-brand>
    <b-nav vertical>
      <nav-item
        v-for="link in navLinks"
        :key="link.routeName"
        :route-name="link.routeName"
        :route-path="link.routePath"
        :nav-opened="navOpened"
      />
    </b-nav>
    <b-nav
      vertical
      class="logout-wrapper"
    >
      <b-nav-item
        v-if="isAuthenticated"
        href="#"
        @click="logout"
      >
        <logout-compact-icon />
        {{ getNavItemName('Logout') }}
      </b-nav-item>
    </b-nav>
    <b-button
      v-b-toggle
      class="nav-bar-collapse-button"
      @click="toggleNavState"
    >
      {{ getNavItemName('Collapse') }}
    </b-button>
  </div>
</template>

<script>
import {
  BIconBoxArrowLeft,
} from 'bootstrap-vue';
import { mapGetters } from 'vuex';
import {
  AUTH, ACCOUNT_INFO_PATHS, ACCOUNT_INFO_ROUTE_NAMES, UI_STATE,
} from '@/constants';

import NavItem from './components/NavItem';

export default {
  name: 'NavBar',
  components: {
    LogoutCompactIcon: BIconBoxArrowLeft,
    NavItem,
  },
  data() {
    return {
      navigationRoutesPaths: { ...ACCOUNT_INFO_PATHS },
      navigationRoutesNames: { ...ACCOUNT_INFO_ROUTE_NAMES },
      navLinks: [{
        routePath: ACCOUNT_INFO_PATHS.RATES,
        routeName: ACCOUNT_INFO_ROUTE_NAMES.RATES,
      }, {
        routePath: ACCOUNT_INFO_PATHS.CDRS,
        routeName: ACCOUNT_INFO_ROUTE_NAMES.CDRS,
      }, {
        routePath: ACCOUNT_INFO_PATHS.ACCOUNT,
        routeName: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT,
      }, {
        routePath: ACCOUNT_INFO_PATHS.NETWORKS,
        routeName: ACCOUNT_INFO_ROUTE_NAMES.NETWORKS,
      }, {
        routePath: ACCOUNT_INFO_PATHS.STATISTICS,
        routeName: ACCOUNT_INFO_ROUTE_NAMES.STATISTICS,
      }],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'linkOnLogo', 'navOpened']),
    mainNavClass() {
      return `vertical-navbar-menu ${this.navOpened ? 'opened' : 'collapsed'}`;
    },
  },
  methods: {
    toggleNavState() {
      this.$store.dispatch(UI_STATE.ACTIONS.SET_NAV_STATE, !this.navOpened);
    },
    logout() {
      this.$store.dispatch(AUTH.ACTIONS.LOGOUT).then(() => this.$router.push('/login'));
    },
    getNavItemName(name) {
      return this.navOpened ? name : '';
    },
  },
};
</script>

<style lang="scss">
.vertical-navbar-menu {
  height: 100%;
  flex: 1 1 230px;
  background-color: #222d32;
  position: relative;
    text-align: left;

  .navbar-brand {
    margin: 13px 0 30px;
    color: #fff;
    display: flex;
    justify-content: center;
  }

  & > .nav {
    width: 230px;

    .router-link-exact-active {
      border-left: 1px solid #3c8dbc;
    }
  }

  &.collapsed {
    .navbar-brand {
      margin: 10px 0 20px 0;
    }

    & > .nav {
      width: 50px;
      text-align: center;
    }

    flex-basis: 0px;
    flex-grow: 0;

    .nav-bar-collapse-button {
      &:after {
        transform: rotateY(180deg)
      }
    }

    .nav-link {
      padding: .5rem .7rem .5rem .7rem;
    }

    .logout-wrapper {
      .nav-link {
        .b-icon.bi {
          color: #fff;
        }
      }
    }
  }

  .logout-wrapper {
    position: absolute;
    left: 0;
    bottom: 60px;
  }

  .nav-bar-collapse-button {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: initial;
    box-shadow: initial !important; // Needed to overwrite default library box-shadow
    outline: none;
    height: 40px;

    &:after {
      content: '';
      background: url('../../assets/images/arrow.svg') center no-repeat;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 50px;
    }
  }

  .menu-collapse {
    box-shadow: initial;
    border-radius: initial;
    background-color: #1e282c;
    border: initial;
    border-left: 1px solid #3c8dbc;
  }

  .nav-link {
    background-color: #2c3b41;
    color: #8aa4af;
    outline: none;
    padding: .5rem .7rem .5rem .8rem;

    &.router-link-exact-active {
      color: white;
    }

    .b-icon.bi {
      font-size: 150%;
    }
  }
}
</style>
