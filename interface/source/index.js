import Vue from 'vue'

import router from 'script/router';
import store from 'script/store';

import Main from 'app/Main.vue'

Vue.use(router.use);
Vue.use(store.use);

Vue.config.productionTip = false;

new Vue({
    router: router.data,
    store: store.data(),
    render: handler => handler(Main)
}).$mount('#app');