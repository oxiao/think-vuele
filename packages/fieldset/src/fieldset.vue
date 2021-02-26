<template>
  <fieldset v-bind="$attrs" class="tc-fieldset">
    <legend class="fieldset-legend">
      <slot name="title" :title="title">{{ title }}</slot>
    </legend>
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  name: 'TcFieldset',
  props: {
    title: { type: String, required: false, default: '' }
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  }
}
</script>
