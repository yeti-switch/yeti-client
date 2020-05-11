<template>
  <div class="network-details-page">
    <b-table
      stacked
      :items="networkDetails"
    />
  </div>
</template>

<script>
import { NETWORKS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import utils from '@/utils';

export default {
  name: 'NetworkDetails',
  computed: {
    networkDetails() {
      return utils.formatNetworkDetails(
        this.$store.getters.networkDetails, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS,
      );
    },
  },
  created() {
    this.getNetworkDetails();
  },
  methods: {
    getNetworkDetails() {
      this.$store.dispatch(NETWORKS.ACTIONS.GET_NETWORK_DETAILS, this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
.accounts-page {
  // Following rules are so big, so they will be able to overwrite library styles
  .table.b-table.b-table-stacked {
    & > tbody {
      & > tr {
        & > [data-label] {
          text-align: left;

          &::before {
            text-align: left;
            width: 20%;
          }
        }

      }
    }
  }
}
</style>
