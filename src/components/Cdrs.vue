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
      const cdrs = this.$store.state.cdrs.cdrs // TODO: move somewhere

      const cdrsAttr = []
      if (cdrs && cdrs.data) {
        for(let cdr of cdrs.data) {
          cdrsAttr.push(cdr.attributes)
        }
      }
      return cdrsAttr
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
