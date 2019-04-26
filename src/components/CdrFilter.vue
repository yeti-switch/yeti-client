<template>
  <div id='cdrFilter'>
    <b-form @submit="onSubmit" @reset="onReset"  class="filter">
      <b-form-group label="Source prefix in:">
        <b-form-input v-model="form.srcPrefixIn" placeholder="Enter source prefix" size="sm"/>
      </b-form-group>

      <b-form-group label="Duration:">
        <b-form-input v-model="form.duration" placeholder="From" size="sm"/>
        <b-form-input v-model="form.duration" placeholder="To" size="sm"/>
      </b-form-group>

      <b-form-group label="Success:">
        <b-form-select v-model="form.success" :options="success" size="sm">Success</b-form-select>
      </b-form-group>

      <div class="mt-3">Filter: {{form}}</div>

      <b-button type="submit" variant="primary" size="sm">Submit</b-button>
      <b-button type="reset" variant="danger" size="sm">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'CdrFilter',
  data () {
    return {
        form: {
          success: null,
          duration: '',
          srcPrefixIn: '',
        },
        success: [{ text: 'Select One', value: null }, 'true', 'false']
    }
  },
  methods: {
    onReset(evt) {
      evt.preventDefault()
      this.form.duration = ''
      this.form.srcPrefixIn = ''
      this.form.success = null
      this.$emit('applyFilter')
    },
    onSubmit(evt) {
      const filter = {};
      for(let key in this.form) {
        console.log(key)
        if (this.form[key]) {
          filter[key] = this.form[key];
        }
      }

      console.log(filter);
      this.$emit('applyFilter', filter)
    }
  }
}
</script>

<style>
  #cdrFilter {
    background-color: #f2f2f2;
    border:1px solid black;
    font-size: 12px;
    margin-left: 5pt;
    padding: 5pt;
    overflow: hidden;
    width: 320px;
    float: left;
    text-align: left;
  }
</style>
