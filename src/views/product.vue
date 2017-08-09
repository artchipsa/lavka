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
                            a(href="#deals") подход
                        li
                            a(href="#owners") частники
            .background(style="background-image: url(public/vege_prod_1.jpg)")
                .overlay(v-if="over_show")
            .container(v-if="prod_data && Object.keys(prod_data).length")
                iscroll-view.scroll-view(ref="Scrollbar" @scroll="spy" :options="{mouseWheel: true, scrollbars: true, probeType: 3}")
                    section#deals
                        .small-title {{ prod_data.deals.tag }}
                        div(v-html="prod_data.deals.title")
                        p {{ prod_data.deals.description }}
                    section#owners(data-change="true")
                        .small-title {{ prod_data.owners.tag }}
                        div(v-html="prod_data.owners.title")
                        .people-block.invert
                            .item(v-for="owner in prod_data.owners.owners_list")
                                img(:src="owner.img", alt="")
                                .content
                                    .name {{ owner.name }}
                                    .shop {{ owner.shop }}

                .left-info-block
                    .tag {{prod_data.description.tag}}
                    h1 {{ prod_data.description.name }}
</template>

<script>
    import axios from 'axios';
    import uiColor from '../mixins/uiColor.js';


    export default {
        data(){
           return{
                color: '#D5DFDE',
                prod_data: {},
                over_show: true
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
                var self = this;
                let top_edge = $('.scroll-view').offset().top;
                let bottom_edge = $('.scroll-view').offset().top + 155;
                $('.scroll-view section').each(function(){
                    let offset = $(this).offset().top;
                    let id = $(this).attr('id');
                    if( offset >= top_edge & offset <= bottom_edge){
                        if ($(this).data('change')){
                            Velocity($('.background'), 'stop');
                            Velocity($('.background'), {opacity: 0}, {duration: 350}, {displa: 'none'})
                            self.over_show = false;
                            self.uiColorChange();
                        } else {
                            Velocity($('.background'), 'stop');                            
                            Velocity($('.background'), {opacity: 1}, {duration: 350}, {displa: 'block'})
                            self.over_show = true;
                            self.uiColorChange();                   
                        }
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
                    this.prod_data = response.data;
                    const iscroll = this.$refs.Scrollbar;            
                    iscroll.refresh();
                }).catch(error => {
                    console.log(error);
                });
        },
        mounted(){
            let iscroll
            setTimeout(() => {
                iscroll = this.$refs.Scrollbar;                
                iscroll.refresh();
            }, 550)
            this.uiColorChange();
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

    .scroll-down{
        display: none;
    }

    .background{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 469px){
        .left-info-block{
            bottom: auto;
            top: 12%;
            width: 90%;
        }
    }

</style>
