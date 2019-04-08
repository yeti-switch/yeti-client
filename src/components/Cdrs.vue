<template>
  <div id="cdrs">
    <h3>CDR</h3>
    <b-spinner variant="primary" label="Spinning" v-if="loading"/>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      size="sm"
      aria-controls="cdrsTable"
      />
    <b-table hover v-if="cdrs" id="cdrsTable"
      :small="small"
      :items="cdrs"
      :per-page="perPage"
      :current-page="currentPage"
      :striped="striped"
      :fixed="fixed"
      />
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      size="sm"
      aria-controls="cdrsTable"
      />
    <p class="mt-3">Total: {{ rows }}</p>
  </div>
</template>

<script>
export default {
  name: 'cdrs',
  data () {
    return {
      small: true,
      striped: true,
      fixed: false,
      perPage: 10,
      currentPage: 1,
    }
  },
  computed: {
    cdrs: function () {
      return this.$store.state.cdrs.cdrs.data // TODO: move somewhere
    },
    loading: function () {
      return this.$store.state.cdrs.requestPending
    },
    rows: function () {
      if (this.$store.state.cdrs.cdrs.data) {
        return this.$store.state.cdrs.cdrs.data.length
      }
    }
  },
  methods: {
    getCdrs: function () {
      this.$store.dispatch('getCdrs')
        .catch(err => {
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    }
  },
  created: function () {
    this.getCdrs()
  }
}
</script>

<style>
  table {
    white-space:nowrap;
  }
</style>
