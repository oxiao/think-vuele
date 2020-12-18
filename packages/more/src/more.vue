<template>
  <div class="tc-more">
    <el-collapse v-bind="$attrs" v-on="$listeners">
      <more-item ref="moreItem" :isActive="expand">
        <template slot="title">
          <el-row style="width:100%">
            <el-col :span="12">
              <slot name="title">{{title}}</slot>
            </el-col>
            <el-col :span="12" style="text-align:right;">
              <slot name="tool"></slot>
              <el-link type="primary" :underline="false" icon="el-icon-d-arrow-right" :style="expand ? 'transform:rotate(90deg)' : ''" @click="handItemClick"></el-link>
            </el-col>
          </el-row>
        </template>
        <slot></slot>
      </more-item>
    </el-collapse>
  </div>
</template>

<script>
import moreItem from './more-item'
export default {
  name: 'TcMore',
  componentName: 'TcMore',
  components: {moreItem},
  data() {
    return {
    }
  },
  props: {
    expand: {type: Boolean, request: false, default: true},
    title: String
  },
  computed: {
    iconArrow: function() {
      return this.expand ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
    }
  },
  methods: {
    handItemClick: function() {
      // this.$refs.moreItem.handleHeaderClick()
      this.expand = !this.expand
    }
  }
}
</script>
<style lang="scss">
.tc-more{
  .el-collapse-item__header{
    cursor: default;
  }
  .el-collapse-item__header.is-active {
    border-bottom: 1px solid #EBEEF5 !important;
  }
  .cursor-pointer {
    cursor: pointer;
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
}
</style>
