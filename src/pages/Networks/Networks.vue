<template>
  <DataTableAnt
    :fields="fields"
    :items="formattedNetworks"
    :get-data="getNetworks"
    local-filter-enabled
    :local-filter-term="networksFilter"
    :on-local-filter="setNetworksFilter"
    :rows="rows"
  />
</template>

<script>
import { get, flow } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

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
    ...mapGetters(['networksFilter', 'networks']),
    formattedNetworks() {
      return flow(utils.formatNetworks)(this.networks.items);
    },
    rows() {
      return get(this.networks, ['meta', 'total-count'], 0);
    },
  },
  created() {
    this[NETWORKS.ACTIONS.GET_NETWORKS]();
  },
  methods: {
    ...mapActions([NETWORKS.ACTIONS.GET_NETWORKS, NETWORKS.ACTIONS.SET_NETWORKS_FILTER]),
  },
};
</script>
