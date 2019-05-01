<template>
  <div>
    hatch.js
    <monaco-editor class="editor" v-model="code" language="javascript"></monaco-editor>
    sample.json
    <monaco-editor class="editor" v-model="sample" language="json"></monaco-editor>
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco-cdn";

export default {
  computed: {
    code: {
      get() {
        return this.$store.state.code;
      },
      set(value) {
        this.$store.commit("setCode", value);
      },
    },
    sample: {
      get() {
        return this.$store.state.sample;
      },
      set(value) {
        this.$store.commit("setSample", value);
      }
    }
  },
  components: { MonacoEditor }
};
</script>

<style>
.editor {
  width: 100%;
  height: 50%;
}
</style>