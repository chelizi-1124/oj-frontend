<template>
  <Editor :plugins="plugins" :value="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const plugins = [gfm(), highlight()];

//交给父组件
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style lang="scss">
.bytemd-toolbar-icon:last-child svg {
  display: none !important;
}
</style>
