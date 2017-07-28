<template lang="pug">
    .main
        a(href="#")#menu
            span
        .logo.main-logo
            include ../assets/logo.svg
            p.logo-text супермаркет отборных продуктов    
        aside.right-menu
            .handler
            .socials-block
                ul
                    li(v-for="social in socials")
                        a(v-bind:href="social.url")
                            i.fa(aria-hidden="true" :class="social.icon")
            .links-block
                ul
                    li(v-for="link in links"  @click="mainLineAnimation")
                        router-link(:to="link.url"  exact) {{ link.name }}

        router-view(:flow="flow" :links="links")
        .scroll-down
            span листайте вниз
</template>

<script>
    export default {
        name: 'app',
        data(){
            return{
                socials: [
                    {
                        icon: 'fa-instagram',
                        url: 'https://www.instagram.com/lavochka_net/'
                    },
                     {
                        icon: 'fa-twitter',
                        url: ''
                    },
                     {
                        icon: 'fa-facebook-official',
                        url: 'https://www.facebook.com/lavochka.net'
                    },
                     {
                        icon: 'fa-vk',
                        url: 'https://vk.com/lavochka_net'
                    },
                     {
                        icon: 'fa-odnoklassniki',
                        url: ''
                    }
                ],
                links:[
                    {
                        name: 'Главная',
                        url: '/'
                    },
                    {
                        name: 'Продукция',
                        url: '/products'
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
                        name: 'ищем партнеров',
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
                flow: ''
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path
                const fromDepth = from.path
                let current;
                let next;
                for (let i = 0; i < this.links.length; i++){
                    if (toDepth == this.links[i].url){
                        next = i;
                    }
                    if (fromDepth == this.links[i].url){
                        current = i;
                    }
                }
                this.flow = current < next ? 'forward' : 'back';
            }
        },
        methods:{
            mainLineAnimation(){
                let step = 12.5;
                let active = document.querySelector('.router-link-exact-active');
                let all_links = document.querySelectorAll('.links-block a');
                let index = [].indexOf.call(all_links, active) + 1;
                Velocity(document.querySelector('.handler'), {height: (index*step+'%')}, {duration: 400});
            },
            uiColorChange(){
                let overlay = document.querySelectorAll('.overlay');
                if (overlay.length > 0){
                    document.querySelector('#menu').classList.add('white');
                    document.querySelector('.right-menu').classList.add('white');
                    document.querySelector('.left-info-block').classList.add('white');
                } else {
                    document.querySelector('#menu').classList.remove('white');
                    document.querySelector('.right-menu').classList.remove('white');
                    document.querySelector('.left-info-block').classList.remove('white'); 
                }
            }
        },
        mounted(){
            
            this.uiColorChange();
            var self = this;

            //scroll
            let lastAnimation = 0;
            $(document).bind('mousewheel DOMMouseScroll', function(event) {
				let delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
				event.preventDefault();
                init_scroll(event, delta);
            });
            
			function init_scroll(event, delta) {
				let deltaOfInterest = delta,
					timeNow = new Date().getTime(),
					quietPeriod = 500;
				if(timeNow - lastAnimation < quietPeriod + 1000) {
					event.preventDefault();
				    return;
				}
			   setTimeout(() => {
                   let path = self.$route.path;
                   let current;
                   for (let i = 0; i < self.links.length; i++) {
                       if (path == self.links[i].url){
                           current = i;
                       }
                    }
				    if (deltaOfInterest < 0) {
					    if ($('.links-block li').eq(current).next().length > 0){
                            var links = document.querySelectorAll('.links-block li a');
                            links[current+1].click();
                            self.uiColorChange();
                        } 
				   	} else {
				      	if ($('.links-block li').eq(current).prev().length > 0){
                            var links = document.querySelectorAll('.links-block li a');
                            links[current-1].click();
                            self.uiColorChange();
                        } 
				   	}
			   }, 200)
			   
			   lastAnimation = timeNow;
			}


        },
        updated(){
            setTimeout(() => {
                this.uiColorChange();
            }, 1190)
            // this.mainLineAnimation();
        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';
    body{
        background-color: #D5DFDE;
    }
    .scroll-down{
        z-index: 2;
        position: absolute;
        bottom: 8%;
        left: 48%;
        transform: translateX(-50%);
        color: $gray;
        font-family: bebas;
        font-weight: 800;
        text-transform: uppercase;
    }

    .main{
        height: 100%;
        width: 100%;
    }

    #app{
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .view{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        /* z-index: 1; */
    }
    .logo{
        position: absolute;
        top: 28px;
        left: 48%;
        transform: translateX(-50%);
        z-index: 2;
        text-align: center;
        svg g use {
            fill: #FAF6EB;
        }
    }
    .black-carousel .container{
        overflow: hidden;
    }
    .logo-text{
        font-family: bebas;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: 1.5px;
        color: $brown;
        text-align: center;
        display: none;
        opacity: 1;
    }
    .container{
        width: 90%;
        height: 100%;
        position: relative;
    }
    .owl-carousel .owl-stage-outer, .owl-carousel .owl-stage, .owl-item{
        height: 100%;
    }
    #menu{
        position: absolute;
        top: 28px;
        left: 46px;
        width: 53px;
        height: 5px;
        line-height: 100%;
        padding: 12px 0px;
        z-index: 2;
        &.white{
            span{
                background-color: #fff;
            }
        }
        span{
            background-color: $menu;
            width: 53px;
            height: 3px;
            display: inline-block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            &:after{
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0px;
                width: 30px;
                height: 3px;
                background-color: inherit;
            }
        }
    }

    .right-menu{
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
        width: 10%;
        z-index: 2;
        display: flex;
        border-left: 1px solid $side-menu;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 42px;
        padding-bottom: 72px;
        &.white{
            .links-block{
                ul{
                    li{
                        a{
                            &.router-link-exact-active{
                                color: #fff!important;
                            }
                            &:hover{
                                color: #fff; 
                            }
                        }
                    }
                }
            }
        }
        .handler{
            position: absolute;
            left: -5px;
            top: 0px;
            background-color: $side-menu;
            width: 5px;
        }
        .socials-block{
            ul{
                padding: 0px;
                margin: 0px;
                list-style: none;
                li{
                    margin-bottom: 46px;
                    width: 28px;
                    text-align: center;
                    a{
                        color: $side-menu;
                        .fa{
                            font-size: 26px;
                        }
                    }
                }
            }
        }
        .links-block{
            ul{
                list-style: none;
                padding: 0px;
                margin: 0px;
                li{
                   margin-bottom: 28px;
                   font-family: bebas;
                   font-weight: 800;
                   font-size: 16px;
                   &:last-child{
                       margin-bottom: 0px;
                   }
                   a{
                       text-decoration: none;
                       transition: all .35s;
                       color: $side-menu;
                       &:hover{
                           color: $side-menu-hover;
                       }
                   }
                }
            }
        }
    }

    .router-link-exact-active{
        color: $side-menu-hover!important;
    }


    .left-info-block{
        position: absolute;
        bottom: 8%;
        left: 3%;
        width: 250px;
        &.white{
            a{
                color: #fff;
            }
            h1{
                color: #fff;
            }
        }
        .tag{
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $gray;
            margin-bottom: 50px;
        }
        h1{
            font-family: bebas;
            font-weight: 800;
            font-size: 40px;
            line-height: 120%;
            margin: 0px;
            margin-bottom: 50px;
            color: $brown;
        }
        a{
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $black;
            &:hover{
                text-decoration: none;
            }
        }
    }

    .center-text-block{
        position: absolute;
        top: 50%;
        left: 52%;
        transform: translateY(-50%) translateX(-50%);
        width: 50%;
        min-height: 50%;
        h2{
            font-family: bebas;
            font-weight: 800;
            font-size: 5.2vw;
            display: block;
            line-height: 115%;
            margin: 0px;
            margin-bottom: 50px;
            color: $white;
            width: 100%;
            span{
                color: $orange;
            }
        }
    }

     .owl-dots{
        position: absolute;
        top: 3%;
        right: 3%;
        .owl-dot{
            width: 10px;
            height: 10px;
            padding: 5px;
            border-radius: 50%;
            display: inline-block;
            background-color: $black-brown;
            opacity: 0.3;
            margin-right: 20px;
            cursor: pointer;
            transition: all .35s;
            &.active, &:hover{
                opacity: 1;
            }
            &:last-child{
                margin-right: 0px;
            }
        }
    }
    .owl-arrows{
        position: absolute;
        bottom: 8%;
        right: 3%;
        a{
            color: $black-brown;
            margin-right: 30px;
            font-size: 20px;
            &:last-child{
                margin-right: 0px;
            }
        }
    }

    @media (max-width: 1367px){

        .right-menu .socials-block ul li{
            margin-bottom:  20px;
            width: 18px;
        }
        .right-menu .socials-block ul li a .fa{
            font-size: 18px;
        }
        .right-menu{
            padding-top: 22px;
            padding-bottom: 62px;

        }
        .right-menu .links-block ul li{
            margin-bottom: 20px;
            font-size: 15px;
        }
        .center-plate{
            width: 55%;
            top: 52%;
        }
        .center-text-block h2{
            margin-bottom: 30px;
            line-height: 105%;
        }
        .logo-text{
            margin: 0px;
        }
        .center-text-block{
            top: 52%;
        }
    }
    

</style>

