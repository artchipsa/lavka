import Vue from 'vue';
import App from './components/app.vue';
import VueRouter from 'vue-router';
import main from './views/main.vue';
import products from './views/products.vue';
import owners from './views/owners.vue';
import prices from './views/price.vue';
import principes from './views/principes.vue';
import looking from './views/looking-for.vue';
import events from './views/events.vue';
import shops from './views/shops.vue';






Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            component: main
        },
        {
            path: '/products',
            component: products
        },
        {
            path: '/owners',
            component: owners
        },
        {
            path: '/prices',
            component: prices
        },
        {
            path: '/principes',
            component: principes
        },
        {
            path: '/looking-for',
            component: looking
        },
        {
            path: '/events',
            component: events
        },
        {
            path: '/shops',
            component: shops
        }
    ]
});

const app = new Vue({
    el: '#app',
    router,
    components: {
        App
    }
})