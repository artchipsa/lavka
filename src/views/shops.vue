<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            #map
            .count Магазины
            .map_info(v-for="shop in shops")
                a(href="" @click.prevent="closeInfo").close
                    img(src="../assets/close.svg", alt="")
                    span закрыть
                .content
                    .distance {{ shop.distance }}
                    .street {{ shop.street }}
                    .owner
                        img(:src="shop.owner_pic", alt="")
                        .owner-info
                            .owner-name {{ shop.owner_name }}
                            .owner-status {{ shop.owner_status }}
                    .text {{ shop.shop_story }}
                    .contacts-block
                        a.email(:href="'mailto:shop.email'") {{ shop.email }}
                        .phones
                            a.phone(v-for="phone in shop.phones" :href="'tel: phone'") {{ phone }}
                        

</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#f2f2f2',
                style: [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    }
                ],
                shops:[
                    {
                        icon: '../src/assets/marker.png',
                        pos: { lat: 56.01576316631433, lng: 92.82501220266113 },
                        distance: '250 км от города',
                        street: 'Красноярск ул.мужества дом 16',
                        owner_pic: '../src/assets/owner.png',
                        owner_name: 'Крамарновский константин',
                        owner_status: 'управляющий',
                        shop_story: '17 и 18 июня на острове Татышев в восьмой раз пройдёт главный пикник красноярского лета — фестиваль «Зелёный». Традиционно его делает медиагруппа «Прима» и наши друзья. Сотни площадок, на которых можно попробовать лучшую еду для пикника, посетить лекции, поиграть в подвижные игры, сделать лучшие фотографии за год, послушать правильную музыку или просто поваляться с книжкой на траве.',
                        email: 'lavochka@gmail.com',
                        phones: ['8–923–234–23–23', '8–902–234–21–12']
                    },
                    {
                        icon: '../src/assets/marker.png',
                        pos: { lat: 56.00803820423192, lng: 92.84406661550292 },
                        distance: '250 км  от города',
                        street: 'Красноярск ул.мужества дом 16',
                        owner_pic: '../src/assets/owner.png',
                        owner_name: 'Крамарновский константин',
                        owner_status: 'управляющий',
                        shop_story: '17 и 18 июня на острове Татышев в восьмой раз пройдёт главный пикник красноярского лета — фестиваль «Зелёный». Традиционно его делает медиагруппа «Прима» и наши друзья. Сотни площадок, на которых можно попробовать лучшую еду для пикника, посетить лекции, поиграть в подвижные игры, сделать лучшие фотографии за год, послушать правильную музыку или просто поваляться с книжкой на траве.',
                        email: 'lavochka@gmail.com',
                        phones: ['8–923–234–23–23', '8–902–234–21–12']
                    },
                    {
                        icon: '../src/assets/marker.png',
                        pos: { lat: 56.00194351063795, lng: 92.81883239309082 },
                        distance: '250 км от города',
                        street: 'Красноярск ул.мужества дом 16',
                        owner_pic: '../src/assets/owner.png',
                        owner_name: 'Крамарновский константин',
                        owner_status: 'управляющий',
                        shop_story: '17 и 18 июня на острове Татышев в восьмой раз пройдёт главный пикник красноярского лета — фестиваль «Зелёный». Традиционно его делает медиагруппа «Прима» и наши друзья. Сотни площадок, на которых можно попробовать лучшую еду для пикника, посетить лекции, поиграть в подвижные игры, сделать лучшие фотографии за год, послушать правильную музыку или просто поваляться с книжкой на траве.',
                        email: 'lavochka@gmail.com',
                        phones: ['8–923–234–23–23', '8–902–234–21–12']
                    }
                ],
                big_marker: '../src/assets/big_marker.png',
                small_icon: '../src/assets/marker.png',
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
        methods:{
            beforeEnter(el){
                clearInterval(this.interval)
                Velocity($(el).find('.count'), {translateX: '-150%'}, { duration: 10});
            },
            beforeLeave(){
                clearInterval(this.interval)                
            },
            enter(el, done){
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.count'), {translateX: '0%'}, {duration: 350, delay: 600}); 
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity($(el).find('.count'), {translateX: '0%'}, { duration: 350, delay: 600});
                        done();
                    }, 800);
                }
            },
            leave(el, done){
                clearInterval(this.interval)
                document.querySelector('body').style.backgroundColor = '#f2f2f2';
                Velocity($(el).find('.count'), {translateX: '-150%'}, { duration: 350, complete: done});
            },
            showInfo(id){
                let infos = document.querySelectorAll('.map_info');
                for (let i = 0; i < infos.length; i++){
                    if (infos[i].style.translateY = "0%"){
                        Velocity(infos[i], {translateY: '-200%'}, {duration: 450});
                    }
                }
                Velocity(infos[id], {translateY: '0%'}, {duration: 450});
            },
            closeInfo(event){
                var el = event.target.parentNode;
                var parent = this.findParent(el, 'map_info');
                Velocity(parent, {translateY: '-200%'}, {duration: 450});
            },
            findParent(el, cls){
                while ((el = el.parentElement) && !el.classList.contains(cls));
                return el;
            },
            mapInit(){
                let self = this;
                let center = {lat: 56.01720242950114, lng: 92.83505439321289};
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: center,
                    disableDefaultUI: true,
                    scrollwheel: false,
                    styles: self.style
                });

                let markers = []
                let marker, i;

                for (i = 0; i < self.shops.length; i++){

                    marker = new google.maps.Marker({
                        position: self.shops[i].pos,
                        icon: self.shops[i].icon,
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            console.log(marker, i);
                            // marker.setIcon(self.big_marker);
                            self.showInfo(i);
                        }
                    })(marker, i));

                }
                        

            }
        },
        mounted(){
            this.mapInit();
        }
    }
