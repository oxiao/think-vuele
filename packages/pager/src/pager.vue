<template>
  <div>
    <div class="tc-pager">
      <!--<el-pagination :small="small" :total="pager.totalCount" :current-page="pager.pageIndex" :page-sizes="pageSizeArray" :layout="layout" :page-size="pager.pageSize" v-bind="$attrs" background @current-change="pagerChange" @size-change="sizeChange" v-on="$listeners">
      </el-pagination>-->
      <el-pagination :small="small" :current-page="pageIndex" :total="rowCount" :page-size="pageSize"
                     :layout="layout" v-bind="$attrs" background
                     @current-change="pagerChange" @size-change="sizeChange" v-on="$listeners">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TcPager',
  props: {
    // pager: { type: Object, required: false, default: null },
    small: { type: Boolean, required: false, default: false },
    layout: { type: String, required: false, default: 'total, prev, pager, next, sizes' },
    // pageSizes: { type: String, required: false, default: '10,20, 30,50,100' },
    pageSize: {type: Number, required: false, default: 30},
    pageIndex: {type: Number, required: false, default: 0},
    rowCount: {type: Number, required: false, default: 0}
  },
  data: () => ({
  }),
  computed: {
    // pageSizeArray: function() {
    //   return this.pageSizes.split(',').map(item => parseInt(item, 10))
    // },
    sequence() {
      // return (this.pager.pageIndex - 1) * this.pager.pageSize + 1
      return (this.currentPage - 1) * this.pageSize + 1
    }
  },
  methods: {
    pagerChange: function(val) {
      this.currentPage = val
      this.$emit('pagerChange', val, this.pageSize, this.total, this.sequence)
    },
    sizeChange: function(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.pagerChange(1)
      // this.$emit('pagerChange', this.currentPage, val, this.total, this.sequence)
      // this.$emit('sizeChange', this.currentPage, val, this.total, this.sequence)
    },
  }
}
</script>
