<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            floats
            .container
                .left-info-block
                    h1 ищем партнеров
                    p Хотите стать нашим партером? Ознакомьтесь с памяткой для потенциального поставщика
                    a(href="") скачать pdf
                .center-text-block
                    h2 МЫ РАБОТАЕМ #[br] ТОЛЬКО #[br] #[span С ЧАСТНИКАМИ]
                    p Сеть Частная Лавочка уделяет отдельное внимание заботе о личном успехе Поставщиков  у аудитории. Мы, в отличие от других, не только  не пытаемся "застроить их под общую гребенку",  но и помогаем в персональном продвижении партнеров-производителей на территории магазинов  и в промоматериалах Частной Лавочки.
</template>

<script>
    import floats from '../components/float.vue';


    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#FAF6EB',
                _flow: ''
            }
        },
        components:{
            floats
        },
        beforeRouteLeave(to, from, next){
            const toDepth = to.path
            const fromDepth = from.path
            let current;
            let next_view;
            for (let i = 0; i < this.links.length; i++){
                if (toDepth == this.links[i].url){
                    next_view = i;
                }
                if (fromDepth == this.links[i].url){
                    current = i;
                }
            }
            this._flow = current < next_view ? 'forward' : 'back';
            next();
        },
        methods:{
            beforeEnter(el){
                if (this.flow == ''){
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                    Velocity(el, {translateY: '0%'}, {duration: 10})                    
                } else {
                    Velocity(el, {translateY: '200%'}, {duration: 10})
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }
            },
            beforeLeave(el){
                
            },
            enter(el, done){
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 450});
                    Velocity(document.querySelectorAll('.center-text-block'), {translateY: '-50%', translateX: '-50%'}, {duration: 350, delay: 600}); 
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity(el, {translateY: '0%'}, {duration: 450})
                        Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 600});
                        Velocity(document.querySelectorAll('.center-text-block'), {translateY: '-50%', translateX: '-50%'}, {duration: 350, delay: 800}); 
                        done();
                    }, 600);
                }
            },
            leave(el, done){
                document.querySelector('body').style.backgroundColor = '#FAF6EB';
                if (this._flow == 'forward'){
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 350})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
                    Velocity(el, {opacity: 0}, {duration: 350, delay: 600, complete: done})
                } else if (this._flow == 'back'){
                    Velocity(el, {translateY: '200%'}, {duration: 450, delay: 600, complete: done})
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 350})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';

    .left-info-block{
        width: 200px;
        h1{
            margin-bottom: 22px;
        }
        p{
            padding-right: 20px;
            margin-bottom: 30px;
        }
    }

    .center-text-block{
        h2{
            color: $black;
        }
        p{
            width: 50%;
            font-size: 18px;
            line-height: 180%;
        }
    }
    @media (max-width: 1367px){
        .center-text-block p{
            margin: 0px;
            width: 100%;
        }
    }
</style>
