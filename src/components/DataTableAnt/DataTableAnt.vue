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
            :placeholder="$t('message.inputPlaceholder')"
            size="large"
            @change="onFilterChange"
          >
            <a-button
              slot="enterButton"
              :disabled="!localFilter"
              @mousedown.stop="clearLocalFilter"
            >
              {{ $t('message.clear') }}
            </a-button>
          </a-input-search>
        </a-col>
      </a-row>
      <a-table
        :columns="visibleInOverview"
        :data-source="items"
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
        <template
          v-if="expandable"
          v-slot:expandedRowRender="record"
        >
          <a-descriptions>
            <a-descriptions-item
              v-for="(field) of fields"
              :key="field"
              :label="field.title"
            >
              {{ record[field.key] }}
            </a-descriptions-item>
          </a-descriptions>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';

import locale from './locale';

export default {
  name: 'DataTableAnt',
  i18n: locale,
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
    expandable: {
      type: Boolean,
      default() {
        return false;
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
    visibleInOverview() {
      return this.fields.filter((field) => field.visibleInOverview);
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
      float: left;

      .anticon {
        vertical-align: .125em;
      }
    }
  }
  .ant-table-body {
    background-color: #ffffff;
  }

}
</style>
