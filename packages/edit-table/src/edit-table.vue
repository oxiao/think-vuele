<template>
  <div>
    <tc-table
      :data="formatData"
      :columns="columns"
      :border="border"
      :stripe="stripe"
      :selection="selection"
      :sequence="sequence"
      :fit="fit"
      v-bind="$attrs"
      class="tc-edit-table"
      v-on="$listeners">
      <template #column="{ value, columnName, rowData, column }">
        <span v-if="!toObject(column).editable">
            <template v-if="column.formatter">
              {{column.formatter(rowData, column, value)}}
            </template>
            <template v-else>
              {{value}}
            </template>
        </span>
        <slot name="editable" v-else :value="value" :columnName="columnName" :rowData="rowData" :column="column" >
          <div :class="{'editable-control' : isSignleMode, 'editable-container': !isSignleMode}">
            <tc-date-picker v-if="toObject(column).type === 'date'" v-model="rowData[columnName]" type="date" size="mini"></tc-date-picker>
            <tc-select v-else-if="toObject(column).type === 'select'" :providers="toObject(column).providers" v-model="rowData[columnName]" size="mini"></tc-select>
            <tc-checkbox v-else-if="toObject(column).type === 'checkbox'" v-model="rowData[columnName]" size="mini"></tc-checkbox>
            <tc-input v-else v-model="rowData[columnName]" type="text" size="mini"></tc-input>
          </div>
          <span :class="{'editable-span' : isSignleMode, 'editable-span-hide': !isSignleMode}">{{ value }}</span>
        </slot>
      </template>
      <slot />
    </tc-table>
  </div>
</template>

<script>
import formatData from './eval'
import table from '../../table/src/table'
export default {
  name: 'TcEditTable',
  mixins: [table],
  props: {
    editmode: { type: String, required: false, default: 'single', validator: function(value) {
      return ['single', 'multi'].indexOf(value) !== -1
    }}
  },
  data: () => ({
  }),
  computed: {
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || formatData
      return func(tmp)
    },
    isSignleMode: function() {
      return this.editmode === 'single'
    }
  },
  methods: {
    toObject(observer) {
      return Object.assign({}, observer)
    }
  }
}
</script>
