<template>
  <div class="network-details-page">
    <h5>{{ networkDetails[0].Name }} network details:</h5>
    <b-table
      stacked
      :items="networkDetails"
      small
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
      return this.$store.getters.networkDetails.id ? utils.formatNetworkDetails(
        this.$store.getters.networkDetails, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS,
      ) : [{}];
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
.network-details-page {
  // Following rules are so big, so they will be able to overwrite library styles
  h5 {
    padding: 30px 0 30px 0;
    text-align: left;
  }

  .table.b-table.b-table-stacked {
    width: 50%;

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
