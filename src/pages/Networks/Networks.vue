<template>
  <DataTable
    :fields="fields"
    :items="networks"
    :rows="rows"
    :link-items="linkItems"
    :get-data="getNetworks"
    local-filter-enabled
    :local-filter-term="networksFilter"
    :on-local-filter="onNetworksFilter"
  />
</template>

<script>
import { get, flow } from 'lodash';
import { mapGetters } from 'vuex';
import { NETWORKS } from '@/constants';
import utils from '@/utils';
import DataTable from '@/components/DataTable/DataTable';
import { TABLE_HEADERS } from './constants';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'Networks',
  components: {
    DataTable,
  },
  data() {
    return {
      // Table fields
      fields: TABLE_HEADERS,
      linkItems: [{ id: 'name', linkBase: '/network-details/' }],
    };
  },
  computed: {
    ...mapGetters(['networksFilter']),
    networks() {
      return flow(utils.formatNetworks)(this.$store.getters.networks.items);
    },
    rows() {
      return get(this.$store.getters, ['networks', 'meta', 'total-count'], 0);
    },
  },
  created() {
    this.getNetworks();
  },
  methods: {
    getNetworks(pageNumber) {
      this.$store.dispatch(NETWORKS.ACTIONS.GET_NETWORKS, pageNumber);
    },
    onNetworksFilter(filterTerm) {
      this.$store.dispatch(NETWORKS.ACTIONS.SET_NETWORKS_FILTER, filterTerm);
    },
  },
};
</script>

<style>

</style>
