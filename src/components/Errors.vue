<template>
<div id="errors">
  <b-alert show variant="danger" v-if="error"> {{error}} </b-alert>
</div>
</template>

<script>
export default {
  name: 'errors',
  computed: {
    error: function () {
      return this.$store.state.errors.error
    }
  }
}
</script>
