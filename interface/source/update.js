import Vue from 'vue'

import Update from 'app/Update.vue'

Vue.config.productionTip = false;
new Vue({
    render: function (handler) {
        return handler(Update);
    },

    data: function () {
        return {
            status: 0
        };
    }
}).$mount('#app');