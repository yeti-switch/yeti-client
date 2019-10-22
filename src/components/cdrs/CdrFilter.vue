<template>
  <div
    id="cdrFilter"
    class="filter"
  >
    <b-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <b-form-group label="Start time greater or equal than:">
        <b-form-input
          v-model="form.timeStartGteq"
          type="date"
          size="sm"
        />
      </b-form-group>

      <b-form-group label="Start time less or equal than:">
        <b-form-input
          v-model="form.timeStartLteq"
          type="date"
          size="sm"
        />
      </b-form-group>

      <b-form-group label="Source prefix routing:">
        <b-form-input
          v-model="form.srcPrefixRouting"
          placeholder="Enter source prefix routing"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Destination prefix routing:">
        <b-form-input
          v-model="form.dstPrefixRouting"
          placeholder="Enter destination prefix routing"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Leg A disconnect code:">
        <b-form-input
          v-model="form.legaDisconnectCode"
          placeholder="Enter disconnect code"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Leg A disconnect reason:">
        <b-form-input
          v-model="form.legaDisconnectReason"
          placeholder="Enter disconnect reason"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Source prefix in:">
        <b-form-input
          v-model="form.srcPrefixIn"
          placeholder="Enter source prefix in"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Destination prefix in:">
        <b-form-input
          v-model="form.dstPrefixIn"
          placeholder="Enter destination prefix in"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Diversion in:">
        <b-form-input
          v-model="form.diversionIn"
          placeholder="Enter diversion in"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Source name in:">
        <b-form-input
          v-model="form.srcNameIn"
          placeholder="Enter source name in"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Local tag:">
        <b-form-input
          v-model="form.localTag"
          placeholder="Enter local tag"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Duration:">
        <b-form-input
          v-model="form.duration"
          placeholder="Call duration"
          size="sm"
        />
      </b-form-group>
      <b-form-group label="Success:">
        <b-form-select
          v-model="form.success"
          :options="success"
          size="sm"
        >
          Success
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
  name: 'CdrFilter',
  data() {
    return {
      form: {
        timeStartGteq: '',
        timeStartLteq: '',
        success: null,
        duration: '',
        srcPrefixRouting: '',
        dstPrefixRouting: '',
        legaDisconnectCode: '',
        legaDisconnectReason: '',
        srcPrefixIn: '',
        dstPrefixIn: '',
        diversionIn: '',
        srcNameIn: '',
        localTag: '',
      },
      success: [{ text: 'Select One', value: null }, 'true', 'false'],
    };
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
      this.form.timeStartGteq = '';
      this.form.timeStartLteq = '';
      this.form.srcPrefixRouting = '';
      this.form.dstPrefixIn = '';
      this.form.dstPrefixRouting = '';
      this.form.legaDisconnectCode = '';
      this.form.legaDisconnectReason = '';
      this.form.diversionIn = '';
      this.form.duration = '';
      this.form.srcNameIn = '';
      this.form.srcPrefixIn = '';
      this.form.localTag = '';
      this.form.success = null;
      this.$store.dispatch('setCdrFilter', {});
      this.$emit('applyFilter');
    },
    onSubmit() {
      const filter = {};
      for (const key in this.form) {
        if (this.form[key]) {
          filter[key] = this.form[key];
        }
      }
      this.$store.dispatch('setCdrFilter', filter);
      this.$emit('applyFilter');
    },
  },
};
</script>

<style>
</style>
