<template>
  <div id="dataTable">
    <slot name="filter" />
    <div class="dataTable">
      <slot
        name="quickFilter"
      />

      <h6
        v-if="!loading"
        class="datatable-total"
      >
        Items in table: {{ rows }}
      </h6>
      <b-table
        :busy="loading"
        :small="small"
        :items="items"
        :per-page="perPage"
        :striped="striped"
        :fixed="fixed"
        :fields="fields"
        show-empty
        sticky-header="calc(100vh - 12rem)"
        hover
      >
        <template
          v-slot:table-busy
        >
          <div
            class="text-left my-2"
          >
            <b-spinner
              class="align-middle"
            />
            <strong>
              Loading...
            </strong>
          </div>
        </template>

        <template
          v-slot:empty="scope">
          <div
            class="text-left"
          >
            <b>
              {{ scope.emptyFilteredText }}
            </b>
          </div>
        </template>
        <template
          :slot="badgedItem"
          slot-scope="row"
        >
          <b-badge
            :variant="row.item[badgedItem] ? 'success' : 'danger'"
            pill
          >
            {{ row.item[badgedItem] }}
          </b-badge>
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
        @change="getData"
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
    badgedItem: {
      type: String,
      default: '',
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
    onlyOnePage() {
      return false;
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

  .pagination {
    padding-left: 15px;
  }

  tr:nth-child(2n) {
    background-color: #fff;
  }
}
</style>
