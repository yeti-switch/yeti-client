<template>
  <a-list
    bordered
    :data-source="dataSource"
    item-layout="vertical"
  >
    <a-list-item
      slot="renderItem"
      slot-scope="item"
    >
      <a-row type="flex">
        <a-col :span="4">
          {{ item.key }}
        </a-col>
        <a-col>
          {{ item.value }}
        </a-col>
      </a-row>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: 'VericalListAnt',
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" >
  .ant-list {
    background-color: #ffffff;
  }
  .ant-col {
    text-align: left;
  }
</style>
