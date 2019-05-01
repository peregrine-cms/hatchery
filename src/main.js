import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectors: [
      { name: 'title', path: 'h1' },
      { name: 'subtitle', path: 'h2' },
      { name: 'intro', path: 'p:eq(0)' },
      { name: 'text', path: 'p:eq(1)' }
    ],
    name: 'hello',
    path: '',
    // eslint-disable-next-line    
    code: code,
    // eslint-disable-next-line
    template: template,
    // eslint-disable-next-line
    sample: window.sample
  },
  mutations: {
    setPath( state, value) {
      state.path = value;
    },
    setCode( state, value) {
      state.code = value;
      window.code = value;
    },
    setSample( state, value) {
      state.sample = value;
      window.sample = value;
    }
  } 
});

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

