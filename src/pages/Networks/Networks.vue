<template>
  <DataTable
    :fields="fields"
    :items="networks"
    :rows="rows"
    :link-items="linkItems"
    :get-data="getNetworks"
  />
</template>

<script>
import { get } from 'lodash';

import { NETWORKS } from '@/constants';

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
      linkItems: ['name'],
    };
  },
  computed: {
    networks() {
      return this.$store.getters.networks.items && this.$store.getters.networks.items.map((item) => ({ ...item, 'network-type': item['network-type'].name }));
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
  },
};
</script>

<style>
</style>
