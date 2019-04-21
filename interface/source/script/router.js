import Router from 'vue-router'

import Index from 'view/Index.vue'
import Browser from 'view/Browser.vue'

export default {
    use: Router,
    data: new Router({
        mode: 'hash',
        routes: [
            {
                path: '/',
                redirect: '/index',
            },

            {
                path: '/index',
                name: 'index',
                component: Index
            },

            {
                path: '/browser',
                name: 'browser',
                component: Browser
            }
        ]
    })
};