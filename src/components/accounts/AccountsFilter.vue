<template>
  <div id='accountsFilter' class="filter">
    <b-form @submit="onSubmit" @reset="onReset">

      <b-form-group label="Name:">
        <b-form-input v-model="form.nameCont" placeholder="Enter name" size="sm"/>
      </b-form-group>

      <div class="mt-3">Filter: {{form}}</div>

      <b-button type="submit" variant="primary" size="sm">Submit</b-button>
      <b-button type="reset" variant="danger" size="sm">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'AccountsFilter',
  data () {
    return {
        form: {
          nameCont: ''
        }
    }
  },
  methods: {
    onReset(evt) {
      evt.preventDefault()
      this.form.nameCont = ''
      this.$store.dispatch('setAccountFilter', {})
      this.$emit('applyFilter')
    },
    onSubmit() {
      const filter = {};
      for(let key in this.form) {
        if (this.form[key]) {
          filter[key] = this.form[key];
        }
      }
      this.$store.dispatch('setAccountFilter', filter)
      this.$emit('applyFilter')
    }
  }
}
</script>

<style>
</style>
