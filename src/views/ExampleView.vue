<template>
  <div id="exampleView">
    <MdEditor :handle-change="onMdChange" :value="mdValue"></MdEditor>
    <CodeEditor :handle-change="onCodeChange" :value="codeValue"></CodeEditor>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const mdValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
};
const codeValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>
