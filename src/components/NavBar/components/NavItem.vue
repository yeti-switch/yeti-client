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
    iconName() {
      return `${this.$props.routeName}-icon`;
    },
    itemText() {
      return capitalize(this.$props.routeName);
    },
  },
  methods: {
    isNavItemVisible(name) {
      return !this.$store.getters.blockedPages.has(name);
    },
    getNavItemName(name) {
      return this.$props.navOpened ? name : '';
    },
  },
};
</script>
