<template>
  <div id="dataTable">
    <slot name="filter" />
    <div class="dataTable">
      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
      />
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        v-on:change="getData"
        :disabled="loading"
        align="right"
        size="sm"
        aria-controls="dataTable"
      />
      <h6 class="datatable-total">
        Items in table: {{ rows }}
      </h6>
      <b-table
        v-if="!loading"
        :small="small"
        :items="items"
        :per-page="perPage"
        :striped="striped"
        :fixed="fixed"
        :fields="fields"
        sticky-header="calc(100vh - 12rem)"
        hover
      >
        <template
          :slot="badgedItem"
          slot-scope="row"
        >
          <b-badge
            v-bind:variant="row.item[badgedItem] ? 'success' : 'danger'"
            pill
          >
            {{ row.item[badgedItem] }}
          </b-badge>
        </template>
      </b-table>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Cdrs',
  props: ['fields', 'items', 'rows', 'badgedItem', 'getData'],
  data () {
    return {
      small: false,
      striped: true,
      fixed: false,
      perPage: 50,
      currentPage: 1
    }
  },
  computed: {
    loading: function () {
      return this.$store.getters.isRequestPending
    },
  }
}
</script>


<style>
.dataTable {
  font-size: 12px;
  white-space: nowrap;
  margin-inline-start: 340px;
  position: relative;
}

.dataTable .datatable-total {
  position: absolute;
  top: 0.5rem;
  left: 0;
}
</style>

