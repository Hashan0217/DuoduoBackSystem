<template>
    <view class="about-info-container" v-html="text">

    </view>
</template>

<script>
    export default {
        data() {
            return {
                text: "<h1>表白墙是什么？</h1> <p>dafsdfadfsdfsafsdff发达发达根深蒂固给对方撒给阿嘎管道符给给是</p>"
            }
        },
        methods: {

        }
    }
</script>

<style>
    .about-info-container {
        padding: 10px;
        margin-top: 20px;
    }
</style>