<template lang="pug">
    .floats-block
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
</template>

<script>
    export default {
        data(){
            return{
                interval: ''
            }
        },
        methods:{
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
            }
        },
        created(){
            this.interval = setInterval(this.floatProducts, 2500);
        },
        mounted(){
            this.setPosProducts();
            this.floatProducts();
            this.interval = setInterval(this.floatProducts, 2500);
        }
    }
</script>

<style lang="scss">
    .floats-block{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
        .float{
            position: absolute;
            z-index: 0;
            width: 130px;
        }
    }

    @media (max-width: 1367px){
        .floats-block{
            .float{
                width: 100px;
            }
        }
    }

    @media (max-width: 1025px){
        .floats-block{
            .float{
                width: 100px;
            }
        }
    }
</style>


