<template>
  <div
    v-if="isAuthenticated"
    :class="mainNavClass"
  >
    <b-button
      v-b-toggle
      class="nav-bar-collapse-button"
      :pressed.sync="navOpened"
    >
      Toggle NavBar
    </b-button>

    <b-nav vertical>
      <div class="placeholder-for-future-use">
        Search element can be placed here
      </div>
      <b-button
        v-b-toggle.statistics-pages-collapse
        class="menu-collapse"
      >
        Statistics pages
      </b-button>
      <b-collapse
        id="statistics-pages-collapse"
        v-model="statisticsVisible"
      >
        <b-nav-item
          v-if="isNavItemVisible(navigationRoutesNames.RATES)"
          :active="this.$route.path === navigationRoutesPaths.RATES"
          router-link
          :to="navigationRoutesPaths.RATES"
        >
          Rates
        </b-nav-item>
        <b-nav-item
          v-if="isNavItemVisible(navigationRoutesNames.CDRS)"
          :active="this.$route.path === navigationRoutesPaths.CDRS"
          router-link
          :to="navigationRoutesPaths.CDRS"
        >
          Cdrs
        </b-nav-item>
        <b-nav-item
          v-if="isNavItemVisible(navigationRoutesNames.ACCOUNTS)"
          :active="this.$route.path === navigationRoutesPaths.ACCOUNTS"
          router-link
          :to="navigationRoutesPaths.ACCOUNTS"
        >
          Accounts
        </b-nav-item>
      </b-collapse>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { STATISTICS_PATHS, STATISTICS_ROUTE_NAMES } from '../../constants/routing';

export default {
  name: 'NavBar',
  data() {
    return {
      navigationRoutesPaths: { ...STATISTICS_PATHS },
      navigationRoutesNames: { ...STATISTICS_ROUTE_NAMES },
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
  },
  methods: {
    isNavItemVisible(name) {
      return !this.$store.getters.blockedPages.has(name);
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
  transition: all ease-in-out 0.5s;

  & > .nav {
    width: 230px;
    transition: all ease-in-out 0.5s 0.1s;
    opacity: 1;
  }

  &.collapsed {
    & > .nav {
      width: 0;
      overflow: hidden;
      opacity: 0;
    }

    flex-basis: 0px;
    flex-grow: 0;

    .nav-bar-collapse-button {
      opacity: 0.5;
    }
  }

  .nav-bar-collapse-button {
    position: absolute;
    top: 0;
    z-index: 3;
    font-size: 14px;
    padding: 10px;
    border-radius: initial;
    box-shadow: initial;
    transition: all ease-in-out 0.5s;
  }

  & * {
    text-align: left;
  }

  .placeholder-for-future-use {
    text-align: center;
    height: 200px;
    padding: 70px 20px 0;
    color: gray;
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
