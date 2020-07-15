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
        :pagination="{ pageSize: 30 }"
      >
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            Search
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="() => handleReset(clearFilters)"
          >
            Reset
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
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
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      const [selectedKey] = selectedKeys;
      this.searchText = selectedKey;
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
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
