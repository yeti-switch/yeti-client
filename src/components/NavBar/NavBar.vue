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
      <home-compact v-if="!this.$data.navOpened" />
    </b-navbar-brand>
    <b-nav vertical>
      <b-nav-item
        v-if="isNavItemVisible(navigationRoutesNames.RATES)"
        :active="this.$route.path === navigationRoutesPaths.RATES"
        router-link
        :to="navigationRoutesPaths.RATES"
      >
        {{ navItemNameHadler('Rates') }}
      </b-nav-item>
      <b-nav-item
        v-if="isNavItemVisible(navigationRoutesNames.CDRS)"
        :active="this.$route.path === navigationRoutesPaths.CDRS"
        router-link
        :to="navigationRoutesPaths.CDRS"
      >
        {{ navItemNameHadler('Cdrs') }}
      </b-nav-item>
      <b-nav-item
        v-if="isNavItemVisible(navigationRoutesNames.ACCOUNTS)"
        :active="this.$route.path === navigationRoutesPaths.ACCOUNTS"
        router-link
        :to="navigationRoutesPaths.ACCOUNTS"
      >
        {{ navItemNameHadler('Accounts') }}
      </b-nav-item>
      <b-nav-item
        router-link
        :to="navigationRoutesPaths.ACTIVE_CALLS"
        :active="this.$route.path === navigationRoutesPaths.ACTIVE_CALLS"
      >
        {{ navItemNameHadler('Active Calls') }}
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
        <span v-if="this.$data.navOpened">

          {{ navItemNameHadler('Logout') }}
        </span>
        <logout-compact
          v-if="!this.$data.navOpened"
          href="#"
          @click="logout"
        />
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
import { BIconHouse, BIconBoxArrowLeft } from 'bootstrap-vue';
import { mapGetters } from 'vuex';
import {
  STATISTICS_PATHS, STATISTICS_ROUTE_NAMES, AUTH, CHARTS_PATHS, CHARTS_ROUTE_NAMES,
} from '@/constants';

export default {
  name: 'NavBar',
  components: {
    HomeCompact: BIconHouse,
    LogoutCompact: BIconBoxArrowLeft,
  },
  data() {
    return {
      navigationRoutesPaths: { ...STATISTICS_PATHS, ...CHARTS_PATHS },
      navigationRoutesNames: { ...STATISTICS_ROUTE_NAMES, CHARTS_ROUTE_NAMES },
      navOpened: true,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    statisticsVisible: {
      get() {
        return Object.values(STATISTICS_PATHS).some((path) => this.$route.path === path);
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
    navItemNameHadler(name) {
      return this.$data.navOpened ? name : name[0];
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
    color: #fff
  }

  & > .nav {
    width: 230px;

    .router-link-exact-active {
      border-left: 1px solid #3c8dbc;
    }
  }

  &.collapsed {
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

    .logout-wrapper {
      .nav-link {
        padding: .5rem 0;
        .b-icon.bi {
          font-size: 150%;
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

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
