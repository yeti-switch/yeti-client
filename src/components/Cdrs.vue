<template>
<div id="cdrs">
  <h3>CDR</h3>
  <b-spinner variant="primary" label="Spinning" v-if="loading"/>
      <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="myTable"
    />
    <p class="mt-3">Current Page: {{ currentPage }}</p>
  <b-table hover :items="cdrs" v-if="cdrs"/>
</div>
</template>

<script>
export default {
  name: 'cdrs',
  data () {
    return {
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