<template>
  <DataTableAnt
    :fields="fields"
    :items="networks"
    :get-data="getNetworks"
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
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
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
