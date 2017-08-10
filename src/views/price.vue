<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            floats
            .container
                .left-info-block.mobile-top
                    .tag цены
                    h1 вы можете ознакомиться #[br] с ценами  на товары
                    router-link(to="/about") список цен
                .center-text-block.hover-overflow
                    h2 Для #[br] натурального #[br]  #[span очень #[br] недорого]
                    table(cellspacing="0")
                        tr
                            td
                                p.name помидоры
                                span 1 кг
                            td
                                p.price 124 Р
                        tr
                            td
                                p.name картофель
                                span 1 кг
                            td
                                p.price 24 Р
                        tr
                            td
                                p.name капуста
                                span 1 кг
                            td
                                p.price 150 Р
                        tr
                            td
                                p.name огурцы
                                span 1 кг
                            td
                                p.price 50 Р
                        tr
                            td
                                p.name мед
                                span 1 л
                            td
                                p.price 1 124 Р
                        tr
                            td
                                p.name свекла
                                span 1 кг
                            td
                                p.price 200 Р
                        tr
                            td
                                p.name морковь
                                span 1 кг
                            td
                                p.price 1120 Р
                        tr
                            td
                                p.name редис
                                span 1 кг
                            td
                                p.price 84 Р

</template>

<script>

    import floats from '../components/float.vue';

    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#D5DFDE',
                _flow: ''
            }
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
        components:{
            floats
        },
        methods:{
            beforeEnter(el){
                if (this.flow == ''){
                    Velocity($(el).find('.center-text-block'), {translateY: '-400%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                    Velocity(el, {translateY: '0%'}, {duration: 10})                    
                } else {
                    Velocity(el, {translateY: '200%'}, {duration: 10})
                    Velocity($(el).find('.center-text-block'), {translateY: '-400%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }
            },
            beforeLeave(el){
                
            },
            enter(el, done){
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {display: 'none'}, {duration: 1})
                }
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 450});
                    Velocity(document.querySelectorAll('.center-text-block'), {translateY: '-50%', translateX: '-50%'}, {duration: 450, delay: 600}); 
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
                        Velocity(document.querySelectorAll('.center-text-block'), {translateY: '-50%', translateX: '-50%'}, {duration: 450, delay: 800}); 
                        done();
                    }, 600);
                }
            },
            leave(el, done){
                document.querySelector('body').style.backgroundColor = '#D5DFDE';
                if (this._flow == 'forward'){
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 350})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
                    Velocity(el, {opacity: 0}, {duration: 300, delay: 600, complete: done})
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

    .logo{
        position: absolute;
        top: 28px;
        left: 48%;
        transform: translateX(-50%);
        z-index: 2;
        text-align: center;
        svg g use {
            fill: $brown;
        }
    }
    .logo-text{
        font-family: bebas;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: 1.5px;
        color: $brown;
        text-align: center;
        display: block;
        opacity: 1;
    }

    .center-text-block{
        height: 70%;
        width: 55%;
        h2{
            color: $black;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            transition: all .45s;
        }
        &.hover-overflow{
            overflow: hidden;
            table{
                table-layout: fixed;
                width: 100%;
                margin-top: 2%;
                transition: all .45s;
                position: absolute;
                top: 50%;
                transform: translateY(200%);
                tr:first-child{
                    td{
                        padding-top: 0px;
                    }
                }
                td{
                    border-bottom: 2px solid $black;
                    padding-bottom: 12px;
                    padding-top: 32px;
                    p{
                        margin: 0px;
                    }
                    .price{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        color: $orange;
                        text-align: right;
                    }
                    .name{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        display: inline-block;
                        margin-right: 60px;
                        width: 150px;
                    }
                    span{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        color: $black;
                        opacity: 0.45;
                    }
                }
            }
            &:hover{
                h2{
                    transform: translateY(-200%);
                }
                table{
                    transform: translateY(-50%);
                }
            }
        }
    }

    @media (max-width: 1367px){
        .center-text-block.hover-overflow table td .name, .center-text-block.hover-overflow table td .price, .center-text-block.hover-overflow table td span{
            font-size: 22px;
        }
        .center-text-block.hover-overflow table td{
            border-bottom: 1px solid #0D0809;
            padding-bottom: 5px;
            padding-top: 10px;
        }
    }
    
    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 469px){

        .center-text-block{
            height: 80%;
        }

        .center-text-block.hover-overflow{
            &:hover{
                h2{
                    transform: translateY(-400%);                    
                }
                table{
                    transform: translateY(-80%);                    
                }
            }
        }
        .center-text-block.hover-overflow table td .name, .center-text-block.hover-overflow table td .price, .center-text-block.hover-overflow table td span{
            font-size: 18px;
        }
        .center-text-block.hover-overflow table td .name[data-v-637b5f72]{
            width: 45px;
        }

    }



</style>


