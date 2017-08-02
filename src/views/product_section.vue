<template lang="pug">
     transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            .inner-right-sidebar
                router-link(to="").close
                    .icon
                        include ../assets/close.svg
            .container
                iscroll-view.scroll-view(ref="Scrollbar" :options="{mouseWheel: true, scrollbars: true, probeType: 3}")
                    .products-grid
                        router-link.item(v-for="item in prod_data.items" :to="item.link" :key="item.id")
                            img(:src="item.img", :alt="item.name")
                            span {{item.name}}
                .left-info-block
                    .tag продукция
                    h1 {{ prod_data.description.name }}
                    span {{ prod_data.description.small_message }}
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return{
                color: '#D5DFDE',
                prod_data: {}
            }
        },
        methods:{
            beforeEnter(el){
            },
            beforeLeave(el){
            },
            enter(el, done){
                Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                done();
            },
            leave(el, done){
                done();
            },
        },
        created(){
        },
        mounted(){
            const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.prod_data = response.data;
                }).catch(error => {
                    console.log(error);
                });

            const iscroll = this.$refs.Scrollbar;            
            iscroll.refresh();
        }

    }
</script>


<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';


    .scroll-down{
        display: none;
    }


    .products-grid{
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        min-height: 70vh;
        .item{
            width: 33%;
            height: 250px;
            text-align: center;
            position: relative;
            &:hover{
                span{
                    opacity: 1;
                }
            }
            span{
                position: absolute;
                bottom: 0px;
                left: 50%;
                width: 70%;
                transform: translateX(-50%);
                font-family: bebas;
                font-weight: 800;
                font-size: 18px;
                opacity: 0;
                transition: all .35s;
                color: $gray;
            }
        }
    }

</style>

