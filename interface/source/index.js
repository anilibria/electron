import Vue from 'vue'
import Router from 'vue-router'

import Main from 'app/Main.vue'
import Index from 'view/Index.vue'
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