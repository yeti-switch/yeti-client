<template>
  <div
    v-if="isAuthenticated"
    :class="mainNavClass"
  >
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
  },
};
</script>

<style lang="scss">
.vertical-navbar-menu {
  height: 100%;
  flex: 1 1 230px;
  background-color: #222d32;
  position: relative;
  padding-top: 40px;

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
    box-shadow: initial;
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

  & * {
    text-align: left;
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
