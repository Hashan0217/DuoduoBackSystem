<template>
    <view class="">
        <view class="list-card-container" v-for="(item,index) in list" :key="index" @click="jumpLink(item)">
            <i class="iconfont left" :class="item.left"></i>
            <text class="text">{{item.text}}</text>
            <i class="iconfont  right " :class="item.right?item.right:'icon-youjiantou2'"></i>
        </view>
    </view>

</template>

<script>
    export default {

        props: {
            list: {
                type: Array
            }
        },
        data() {
            return {

            }
        },
        methods: {
            jumpLink(item) {
                wx.navigateTo({
                    url: item.url
                })
            }
        }
    }
</script>

<style>
    .list-card-container {
        width: 100%;
        border-radius: 20rpx;
        display: flex;
        /* justify-content: space-around; */
        align-items: center;
        padding: 10px;
        height: 60px;
        background-color: rgb(255, 255, 255);
        position: relative;
        margin-top: 10px;
    }

    .left {
        font-size: 20px;
    }

    .text {
        font-size: 18px;
        margin-left: 20px;
    }

    .right {
        position: absolute;
        right: 20px;
        font-size: 15;
    }
</style>