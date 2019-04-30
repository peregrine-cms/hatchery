<template>
  <div style="height: 100vh;">
    <select v-bind:value="path" @input="setPath">
      <option value="" disabled>none</option>
      <option v-for="selector in selectors" v-bind:key="selector.name" v-bind:value="selector.path">{{selector.name}} ({{selector.path}})</option>
    </select>
    <div id="overlay" v-on:click="clickOnOverlay"><div v-bind:style="style">{{path}}</div></div>
    <iframe id="htmlinputframe" v-bind:src="fragment" ref="display"></iframe>
  </div>
</template>

<script>

function pathForElement(el) {
  var stack = [];
  while ( el.parentNode != null ) {
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( el.hasAttribute('id') && el.id != '' ) {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
    }
    return stack.slice(2).join(" > ")
} 

function findElementBySelector(doc, value) {
  const els = doc.body.getElementsByTagName('*');
  for(let i = 0; i < els.length; i++) {
    if(pathForElement(els[i]) === value) {
      return els[i];
    }
  }
  return null;
}

export default {
  name: 'HtmlInput',
  props: {
    fragment: String
  },
  data() {
    return {
      show: false,
      selected: {}
    }
  },
  computed: {
    selectors() { return this.$store.state.selectors },
    path() { return this.$store.state.path },
    style() {
      if(this.show) {
        const style = `text-align: right; position: absolute; top: ${this.selected.top}px; left: ${this.selected.left}px; width: ${this.selected.width}px; height: ${this.selected.height}px; border: 2px solid red`;
        return style;
      } else {
        return 'display: none;'
      }
    }
  },
  watch: {
    path(value) {
      const display = this.$refs.display;
      if(display) {
        const iDoc = display.contentWindow.document;
        try {
          const el = findElementBySelector(iDoc, value);
          if(el) {
            const rect = el.getBoundingClientRect();
            this.selected.top = rect.top; this.selected.left = rect.left;
            this.selected.width = rect.width; this.selected.height = rect.height;
            this.show = false;
            const that = this;
            this.$nextTick( function() {
              that.show = true;
            })
          } else {
            this.show = false;
          }
        } catch(error) {
          this.show = false;
        }
      }
    }
  },
  methods: {
    clickOnOverlay(event) {
      const display = this.$refs.display;
      const clientRect = display.getBoundingClientRect();
      const x = event.clientX - clientRect.left;
      const y = event.clientY - clientRect.top;
      const iframeElement = display.contentWindow.document.elementFromPoint(x, y);
      // const iframeElementRect = iframeElement.getBoundingClientRect();

      const path = pathForElement(iframeElement);
      this.show = path === '' ? false : this.style;
      this.$store.commit('setPath', path)
    },
    setPath(e) {
      this.$store.commit('setPath', e.target.value);
    }
  }
}
</script>

<style>
.split #overlay {
  position: absolute;
  width: 30%;
}

.input #overlay {
  position: absolute;
  width: 70%;
}

#overlay {
  height: 100%;
}

iframe {display: block; width: 100%; height: 100%; }
</style>