</script>

<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';

    #map{
        width: 100%;
        height: 100%;
    }

    .count{
        position: absolute;
        top: 15.5%;
        left: 3%;
        color: $orange;
        font-family: bebas;
        font-weight: 800;
        font-size: 2.2vw;
        line-height: 100%;
        z-index: 1;
    }

    .map_info{
        position: absolute;
        top: 0px;
        right: 10%;
        z-index: 1;
        height: 100%;
        width: 590px;
        background-color: $black;
        padding: 75px;
        color: $white;
        /* transition: all .45s; */
        transform: translateY(-200%);
        .content{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .close{
            position: absolute;
            right: 40px;
            top: 94px;
            display: block;
            text-decoration: none;
            transform: rotate(90deg);
            img{
                vertical-align: middle;
                margin-right: 30px;
            }
            span{
                font-family: bebas;
                font-size: 16px;
                font-weight: 800;
                color: $white;
                vertical-align: middle;
            }
        }
        .distance{
            font-family: bebas;
            font-weight: 800;
            color: $orange;
            width: 15%;
        }
        .street{
            font-size: 51px;
            font-weight: 800;
            font-family: bebas;
            width: 65%;
        }
        .owner img{
            vertical-align: middle;
            margin-right: 55px;
        }
        .owner-info{
            display: inline-block;
            vertical-align: middle;
            width: 60%;
            .owner-name{
                font-family: bebas;
                font-weight: 800;
                font-size: 30px;
                line-height: 130%;
                margin-bottom: 20px;
            }
            .owner-status{
                opacity: 0.65;
            }
        }
        .text{
            font-size: 18px;
            line-height: 120%;
        }
        .email{
            font-size: 18px;
            color: $white;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 30px;
        }
        .phone{
            font-size: 18px;
            color: $white;
            text-decoration: none;
            display: block;
            margin-bottom: 10px;
            &:last-child{
                margin-bottom: 0px;
            }
        }
    }

</style>
