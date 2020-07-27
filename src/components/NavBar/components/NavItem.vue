<template>
  <b-nav-item
    v-if="isNavItemVisible(routeName)"
    router-link
    :to="routePath"
    :active="this.$route.path === routePath"
  >
    <component :is="iconName" />
    {{ getNavItemName(itemText) }}
  </b-nav-item>
</template>

<script>
import { capitalize } from 'lodash';
import {
  BIconPeople, BIconCalendar, BIconWallet, BIconGraphUp, BIconShuffle,
} from 'bootstrap-vue';
import { mapGetters } from 'vuex';

export default {
  name: 'NavItem',
  components: {
    AccountIcon: BIconPeople,
    CdrsIcon: BIconCalendar,
    RatesIcon: BIconWallet,
    StatisticsIcon: BIconGraphUp,
    NetworksIcon: BIconShuffle,
  },
  props: {
    routeName: {
      type: String,
      default: '',
    },
    routePath: {
      type: String,
      default: '',
    },
    navOpened: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['blockedPages']),
    iconName() {
      return `${this.routeName}-icon`;
    },
    itemText() {
      return capitalize(this.routeName);
    },
  },
  methods: {
    isNavItemVisible(name) {
      return !this.blockedPages.has(name);
    },
    getNavItemName(name) {
      return this.navOpened ? name : '';
    },
  },
};
</script>
