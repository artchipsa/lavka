import Vue from 'vue';
import App from './components/app.vue';
import VueRouter from 'vue-router';
import IScrollView from 'vue-iscroll-view';
import IScroll from 'iscroll/build/iscroll-probe.js';
import main from './views/main.vue';
import products from './views/products.vue';
import owners from './views/owners.vue';
import prices from './views/price.vue';
import principes from './views/principes.vue';
import looking from './views/looking-for.vue';
import events from './views/events.vue';
import shops from './views/shops.vue';
import about from './views/about.vue';
import product_section from './views/product_section.vue'
import product from './views/product.vue'


Vue.use(VueRouter);
Vue.use(IScrollView, IScroll)


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
            path: '/products/:id',
            component: product_section
        },
        {
            path: '/products/:id/:id',
            component: product
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
        },
        {
            path: '/about',
            component: about
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