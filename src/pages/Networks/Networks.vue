<template>
  <DataTableAnt
    :fields="fields"
    :items="networks"
    :get-data="getNetworks"
    local-filter-enabled
    :local-filter-term="networksFilter"
    :on-local-filter="onNetworksFilter"
    :rows="rows"
  />
</template>

<script>
import { get, flow } from 'lodash';
import { mapGetters } from 'vuex';

import { NETWORKS } from '@/constants';
import utils from '@/utils';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';

export default {
  name: 'Networks',
  components: {
    DataTableAnt,
  },
  data() {
    return {
      // Table fields
      fields: [
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Name',
          width: 300,
          customRender: (name, row) => (<a
            router-link
            href={`#/network-details/${row.id}`}
          >
            {name}
          </a>),
        },
        {
          key: 'network-type',
          dataIndex: 'network-type',
          title: 'Type',
          width: 300,
        },
        {
          key: 'id',
          dataIndex: 'id',
          title: 'Uuid',
          width: 300,
        },
      ],
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
