<template>
  <div id="dataTableAnt">
    <slot name="filter" />
    <div
      :style="{overflow: hiddenIfLoading}"
      class="dataTable"
    >
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
      <a-table
        :columns="fields"
        :data-source="items"
        :scroll="{ x: true, y: 700 }"
        :pagination="{ pageSize: 50, total: rows, hideOnSinglePage: true }"
        @change="onPaginationChange"
      >
        <span
          slot="badge"
          slot-scope="badge"
        >
          <a-tag
            :key="badge"
            :color="badge === 'No' || badge === 'false' ? 'volcano' : ''"
          >
            {{ badge }}
          </a-tag>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';

export default {
  name: 'DataTableAnt',
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
    rows: {
      type: Number,
      default: 0,
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
    getData: {
      type: Function,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // Dynamic data
      localFilter: this.localFilterTerm || null,
      searchText: '',
    };
  },
  computed: {
    ...mapGetters(['requestIsPending']),
    hiddenIfLoading() {
      return this.requestIsPending ? 'hidden' : 'visible';
    },
  },
  methods: {
    onFilterChange: debounce(function onInputChange(localFilterTerm) {
      this.onLocalFilter(localFilterTerm);
    }, 300),
    clearLocalFilter() {
      this.localFilter = '';
      this.onLocalFilter(this.localFilter);
    },
    onPaginationChange(page) {
      this.getData(page.current);
    },
  },
};
</script>

<style lang="scss">
.ant-table {
  td {
    white-space: nowrap;
  }
}

#localFilterInput {
  &:focus {
    box-shadow: none;
  }
}

.ant-table-wrapper {
  .ant-table-pagination {
    &.ant-pagination {
      float: initial;

      .anticon {
        vertical-align: .125em;
      }
    }
  }
}
</style>
