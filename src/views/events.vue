<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view
            .owl-dots
            .owl-arrows
                a(href="#" @click.prevent="prevSlide")
                    i.fa.fa-chevron-left(aria-hidden="true")
                a(href="#" @click.prevent="nextSlide")
                    i.fa.fa-chevron-right(aria-hidden="true")
            .owl-carousel.black-carousel
                .item(:style="{ backgroundImage: event.img}" v-for="event in events")
                    .container
                        .left-info-block
                            .tag события
                            h1 {{ event.name }}
                            router-link(:to="event.link") подробнее
                        .count 23.06.2017
                    .overlay



</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                owl: '',
                events:[
                    {
                        name: 'Открытие магазина в сентябре',
                        link: '/events/new-shop',
                        img: 'url(public/ev_img1.jpg)'
                    },
                    {
                        name: 'фестиваль «зеленый»',
                        link: '/events/zeleniy',
                        img: 'url(public/e1.jpg)'
                    }
                ],
                _this: '',
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
        methods:{
            owlInit(){
                this.owl = $('.black-carousel').owlCarousel({
                    items:1,
                    loop: true,
                    center: true,
                    dots: true,
                    dotsContainer: '.owl-dots'
                })
            },
            prevSlide(){
			    this.owl.trigger('prev.owl.carousel');
			},
			nextSlide(){
			    this.owl.trigger('next.owl.carousel');
            },
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
                $('.owl-carousel').trigger('destroy.owl.carousel');
            },
            beforeLeave(el){
                el.style.zIndex = 1;
            },
            enter(el, done){
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {display: 'none'}, {duration: 1})
                }
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#ffffff'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 450});
                    Velocity(document.querySelectorAll('.center-text-block'), {translateY: '0%', translateX: '-50%'}, {duration: 350, delay: 600}); 
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#ffffff'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity(el, {translateY: '0%'}, {duration: 450})
                        Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 600});
                        Velocity(document.querySelectorAll('.center-text-block'), {translateY: '0%', translateX: '-50%'}, {duration: 350, delay: 800}); 
                        done();
                    }, 800);
                }

            },
            leave(el, done){
                clearInterval(this.interval)
                if (this._flow == 'forward'){
                    Velocity(el, {translateY: '-200%'}, {duration: 450, delay: 600, complete: done})
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 350})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
                    document.querySelector('body').style.backgroundColor = '#f2f2f2';
                    
                } else if (this._flow == 'back'){
                    Velocity(el, {translateY: '200%'}, {duration: 450, delay: 600, complete: done})
                    Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 350})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
                    document.querySelector('body').style.backgroundColor = '#FAF6EB';

                }
            }
        },
        mounted(){
            // $('.owl-carousel').trigger('destroy.owl.carousel');
            this.owlInit();
            this.owl.on('translate.owl.carousel', (event) => {
                let index = event.page.index + 1;
                if (index < 10){
                    document.querySelector('.count').innerText = '0'+index;
                } else {
                    document.querySelector('.count').innerText = index;
                }
            })
        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';

    // .left-info-block{
    //     z-index: 1;
    //     h1{
    //         color: $white;
    //     }
    //     a{
    //         color: $white;
    //     }
    // }

    .owl-dots{
        right: 13%;
        z-index: 1;
    }
    .owl-arrows{
        right: 13%;
        z-index: 1;
    }

    .count{
        position: absolute;
        top: 23.5%;
        left: 3%;
        color: $white;
        font-family: bebas;
        font-weight: 800;
        font-size: 20px;
        line-height: 100%;
        z-index: 1;
    }

    .black-carousel{
        width: 100%;
        height: 100%;
        z-index: 0;
        .item{
            position: relative;
            height: 100%;
            width: 100%;
            .overlay{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                z-index: 0;
                background-color: transparentize($black, .4);
            }
        }
    }
    
    @media (max-width: 769px){
        .owl-dots{
            right: 3%;
            z-index: 1;
            .owl-dot{
                background-color: $white;
            }
        }
        .owl-arrows{
            right: 3%;
            z-index: 1;
            a{
                color: $white;
            }
        }
    }

</style>


