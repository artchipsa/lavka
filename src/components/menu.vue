<template lang="pug">
    .modal-view
        .content
            ul.main-nav
                li(v-for="link in links")
                    router-link.big-link(:to="link.url") {{ link.name }}
                    ul.second-nav
                        li(v-for="nav in link.second_nav")
                            router-link(:to="nav.link") {{ nav.name }}
        .socials-block
                ul
                    li(v-for="social in socials")
                        a(v-bind:href="social.url" target="_blank")
                            i.fa(aria-hidden="true" :class="social.icon")
        .copyright-block
            .copyright copyright 2017
            .copyright-link made in #[a(href="http://chipsa.ru", target="_blank") chipsa]
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
                socials: [
                    {
                        icon: 'fa-instagram',
                        url: 'https://www.instagram.com/lavochka_net/'
                    },
                    {
                        icon: 'fa-facebook-official',
                        url: 'https://www.facebook.com/lavochka.net'
                    },
                    {
                        icon: 'fa-vk',
                        url: 'https://vk.com/lavochka_net'
                    }
                ]
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

    .copyright-block{
        position: absolute;
        bottom: 4%;
        right: 3%;
        font-family: bebas;
        font-weight: 800;
        font-size: 20px;
        .copyright{
            display: inline-block;
            margin-right: 60px;
        }
        .copyright-link{
            display: inline-block;
            a{
                color: $black;
            }
        }
    }

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

    .modal-view .socials-block{
        display: none;
    }

    @media (max-width: 1367px){

        .modal-view .main-nav li a{
            font-size: 4.6vw;
        }
        .modal-view .main-nav .second-nav li a{
            font-size: 32px;
        }
    }

    @media (max-width: 1025px){
        .modal-view .main-nav li a{
            font-size: 6.9vw;
        }
        .modal-view .main-nav{
            width: 40%;
        }
        .modal-view .content{
            width: 75%;
        }
    }

    @media(max-width: 769px){
        
        .modal-view .content{
            height: 75%;
        }

        .modal-view .main-nav {
            width: 45%;
        }

        .modal-view .socials-block{
            display: block;
            position: absolute;
            right: 3%;
            top: 3%;
            ul{
                padding: 0px;
                margin: 0px;
                list-style: none;
                li{
                    margin-bottom: 20px;
                    width: 28px;
                    text-align: center;
                    a{
                        color: $side-menu;
                        .fa{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 469px){
        .modal-view .content{
            width: 94%;
            height: 80%;
            overflow: scroll;
        }
        .modal-view .main-nav{
            width: 80%;
        }
        .modal-view .main-nav li a{
            font-size: 12vw;
        }
        .modal-view .main-nav .second-nav{
            position: relative;
            height: 0%;
            top: 0px;
            left: 0px;
            opacity: 1;
            height: auto;
            overflow: hidden;
        }
        .modal-view .main-nav li:nth-child(3):hover .second-nav{
            height: 270px;
        }
        .second-nav li:first-child{
            margin-top: 12px;
        }
        .modal-view .main-nav .second-nav li a{
            font-size: 26px;
        }
        .modal-view .main-nav{
            overflow-y: scroll;
        }
    }


</style>

