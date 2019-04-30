<template>
    <div>
        <monaco-editor
    class="editor"
    v-model="code"
    language="javascript"
  >
  </monaco-editor>
    </div>
</template>

<script>
import MonacoEditor from 'vue-monaco-cdn'

export default {
    computed: {
        code: { 
            get() { return this.$store.state.code }, 
            set(value) { 
                this.$store.commit('setCode', value);
        }}
        // ...mapState( { code: state  => state.code } )
    },
    components: { MonacoEditor }
}
</script>

<style>
.editor {
    width: 100%;
    height: 100%;
}
</style>