import Vue from 'vue'
import Router from 'vue-router'

import API from '@script/api.js'
import Main from '@/Main.vue'

import Index from '@/views/Index.vue'
import Profile from '@/views/Profile.vue'

Vue.use(API);
Vue.use(Router);
Vue.config.productionTip = false;

new Vue({
    router: getRoutes(),
    render: function (handler) {
        return handler(Main);
    },
    data: function () {
        return {
            kiosk: false,
            title: 'AniLibria TV'
        };
    }
}).$mount('#app');

function getRoutes () {
    return new Router({
        routes: [
            {
                path: '/',
                alias: '/index',
                component: Index
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            }
        ]
    });
}