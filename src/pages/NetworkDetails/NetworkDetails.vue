<template>
  <div class="network-details-page">
    <h5>{{ $t('message.networkDetails') }} {{ networkName }}</h5>
    <vertical-list-ant :data-source="formattedNetworkDetails" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { flow } from 'lodash';

import { NETWORKS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import utils from '@/utils';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';

import locale from './locale';

export default {
  name: 'NetworkDetails',
  i18n: locale,
  components: {
    VerticalListAnt,
  },
  computed: {
    ...mapGetters(['networkDetails']),
    formattedNetworkDetails() {
      return this.networkDetails.id ? flow(
        utils.formatNetworkDetails(COMMON_TABLE_ENTITY_EXCLUDED_FIELDS),
        utils.applyLocaleHeaders(locale.messages[this.$i18n.locale].tableMessage),
      )(this.networkDetails) : [];
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
    font-size: 1.25rem;
  }
}
</style>
