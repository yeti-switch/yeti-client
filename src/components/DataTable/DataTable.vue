<template>
  <div id="dataTable">
    <slot name="filter" />
    <div
      :style="{overflow: hiddenIfLoading}"
      class="dataTable"
    >
      <h6
        v-if="!loading"
        class="datatable-total"
      >
        Items in table: {{ rows }}
      </h6>

      <b-progress
        v-show="loading"
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
        sticky-header="calc(100vh - 9rem)"
        hover
      >
        <!-- Idea for v-slot dynamic names: https://stackoverflow.com/questions/58140842/vue-and-bootstrap-vue-dynamically-use-slots/58143362#58143362 -->
        <template
          v-for="badge in itemsToBadge"
          v-slot:[getBadgedCellName(badge.id)]="data"
        >
          <!-- Add support for different kind of badges, if needed -->
          <b-badge
            v-if="data.item[badge.id] === badge.errorValue"
            :key="badge.errorValue"
            pill
            variant="danger"
          >
            {{ data.item[badge.id] }}
          </b-badge>
          {{ data.item[badge.id] !== badge.errorValue ? data.item[badge.id] : '' }}
        </template>
      </b-table>
      <b-pagination
        v-show="!loading && rows >= perPage"
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
    itemsToBadge: {
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
      return this.$store.getters.requestIsPending;
    },
    hiddenIfLoading() {
      return this.loading ? 'hidden' : 'visible';
    },
  },
  methods: {
    getBadgedCellName(id) {
      return `cell(${id})`;
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

  .badge {
    border-radius: 0;
    padding: 0.25rem 0.5rem;
    font-size: 100%;
  }
}
</style>
