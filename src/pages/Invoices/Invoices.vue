<template>
  <DataTableAnt
    :fields="tableFields"
    :items="formattedInvoices"
    :rows="rows"
    :get-data="getInvoices"
    expandable
  />
</template>

<script>
import { get, flow } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

import { INVOICES } from '@/constants';
import utils from '@/utils';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';

import { TABLE_HEADERS_ANT } from './constants';
import locale from './locale';

export default {
  name: 'Invoices',
  components: {
    DataTableAnt,
  },
  computed: {
    ...mapGetters(['invoicesFilter', 'invoices']),
    formattedInvoices() {
      return flow(utils.formatInvoices)(this.invoices.items);
    },
    rows() {
      return get(this.invoices, ['meta', 'total-count'], 0);
    },
    tableFields() {
      return TABLE_HEADERS_ANT.map((header) => (
        {
          ...header,
          title: locale.messages[this.$i18n.locale].tableMessage[header.key],
          customRender: header.customRender && header.customRender.bind(this),
        }
      ));
    },
  },
  created() {
    this[INVOICES.ACTIONS.GET_INVOICES]();
  },
  methods: {
    ...mapActions([INVOICES.ACTIONS.GET_INVOICES, INVOICES.ACTIONS.SET_INVOICES_FILTER]),
  },
};
</script>
