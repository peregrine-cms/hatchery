<template>
  <div class="wrapper">
    <div id="header"><button v-on:click="changeView">{{view}}</button>&nbsp;<b>hatch | a tool to hatch html code into a scripting language</b></div>
    <div id="workspace" v-bind:class="view">
      <HtmlInput id="htmlinput" v-bind:fragment="'fragments/sample/template.html'">col1</HtmlInput>
      <CodeView id="code"></CodeView>
      <div id="htmloutput">
        <iframe v-bind:src="encoded"></iframe>
        <render-output id="rendered" ref="rendered" style="display: none;"></render-output>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import convert from '../convert.js'
import HtmlInput from './HtmlInput.vue'
import CodeView from './CodeView.vue'

const html = window.template;
const tmpl = convert(html);

Vue.component('render-output', {
  // eslint-disable-next-line
  template: tmpl,
  data() {
    // eslint-disable-next-line
    try {
    const ret = JSON.parse(window.sample);
    return ret;
    } catch(err) {
      return {};
    }
  }
});

export default {
  name: 'Shell',
  data () {
    return { view: 'split' , encoded: ""}
  },
  computed: {
    code() { return this.$store.state.code },
    sample() { return this.$store.state.sample }
  },
  components: {
    HtmlInput,
    CodeView
  },
  watch: {
    code(value) {
      // eslint-disable-next-line
      this.refresh();
    },
    sample(value) {
      // eslint-disable-next-line
      this.refresh();
    }
  },
  methods: {
    changeView() {
      if(this.view === 'split') {
        this.view = 'input';
      } else {
        this.view = 'split';
      }
    },
    refresh() {
      try {
        const html = document.getElementById('htmlinputframe').contentWindow.document.body.innerHTML;
        const template = convert(html);
        Vue.component('render-output', {
          template: template,
          data() {
            // eslint-disable-next-line
            return JSON.parse(sample);
          }
        });
      } catch( error ) {
        // failed to compile
      }
      this.$forceUpdate();
      const that = this;
      this.$nextTick( function() {
        if(document.getElementById('rendered')) {
          const html = document.getElementById('rendered').innerHTML;
          that.encoded = "data:text/html;base64,"+btoa(html);
        }
      })
    }
  }
}
</script>

<style>
.wrapper,
html,
body,
#app {
  height: 100%;
  margin: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
#header {
    background: silver;
    padding: 8px;
}

#workspace.split {
  flex: 2;
  display: flex;
}
.split #htmlinput {
  flex: 0 0 30%;
}
.split #code {
  flex: 1 1;
}
.split #htmloutput {
  flex: 0 0 30%;
}

#workspace.input {
  flex: 2;
  display: flex;
}
.input #htmlinput {
  flex: 0 0 70%;
}
.input #code {
  flex: 1 1;
}
.input #htmloutput {
  display: none;
}

</style>