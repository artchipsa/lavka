<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            .inner-right-sidebar
                router-link(:to="from").close
                    .icon
                        include ../assets/close.svg
                    span назад
                .links-block
                    ul
                        li.active
                            a(href="#event") новый магазин
                        li
                            a(href="#reviews") отзывы
            .container.text-container(v-if="event_data && Object.keys(event_data).length")
                iscroll-view.scroll-view(ref="Scrollbar" @scroll="spy" :options="{mouseWheel: true, click: true, tap:true, scrollbars: true, probeType: 3, preventDefault: false}")
                    section#event
                        .small-title {{ event_data.event.date }}
                        .carousel-block
                            a.event-arrow(href="#" @click.prevent="photosPrevSlide")
                                i.fa.fa-chevron-left(aria-hidden="true")
                            a.event-arrow(href="#" @click.prevent="photosNextSlide")
                                i.fa.fa-chevron-right(aria-hidden="true")
                            .owl-carousel.event-photos
                                .item(v-for="photo in event_data.event.photos")
                                    img(:src="photo", alt="")
                        div(v-html="event_data.event.event_descr")
                    section#reviews
                        h2.middle-title {{ event_data.reviews_block.title }}
                        .owl-dots
                        .owl-carousel.event-reviews
                            .item(v-for="review in event_data.reviews_block.reviews")
                                .reviewer-info
                                    img(:src="review.img", alt="")
                                    .socials-block
                                        .name {{ review.name }}
                                        ul.socials
                                            li(v-for="social in review.socials")
                                                a(:href="social.link")
                                                    i.fa(aria-hidden="true" :class="social.icon")
                                    .rank {{ review.rank }}
                                p {{ review.review_text }}
                .left-info-block.top
                    .tag события
                    h1 {{event_data.description.name}}
                .sharing
                   social-sharing(url="http://localhost:8080/#/events/new-shop" inline-template)
                    div
                        .text поделиться
                        network(network="facebook")
                            i.fa.fa-facebook
                        network(network="vk")
                            i.fa.fa-vk
                        network(network="twitter")
                            i.fa.fa-twitter

</template>

<script>
    import axios from 'axios';
    import uiColor from '../mixins/uiColor.js';

    export default {
        data(){
            return{
                color: '#D5DFDE',
                event_data: {},
                url: '',
                owl_photos: '',
                owl_reviewers: ''
            }
        },
        props:['from'],
        mixins:[uiColor],
        methods:{
             beforeEnter(el){
                document.querySelector('body').style.backgroundColor = '#D5DFDE';
                Velocity(el, {translateY: '200%'}, {duration: 10})
                Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 10})
                Velocity($(el).find('.inner-right-sidebar'), {translateY: '-150%'}, {opacity: 0}, {duration: 10});
                setTimeout(() => {
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }, 250)
                $('.owl-carousel').trigger('destroy.owl.carousel');
            },
            beforeLeave(el){
                
            },
            enter(el, done){
                Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                setTimeout(() => {
                    Velocity(el, {translateY: '0%'}, {duration: 450})
                    Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 600});
                    Velocity($(el).find('.inner-right-sidebar'), {translateY: '0%'}, {duration: 350, delay: 600});
                    done();
                }, 800);
            },
            leave(el, done){
                Velocity(el, {translateY: '200%'}, {duration: 450, delay: 700, complete: done})
                Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 350})
                Velocity($(el).find('.inner-right-sidebar'), {translateY: '-150%'}, {duration: 350, delay: 150});
                Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
            },
            spy(iscroll){
                let top_edge = $('.scroll-view').offset().top;
                let bottom_edge = $('.scroll-view').offset().top + 155;
                $('.scroll-view section').each(function(){
                    let offset = $(this).offset().top;
                    let id = $(this).attr('id');
                    if( offset >= top_edge & offset <= bottom_edge){
                        $('.inner-right-sidebar li').removeClass('active');
                        $('a[href$='+id+']').parent().addClass('active');
                    } 
                    
                })

            },
            photosOwlInit(){
                this.owl_photos = $('.event-photos').owlCarousel({
                    items:1,
                    dots: false
                })
            },
            photosPrevSlide(){
			    this.owl_photos.trigger('prev.owl.carousel');
			},
			photosNextSlide(){
			    this.owl_photos.trigger('next.owl.carousel');
            },
            reviewsOwlInit(){
                this.owl_reviewers = $('.event-reviews').owlCarousel({
                    items:1,
                    center: true,
                    dots: true,
                    dotsContainer: '.owl-dots'
                })
            },
            spy(iscroll){
                let top_edge = $('.scroll-view').offset().top;
                let bottom_edge = $('.scroll-view').offset().top + 155;
                $('.scroll-view section').each(function(){
                    let offset = $(this).offset().top;
                    let id = $(this).attr('id');
                    if( offset >= top_edge & offset <= bottom_edge){
                        $('.inner-right-sidebar li').removeClass('active');
                        $('a[href$='+id+']').parent().addClass('active');
                    } 
                })

            },
        },
        created(){
            const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.event_data = response.data;
                    const iscroll = this.$refs.Scrollbar;            
                    iscroll.refresh();
                }).catch(error => {
                    console.log(error);
                });
            $('.owl-carousel').trigger('destroy.owl.carousel');
        },
        mounted(){
            this.url = this.$route.path;
            let iscroll
            setTimeout(() => {
                iscroll = this.$refs.Scrollbar;                
                iscroll.refresh();
            }, 550)
            this.uiColorChange();            
            setTimeout(() => {
                this.photosOwlInit();
            }, 100)

            setTimeout(() => {
                this.reviewsOwlInit();
                // this.owl_reviewers.trigger('refresh.owl.carousel');                       
            }, 350)
            


            $('.inner-right-sidebar .links-block a').click(function(e){
                e.preventDefault();
                let id = $(this).attr('href');
                let to = $(id).position().top;
                iscroll.scrollBy(0, -to, 250);
                iscroll.refresh();
            });

        },
        updated(){
            this.uiColorChange();
        }
    }
