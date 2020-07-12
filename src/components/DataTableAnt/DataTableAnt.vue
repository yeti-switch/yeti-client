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
        <span
          slot="badge"
          slot-scope="badge"
        >
          <a-tag
            :key="badge"
            :color="badge === 'No' ? 'volcano' : ''"
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
