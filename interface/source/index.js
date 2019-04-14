import Vue from 'vue'
import Router from 'vue-router'

import Main from 'app/Main.vue'
import Index from 'view/Index.vue'
import Browser from 'view/Browser.vue'
import Profile from 'view/Profile.vue'

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
        mode: 'history',
        routes: [
            {
                path: '/index',
                component: Index
            },
            {
                path: '/browser',
                name: 'browser',
                component: Browser
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            }
        ]
    });
}