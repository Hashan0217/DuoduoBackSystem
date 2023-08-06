<template>
    <view class="about-container">
        <view class="about-info">
            <image src="../../../static/logo.png" mode=""></image>
            <text class="info-title">多多点智慧餐饮</text>
            <text class="info-version">V1.0.0</text>
        </view>
        <view class="about-link">
            <listCard :list="listData"></listCard>
        </view>
        <view class="about-other" @click="contact">
            <i class="iconfont icon-xinfeng other-icon"></i>
            <text class="other-text">联系我们</text>
        </view>
    </view>
</template>

<script>
    import icont from "../icont.css"
    import listCard from "./listCard.vue"
    export default {
        components: {
            listCard
        },
        data() {
            return {
                listData: [{
                        text: '多多点智慧餐饮是什么',
                        right: 'icon-youjiantou2',
                        url: '/pages/shop-info/components/AboutInfo'
                    },
                    {
                        text: '加盟我们',
                        right: 'icon-youjiantou2',
                        url: '/pages/shop-info/components/AboutInfo'
                    },
                ],
                ourEmail: 'Hashan@88.com'
            }
        },
        methods: {

            contact() {
                let _this = this
                wx.showModal({
                    title: '联系我们',
                    content: '邮箱：Hashan@88.com',
                    cancelText: '关闭',
                    confirmText: '复制',
                    success(res) {
                        if (res.confirm) {
                            wx.setClipboardData({
                                data: _this.ourEmail,
                                success: function(res) {
                                    wx.getClipboardData({
                                        success: function(res) {
                                            wx.showToast({
                                                title: '复制成功'
                                            })
                                        }
                                    })
                                }
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    page {
        background-color: rgb(245, 247, 250);

    }

    .about-container {
        margin-top: 10px;

    }

    .about-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .about-info image {
        width: 90px;
        height: 90px;
        border-radius: 10px;
    }

    .info-title {
        margin-top: 10px;
        font-size: 24px;
        font-weight: bold;
    }

    .info-version {
        margin-top: 15px;
        font-size: 14px;
        font-weight: 400;
    }

    .about-link {
        width: 93%;
        margin-top: 30px;
        margin-left: 3px;
    }

    .about-other {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        bottom: 5%;
        transform: translate(-50%, -5%);
    }

    .other-icon {
        font-size: 50px;
    }

    .other-text {
        font-size: 12px;
        margin-top: 10px;
    }
</style>