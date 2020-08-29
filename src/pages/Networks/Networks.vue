<template>
  <DataTableAnt
    :fields="tableFields"
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

import { TABLE_HEADERS_ANT } from './constants';
import locale from './locale';

export default {
  name: 'Networks',
  components: {
    DataTableAnt,
  },
  computed: {
    ...mapGetters(['networksFilter', 'networks']),
    formattedNetworks() {
      return flow(utils.formatNetworks)(this.networks.items);
    },
    rows() {
      return get(this.networks, ['meta', 'total-count'], 0);
    },
    tableFields() {
      return TABLE_HEADERS_ANT.map((header) => (
        {
          ...header,
          title: locale.messages[this.$i18n.locale].tableMessage[header.key],
          customRender: header.customRender && header.customRender.bind(this),
        }
      ));
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