</script>

<style lang="scss">
     //vars
    @import 'src/assets/styles/settings.scss';

    .scroll-down{
        display: none;
    }

    .sharing{
        position: absolute;
        bottom: 8%;
        left: 3%;
        width: 250px;
        div{
            .text{
                font-family: bebas;
                font-weight: 800;
                font-size: 18px;
                color: $black;
                opacity: 0.23;
                display: inline-block;
                margin-right: 20px;
                vertical-align: middle;
            }
            span{
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                vertical-align: middle;
                margin-right: 10px;
                i{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    color: $white;
                }
            }
            span[data-link="#share-facebook"]{
                background-color: #3B5998;
            }
            span[data-link="#share-vk"]{
                background-color: #4C6C91;
            }
            span[data-link="#share-twitter"]{
                background-color: #55ACEE;
            }
        }
    }
    .carousel-block{
        position: relative;
        margin-bottom: 70px;
    }
    .event-arrow{
        width: 76px;
        height: 74px;
        background-color: $main;
        display: inline-block;
        position: absolute;
        bottom: 25px;
        right: 25px;
        z-index: 2;
        &:first-child{
            bottom: 25px;
            left: 25px;
        }
        i{
            position: absolute;
            top: 50%;
            left: 49%;
            transform: translate(-50%, -50%);
            font-size: 18px;
            color: $black;
        }
    }

     .text-container{
        .scroll-view{
            p{
                width: 80%;
            }
        }
    }

    #reviews{
        position: relative;
        .middle-title{
            font-size: 48px;
        }
        .item{
            .reviewer-info{
                display: flex;
                flex-flow: row wrap;
                align-items: top;
                margin-bottom: 70px;
                img{
                    width: 15%;
                    height: 15%;
                    margin-right: 8%;
                }
                .socials-block{
                    width: 22%;
                    margin-right: 5%;
                    .name{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        margin-bottom: 30px;
                    }
                    .socials{
                        list-style: none;
                        padding: 0px;
                        li{
                            display: inline-block;
                            margin-right: 12px;
                            &:last-child{
                                margin-right: 0px;
                            }
                            a{
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                color: $white;
                                background-color: #BAC2C1;
                                border-radius: 50%;
                                position: relative;
                                i{
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%,-50%);
                                }
                            }
                        }
                    }
                }
                .rank{
                    font-size: 18px;
                    color: #B2B6B6;
                }
            }
        }
    }

    @media (max-width: 1367px){

        .sharing div .text{
            margin-right: 12px;
        }
        #reviews .item .reviewer-info{
            margin-bottom: 50px;
        }
    }

    @media (max-width: 1025px){

        .sharing div .text{
            display: block;
            margin-bottom: 10px;
        }
        .text-container .scroll-view p{
            width: 90%;
            font-size: 16px;
        }
        #reviews .item .reviewer-info img{
            width: 25%;
            height: 25%;
            margin-right: 5%;
        }
        #reviews .item .reviewer-info .socials-block{
            width: 30%;
        }

    }

    @media (max-width: 769px){
        #reviews .item .reviewer-info .socials-block{
            width: 35%;
        }
    }


    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 469px){

        .left-info-block.top{
            top: 11%;
            width: 50%;
        }
        .sharing{
            text-align: right;
            bottom: auto;
            right: 3%;
            left: auto;
            top: 11%;
            width: 50%;
        }
        .event-arrow{
            width: 50px;
            height: 50px;
        }
        #reviews .item .reviewer-info .rank{
            display: none;
        }
        #reviews .item .reviewer-info img{
            width: 40%;
        }
        #reviews .item .reviewer-info .socials-block{
            width: 45%;
        }
        #reviews .item .reviewer-info{
            margin-bottom: 30px;
        }
    }

</style>
