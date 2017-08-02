<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            .inner-right-sidebar
                router-link(to="/").close
                    .icon
                        include ../assets/close.svg
                    span Вернуться на главную
                .links-block
                    ul
                        li.active
                            a(href="#mission") миссия
                        li
                            a(href="#deals") подход
                        li
                            a(href="#directors") руководители
</template>

<script>
    export default {
        data(){
            color: '#D5DFDE'
        }
    }
</script>
