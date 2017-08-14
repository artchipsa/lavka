<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false")
        .view(:style="{backgroundColor: color}")
            img.center-plate(src="../assets/woodplate.png", alt="")
            img.float(src="../assets/m7.png", alt="")
            img.float(src="../assets/m8.png", alt="")
            img.float(src="../assets/m1.png", alt="")
            img.float(src="../assets/m2.png", alt="")
            img.float(src="../assets/m3.png", alt="")
            img.float(src="../assets/m4.png", alt="")
            img.float(src="../assets/m5.png", alt="")
            img.float(src="../assets/m6.png", alt="")
            img.float(src="../assets/m7.png", alt="")
            img.float(src="../assets/m6.png", alt="")
            img.float(src="../assets/m4.png", alt="")
            img.float(src="../assets/m8.png", alt="")
            .container
                a(href="#").small-message
                    .tag Ближайшее событие
                    span Открытие магазина в сентябре
                .left-info-block
                    .tag Кто мы
                    h1 супермакет натуральных продуктов
                    router-link(to="/about") О компании
</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#FAF6EB',
                interval: '',
                _flow: '',
            }
        },
        beforeRouteLeave(to, from, next){
            console.log(1);
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
            eventShow(){
                Velocity(
                    document.querySelector('.small-message'), 
                    {
                        opacity: 1
                    }, 
                    {
                        duration: 350,
                        delay: 1500,
                        complete: () => {
                            setTimeout(() => { this.eventHide() }, 15500)
                        }
                    }
                )
            },
            eventHide(){
                Velocity(
                    document.querySelector('.small-message'),
                    {
                        opacity: 0
                    },
                    {
                        display: 'none'
                    },
                    {
                        duration: 350
                    }
                )
            },
            setPosProducts(){
                let elems = document.querySelectorAll('.float');
                for (let i = 0; i < elems.length; i++) {
                    elems[i].style.left = Math.random() * (window.innerWidth + 50) - 50 + 'px';
                    elems[i].style.top = Math.random() * (window.innerHeight + 50) - 50 + 'px';
                }
            },
            floatProducts(){
                let elems = document.querySelectorAll('.float');
                for (let i = 0; i < elems.length; i++) {
                    let left = parseInt(elems[i].style.left);
                    let top = parseInt(elems[i].style.top);
                    let left_direction = Math.random() < 0.5 ? -1 : 1;
                    let top_direction = Math.random() < 0.5 ? -1 : 1;
                    let left_step = Math.random() * (50 - 25) + 25;
                    let top_step = Math.random() * (50 - 25) + 25;
                    let duration = left_step * top_step;
                    Velocity(elems[i],
                        {
                            translateZ: 0,
                            top: top + (top_step * top_direction),
                            left: left + (left_step * left_direction),
                            // rotate: (left_direction * 22.5) + 'deg'
                        },
                        { 
                            duration: 2500,
                            easing: 'linear'
                        }
                    )
                }
            },
            beforeEnter(){
                clearInterval(this.interval);
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 1}, {display: 'block'}, {duration: 10})
                }                
            },
            beforeLeave(el){
                el.style.zIndex = 1;
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo svg'), {width: 120, height: 68}, {duration: 350})
                    Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10});
                }                
            },
            enter(el, done){
                Velocity(document.querySelector('.logo'), {top: '50%', translateY: '-50%', translateX: '-50%'}, {duration: 350})
                if ($(window).width() > 500){
                    Velocity(document.querySelector('.logo svg'), {width: 304, height: 128}, {duration: 350})
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 120, height: 68, opacity: 1}, {duration: 350})
                    Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 350})
                }
                Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#FAF6EB'}, {duration: 350})
                Velocity(document.querySelector('.logo-text'), {opacity: 0}, {display: 'none'},{duration: 350})
                setTimeout(() => {
                    done();
                }, 600)
            },
            leave(el, done){
                clearInterval(this.interval);
                document.querySelector('body').style.backgroundColor = '#FAF6EB';
                let elems = document.querySelectorAll('.float');
                if ($(window).width() > 500){
                    Velocity(document.querySelector('.logo'), {top: 28, translateY: '0%', translateX: '-50%'}, {duration: 350})
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 350})
                } else {
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {duration: 350})
                }                
                Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                Velocity(document.querySelector('.logo-text'), {opacity: 1}, {display: 'block'},{duration: 350})
                var left;
                if ($(window).width() < 1367 && $(window).width() > 1024){
                        left = 135;                        
                    } else if($(window).width() < 1025) { 
                        left = 82;                                                    
                    } else {
                        left = 200;
                    }
                var sum_duration = 0;
                for (let i = 0; i < elems.length; i++) {
                    var width = elems[i].offsetWidth;
                    Velocity(elems[i], 'stop');
                    Velocity(elems[i],
                        {
                            top: '50%',
                            translateY: '-50%',
                            left: left,
                            zIndex: 2
                        },
                        {
                            duration: 550,
                            // easing: 'easeOutElastic'
                            // complete: () => {
                            //     done();
                            // }
                        }
                    )
                    sum_duration += 150;
                    // console.log(sum_duration);

                    if ($(window).width() < 1367 && $(window).width() > 1024){
                        left = left + width + 135;                        
                    } else if($(window).width() < 1025) { 
                        left = left + width + 82;                                                    
                    } else {
                        left = left + width + 200;
                    }
                }
                setTimeout(() => {
                    done();
                }, 550)
                // Velocity(el, {opacity: 0}, {delay: 1000, duration: 110, complete: done})
            }
        },
        mounted(){
            this.eventShow();
            this.setPosProducts();
            if ($(window).width() > 600){
                this.floatProducts();
                this.interval = setInterval(this.floatProducts, 2500);
            }

        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';

     .center-plate{
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
    .logo{
        position: absolute;
        top: 51%;
        left: 48%;
        transform: translate(-50%, -50%);
        z-index: 2;
        text-align: center;
        svg g use {
            fill: #FAF6EB;
        }
    }
    .logo-text{
        font-family: bebas;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: 1.5px;
        color: $brown;
        text-align: center;
        display: none;
        opacity: 0;
    }
    .small-message{
        position: absolute;
        bottom: 8%;
        right: 3%;
        padding: 22px 40px;
        border: 1px dashed $gray;
        border-radius: 5px;
        text-decoration: none;
        z-index: 2;
        opacity: 0;
        .tag{
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $gray;
            margin-bottom: 50px;
        }
        span{
            display: inline-block;
            font-family: bebas;
            font-weight: 800;
            font-size: 36px;
            width: 65%;
            color: $black;
        }
    }
    .float{
        position: absolute;
        z-index: 1;
        width: 130px;
    }

    @media (max-width: 1367px){
        .float{
            width: 100px;
        }
    }

    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 469px){
        .float{
            display: none;
        }
        .logo{
            display: block;
        }
        .logo svg{
            width: 120px;
            height: 60px;
        }
    }
    @media (max-width: 469px){
        .left-info-block{
            bottom: 4%;
            top: auto;
        }
    }
</style>



