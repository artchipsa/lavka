<template lang="pug">
    .modal-view
        .content
            ul.main-nav
                li(v-for="link in links")
                    router-link.big-link(:to="link.url") {{ link.name }}
                    ul.second-nav
                        li(v-for="nav in link.second_nav")
                            router-link(:to="nav.link") {{ nav.name }}
</template>

<script>
    export default {
        props: ['show_menu'],
        data(){
            return{
                links:[
                    {
                        name: 'Главная',
                        url: '/'
                    },
                    {
                        name: 'О компании',
                        url: '/about'
                    },
                    {
                        name: 'Продукция',
                        url: '/products',
                        second_nav:[
                            {
                                name: 'проды и растения',
                                link: '/products/veges'
                            },
                            {
                                name: 'Рыба',
                                link: '/products/fishs'
                            },
                            {
                                name: 'Мясо, шашлыки',
                                link: '/products/meats'
                            },
                            {
                                name: 'Салаты. Готовые блюда',
                                link: '/products/salads'
                            },
                            {
                                name: 'Запасы и заготовки',
                                link: '/products/jams'
                            },
                            {
                                name: 'Хлеб, выпечка, кондитерка',
                                link: '/products/breads'
                            },
                            {
                                name: 'Колбасы, деликатесы',
                                link: '/products/sausages'
                            },
                            {
                                name: 'Молочная продукция',
                                link: '/products/milks'
                            }
                        ]
                    },
                    {
                        name: 'частники',
                        url: '/owners'
                    },
                    {
                        name: 'цены',
                        url: '/prices'
                    },
                    {
                        name: 'принципы',
                        url: '/principes'
                    },
                    {
                        name: 'Партнерам',
                        url: '/looking-for'
                    },
                    {
                        name: 'события',
                        url: '/events'
                    },
                    {
                        name: 'магазины',
                        url: '/shops'
                    }
                ],
            }
        },
        methods:{
            listAppear(){
                let links = document.querySelectorAll('.big-link');
                for (let i = 0; i < links.length; i++) {
                }
            }
        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';

    .modal-view{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 3;
        background-color: $main;
        .content{
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 95%;
        }
        .main-nav{
            margin: 0px;
            padding: 0px;
            list-style: none;
            width: 35%;
            display: inline-block;
            li{
                margin-bottom: 5px;
                position: relative;
                &:hover{
                    a{
                        color: $orange!important;
                    }
                }
                &:nth-child(3){
                    &:hover{
                        a{
                            &:after{
                                opacity: 1;
                            }
                        }
                        .second-nav{
                            opacity: 1;
                        }
                    }
                    a{
                        &:after{
                            content: '';
                            position: absolute;
                            border: 12px solid $orange;
                            border-color: transparent transparent transparent $orange;
                            top: 50%;
                            transform: translateY(-50%);
                            right: -50px;
                            opacity: 0;
                            transition: all .35s; 
                        }
                    }
                }
                a{
                    color: $black!important;
                    font-family: bebas;
                    font-weight: 800;
                    font-size: 5vw;
                    line-height: 100%;
                    transition: all .35s;
                    position: relative;
                   
                }
            }
            .second-nav{
                list-style: none;
                padding: 0px;
                margin: 0px;
                position: absolute;
                top: 10px;
                left: 100%;
                width: 100%;
                opacity: 0;
                transition: all .35s;
                li{
                    a{
                        font-size: 48px;
                        opacity: 0.6;
                        text-decoration: none;
                        color: $black!important;
                        &:hover{
                            color: $orange!important;
                        }
                        &:after{
                            content: none;
                        }
                    }
                }
            }
        }
    }

</style>

