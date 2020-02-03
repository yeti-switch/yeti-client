<template>
  <div id="dataTable">
    <slot name="filter" />
    <div
      :style="{overflow: hiddenIfLoading}"
      class="dataTable"
    >
      <slot
        name="timeRangeFilter"
      />

      <h6
        v-if="!loading"
        class="datatable-total"
      >
        Items in table: {{ rows }}
      </h6>

      <b-progress
        v-if="loading"
        :value="100"
        :animated="true"
        variant="secondary"
        class="mt-1"
        height="7px"
      />
      <b-table
        :busy="loading"
        :small="small"
        :items="items"
        :striped="striped"
        :fixed="fixed"
        :fields="fields"
        :per-page="perPage"
        class="datatable-content"
        show-empty
        sticky-header="calc(100vh - 15rem)"
        hover
      >
        <template
          v-slot:empty="scope"
        >
          <div
            class="text-left"
          >
            <b>
              {{ scope.emptyText }}
            </b>
          </div>
        </template>
        <template
          v-slot:empty="scope"
        >
          <div
            class="text-left"
          >
            <b>
              {{ scope.emptyFilteredText }}
            </b>
          </div>
        </template>
      </b-table>
      <b-pagination
        v-if="!loading && rows >= perPage"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        size="sm"
        aria-controls="dataTable"
        @input="getData"
      />
    </div>
  </div>
</template>


<script>
export default {
  name: 'Cdrs',
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    rows: {
      type: Number,
      default: 0,
    },
    getData: {
      type: Function,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      small: false,
      striped: true,
      fixed: false,
      perPage: 50,
      currentPage: 1,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isRequestPending;
    },
    hiddenIfLoading() {
      return this.loading ? 'hidden' : 'visible';
    },
  },
};
</script>


<style lang="scss">
.dataTable {
  font-size: 12px;
  white-space: nowrap;
  position: relative;

  .datatable-total {
    position: absolute;
    top: 0.5rem;
    right: 15px;
  }

  // @todo this code breaks layout of table with large number of entries
  // .datatable-content {
  //   display: table;
  //   min-width: 100%;
  // }

  .pagination {
    padding-left: 15px;
  }

  tr:nth-child(2n) {
    background-color: #fff;
  }
}
</style>
