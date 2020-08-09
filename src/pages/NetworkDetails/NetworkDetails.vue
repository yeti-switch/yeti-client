<template>
  <div class="network-details-page">
    <h5>{{ networkName }} network details:</h5>
    <vertical-list-ant :data-source="formattedNetworkDetails" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { NETWORKS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import utils from '@/utils';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';

export default {
  name: 'NetworkDetails',
  components: {
    VerticalListAnt,
  },
  computed: {
    ...mapGetters(['networkDetails']),
    formattedNetworkDetails() {
      return this.networkDetails.id ? utils.formatNetworkDetails(
        this.networkDetails, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS,
      ) : [];
    },
    networkName() {
      return this.networkDetails.name;
    },
  },
  created() {
    this[NETWORKS.ACTIONS.GET_NETWORK_DETAILS](this.$route.params.id);
  },
  methods: {
    ...mapActions([NETWORKS.ACTIONS.GET_NETWORK_DETAILS]),
  },
};
</script>

<style lang="scss" scoped>
.network-details-page {
  h5 {
    padding: 30px 0 30px 0;
    text-align: left;
  }
}
</style>
