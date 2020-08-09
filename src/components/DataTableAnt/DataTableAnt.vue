<template>
  <div id="dataTableAnt">
    <div
      :style="{overflow: hiddenIfLoading}"
      class="dataTable"
    >
      <a-row
        v-if="localFilterEnabled"
        :gutter="[16, 16]"
      >
        <a-col
          :span="6"
          class="gutter-row"
        >
          <a-input-search
            v-model="localFilter"
            placeholder="input search text"
            size="large"
            @change="onFilterChange"
          >
            <a-button
              slot="enterButton"
              :disabled="!localFilter"
              @mousedown.stop="clearLocalFilter"
            >
              Clear
            </a-button>
          </a-input-search>
        </a-col>
      </a-row>
      <a-table
        :columns="fields"
        :data-source="items"
        :scroll="{ x: true, y: 700 }"
        :pagination="{ pageSize: 50, total: rows, hideOnSinglePage: true }"
        :loading="requestIsPending"
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
    onFilterChange: debounce(function onInputChange(e) {
      this.onLocalFilter(e.target.value);
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

  table {
    width: 100% !important;
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
