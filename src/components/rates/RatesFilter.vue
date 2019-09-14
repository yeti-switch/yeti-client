<template>
  <div
    id="ratesFilter"
    class="filter"
  >
    <b-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <b-form-group label="Valid From:">
        <b-form-input
          v-model="form.validFromGteq"
          type="date"
          size="sm"
        />
      </b-form-group>

      <b-form-group label="Valid Till:">
        <b-form-input
          v-model="form.validTillLteq"
          type="date"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Prefix:">
        <b-form-input
          v-model="form.prefixEq"
          placeholder="Enter prefix"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Reject Calls:">
        <b-form-select
          v-model="form.rejectCallsEq"
          :options="rejectCallsEq"
          size="sm"
        >
          Reject Calls
        </b-form-select>
      </b-form-group>
      <b-form-group label="Enabled:">
        <b-form-select
          v-model="form.enabledEq"
          :options="enabledEq"
          size="sm"
        >
          Enabled
        </b-form-select>
      </b-form-group>

      <div class="mt-3">
        Filter: {{ form }}
      </div>

      <b-button
        type="submit"
        variant="primary"
        size="sm"
      >
        Submit
      </b-button>
      <b-button
        type="reset"
        variant="danger"
        size="sm"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'RatesFilter',
  data () {
    return {
      form: {
        validFromGteq: '',
        validTillLteq: '',
        rejectCallsEq: null,
        enabledEq: null,
        prefixEq: '',
        networkPrefixEq: ''
      },
      enabledEq: [{ text: 'Select One', value: null }, 'true', 'false'],
      rejectCallsEq: [{ text: 'Select One', value: null }, 'true', 'false']
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      this.form.validFromGteq = ''
      this.form.validTillLteq = ''
      this.form.rejectCallsEq = null
      this.form.enabledEq = null
      this.form.prefixEq = ''
      this.$store.dispatch('setRateFilter', {})
      this.$emit('applyFilter')
    },
    onSubmit () {
      const filter = {}
      for (let key in this.form) {
        if (this.form[key]) {
          filter[key] = this.form[key]
        }
      }
      this.$store.dispatch('setRateFilter', filter)
      this.$emit('applyFilter')
    }
  }
}
</script>

<style>
</style>
