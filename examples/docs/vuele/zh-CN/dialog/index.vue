<template>
  <div>
    <div>
      <tc-button @click="openDialog">基础用法</tc-button>
      <tc-button @click="openDialog1">引用组件skeleton</tc-button>
      <tc-button @click="openDialog4">引用组件loading</tc-button>
      <tc-button @click="openDialog2">组件内固定底部{{showDialog2}}</tc-button>
      <tc-button @click="openDialog3">宽高百分比</tc-button>
    </div>
    <div>
      <tc-dialog :visible.sync="showDialog" title="基础用法" width="400px" height="300px">
        test
      </tc-dialog>
      <tc-dialog :visible.sync="showDialog1" loadingType="skeleton" loading title="引用组件skeleton" width="400px" height="300px">
        <test-index :model="model"/>
      </tc-dialog>
      <tc-dialog :visible.sync="showDialog2" title="组件内固定底部" width="400px" height="300px">
        <fixed-bottom :model="model" />
      </tc-dialog>
       <tc-dialog :visible.sync="showDialog3" title="引用组件百分比" width="40%" height="40%">
        <test-index />
      </tc-dialog>
      <tc-dialog :visible.sync="showDialog4" loadingType="cssLoading" loading title="引用组件cssLoading" width="400px" height="300px">
        <test-index :model="model"/>
      </tc-dialog>
    </div>
  </div>
</template>

<script>
import testIndex from './testIndex'
import fixedBottom from './fixed-bottom'
export default {
  components: { testIndex, fixedBottom },
  data() {
    return {
      showDialog: false,
      showDialog1: false,
      showDialog2: false,
      showDialog3: false,
      showDialog4: false,
      model: {
        name: '写bug,调bug',
        disabled: false
      }
    }
  },
  methods: {
    openDialog() {
      this.showDialog = true
    },
    openDialog1() {
      this.showDialog1 = true
      this.model.disabled = true
    },
    openDialog2() {
      this.showDialog2 = true
      this.model.disabled = true
    },
    openDialog3() {
      this.showDialog3 = true
    },
    openDialog4() {
      this.showDialog4 = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>