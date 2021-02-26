<template>
  <div>
    <tc-table ref="eltable"
    :data="formatData"
    :columns="formatColumns"
    :row-style="showRow"
    :sequence="sequence"
    v-bind="$attrs"
    :stripe="stripe"
    :border="border"
    :fit="fit"
    :selection="selection"
    :selectionType="selectionType"
    class="tc-tree-table"
    v-on="$listeners" >
       <template v-for="col in formatColumns" #[col.name]="{ value, columnName, rowData, column }" >
        <slot :name="columnName" :value="value" :columnName="columnName" :property="columnName" :rowData="rowData" :column="column">
          {{col.formatter ? col.formatter(rowData, col, value) : value}}
        </slot>
       </template>
      <template #empty>
        <slot name="empty">{{ emptyText}}</slot>
      </template>
       <slot />
    </tc-table>
  </div>
</template>

<script>

import treeToArray from './eval'
import table from '../../table/src/table'
export default {
  name: 'TcTreeTable',
  mixins: [table],
  props: {
    hier: { type: Boolean, required: false, default: false },
    evalFunc: { type: Function, required: false, default: null },
    evalArgs: { type: Array, default: () => [] },
    expandAll: { type: Boolean, default: false },
    sequence: { type: Boolean, required: false, default: false },
    selectionType: { type: String, required: false, default: 'single' }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? [tmp, this.expandAll].concat(this.evalArgs) : [tmp, this.expandAll]
      const result = func.apply(null, args)
      return result
    },
    formatColumns: function() {
      if (this.hier) {
        this.columns.push({text: '层级', name: 'hier', width: '100', align: 'left'})
      }
      return this.columns
    }
  },
  created() {
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    toggleRowSelection(row, selected) {
      this.$refs.eltable.toggleRowSelection(row, selected)
    },
    setCurrentRow(currentRow) {
      this.$refs.eltable.setCurrentRow(currentRow)
    },
    getCurrentRow() {
      return this.$refs.eltable.getCurrentRow()
    },
    clearSelection() {
      this.$refs.eltable.clearSelection()
    },
    toObject(observer) {
      return Object.assign({}, observer)
    },
    openAll(val) {
      // treeToArray(this.data, val)
      let me = this.$refs.eltable
      let exp = function(ary) {
        for (let n of ary) {
          me.toggleRowExpansion(n, val)
          if (n.children && n.children.length > 0) {
            exp(n.children)
          }
        }
      }
      exp(this.data)
    }
  }
}
</script>
