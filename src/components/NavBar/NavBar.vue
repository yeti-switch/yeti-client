<template>
  <div
    v-if="isAuthenticated"
    :class="mainNavClass"
  >
    <b-navbar-brand
      href="/"
    >
      <img
        v-if="this.$data.navOpened"
        alt="Yeti logo"
        src="../../assets/logo.png"
      >
      <img
        v-if="!this.$data.navOpened"
        width="50px"
        height="40px"
        alt="Yeti logo"
        src="../../assets/yeti.svg"
      >
    </b-navbar-brand>
    <b-nav vertical>
      <b-nav-item
        v-if="isNavItemVisible(navigationRoutesNames.RATES)"
        :active="this.$route.path === navigationRoutesPaths.RATES"
        router-link
        :to="navigationRoutesPaths.RATES"
      >
        <rates-icon />
        {{ this.$data.navOpened ? "Rates" : '' }}
      </b-nav-item>
      <b-nav-item
        v-if="isNavItemVisible(navigationRoutesNames.CDRS)"
        :active="this.$route.path === navigationRoutesPaths.CDRS"
        router-link
        :to="navigationRoutesPaths.CDRS"
      >
        <cdrs-icon />
        {{ this.$data.navOpened ? "Cdrs" : '' }}
      </b-nav-item>
      <b-nav-item
        v-if="isNavItemVisible(navigationRoutesNames.ACCOUNTS)"
        :active="this.$route.path === navigationRoutesPaths.ACCOUNTS"
        router-link
        :to="navigationRoutesPaths.ACCOUNTS"
      >
        <accounts-icon />
        {{ this.$data.navOpened ? "Accounts" : '' }}
      </b-nav-item>
      <b-nav-item
        router-link
        :to="navigationRoutesPaths.STATISTICS"
        :active="this.$route.path === navigationRoutesPaths.STATISTICS"
      >
        <statistics-icon />
        {{ this.$data.navOpened ? "Statistics" : '' }}
      </b-nav-item>
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
        {{ this.$data.navOpened ? "Logout" : '' }}
      </b-nav-item>
    </b-nav>

    <b-button
      v-b-toggle
      class="nav-bar-collapse-button"
      :pressed.sync="navOpened"
    >
      {{ collapseButtonText }}
    </b-button>
  </div>
</template>

<script>
import {
  BIconPeople, BIconCalendar, BIconBoxArrowLeft, BIconWallet, BIconGraphUp,
} from 'bootstrap-vue';
import { mapGetters } from 'vuex';
import {
  AUTH, ACCOUNT_INFO_PATHS, ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants';

export default {
  name: 'NavBar',
  components: {
    LogoutCompactIcon: BIconBoxArrowLeft,
    AccountsIcon: BIconPeople,
    CdrsIcon: BIconCalendar,
    RatesIcon: BIconWallet,
    StatisticsIcon: BIconGraphUp,
  },
  data() {
    return {
      navigationRoutesPaths: { ...ACCOUNT_INFO_PATHS },
      navigationRoutesNames: { ...ACCOUNT_INFO_ROUTE_NAMES },
      navOpened: true,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    statisticsVisible: {
      get() {
        return Object.values(ACCOUNT_INFO_PATHS).some((path) => this.$route.path === path);
      },

      // Silly setter just to suppress vue warning
      set() {
        return null;
      },
    },
    mainNavClass() {
      return `vertical-navbar-menu ${this.$data.navOpened ? 'opened' : 'collapsed'}`;
    },
    collapseButtonText() {
      return this.$data.navOpened ? 'Collapse' : '';
    },
  },
  methods: {
    isNavItemVisible(name) {
      return !this.$store.getters.blockedPages.has(name);
    },
    logout() {
      this.$store.dispatch(AUTH.ACTIONS.LOGOUT).then(() => this.$router.push('/login'));
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
    margin: 10px 0 20px 15px;
    color: #fff;
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
      background: url('../../assets/arrow.svg') center no-repeat;
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
