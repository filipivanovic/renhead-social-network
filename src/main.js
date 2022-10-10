import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import store from './store/store'
import router from './router'

Vue.config.productionTip = true

new Vue({
    render: (h) => h(App),
    router,
    store
}).$mount('#app')
