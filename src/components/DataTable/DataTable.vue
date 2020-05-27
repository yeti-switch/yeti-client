<template>
  <div id="dataTable">
    <slot name="filter" />
    <div
      :style="{overflow: hiddenIfLoading}"
      class="dataTable"
    >
      <h6
        v-if="!requestIsPending"
        class="datatable-total"
      >
        Items in table: {{ rows }}
      </h6>
      <b-container
        v-if="localFilterEnabled"
        fluid
        class="mb-4 mt-2"
      >
        <b-row
          align-h="start"
        >
          <b-col
            cols="3"
          >
            <b-input-group>
              <b-form-input
                id="localFilterInput"
                v-model="localFilter"
                type="search"
                placeholder="Type to Search"
                @input="onFilterChange"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!localFilter"
                  @click="clearLocalFilter"
                >
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
      <b-progress
        v-show="requestIsPending"
        :value="100"
        :animated="true"
        variant="secondary"
        class="mt-1"
        height="7px"
      />
      <b-table
        :busy="requestIsPending"
        :small="small"
        :items="items"
        :striped="striped"
        :fields="fields"
        :fixed="fixed"
        :per-page="perPage"
        class="datatable-content"
        show-empty
        sticky-header="calc(100vh - 10rem)"
        hover
      >
        <!-- Idea for v-slot dynamic names: https://stackoverflow.com/questions/58140842/vue-and-bootstrap-vue-dynamically-use-slots/58143362#58143362 -->
        <template
          v-for="badge in itemsToBadge"
          v-slot:[getCustomCellName(badge.id)]="data"
        >
          <!-- Add support for different kinds of badges, if needed -->
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
        <template
          v-for="link in linkItems"
          v-slot:[getCustomCellName(link.id)]="data"
        >
          <b-link
            :key="link.id"
            router-link
            :to="link.linkBase + data.item.id"
          >
            {{ data.item[link.id] }}
          </b-link>
        </template>
      </b-table>
      <b-pagination
        v-show="!requestIsPending && rows >= perPage"
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
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';

export default {
  name: 'DataTable',
  props: {
    localFilterEnabled: {
      type: Boolean,
      default: false,
    },
    onLocalFilter: {
      type: Function,
      default: () => null,
    },
    localFilterTerm: {
      type: String,
      default: null,
    },
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
    linkItems: {
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
      // Table options
      small: false,
      striped: true,
      fixed: false,
      perPage: 50,
      currentPage: 1,
      // Dynamic data
      localFilter: this.localFilterTerm || null,
    };
  },
  computed: {
    ...mapGetters(['requestIsPending']),
    hiddenIfLoading() {
      return this.requestIsPending ? 'hidden' : 'visible';
    },
  },
  methods: {
    getCustomCellName(id) {
      return `cell(${id})`;
    },
    onFilterChange: debounce(function onInputChange(localFilterTerm) {
      this.onLocalFilter(localFilterTerm);
    }, 300),
    clearLocalFilter() {
      this.localFilter = '';
      this.onLocalFilter(this.localFilter);
    },
  },
};
</script>

<style lang="scss">
.dataTable {
  font-size: 12px;
  white-space: nowrap;
  position: relative;

  #localFilterInput {
    &:focus {
      box-shadow: none;
    }
  }

  .datatable-total {
    position: absolute;
    top: 0.5rem;
    right: 15px;
  }

  .filter-group-wrapper {
    margin-bottom: 20px;
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
