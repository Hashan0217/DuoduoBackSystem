<template>
    <view class="user-info-container">
        <!-- 头像选择器 -->
        <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" type="">
            <image class="avatar" :src="avatarUrl"></image>
        </button>
        <!-- 填写信息 -->
        <view class="info-card">
            <view class="form-item">
                <text class="label">商铺：</text>
                <input class="weui-input input" placeholder="请输入商铺名称" v-model="userName" />
            </view>
        </view>
        <!-- 保存信息 -->
        <button class="submit">保存信息</button>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
                userName: '',
                gender: '',
                phoneNumber: '',
                signature: '',


            }

        },
        methods: {
            onChooseAvatar(e) {
                const {
                    avatarUrl
                } = e.detail
                this.avatarUrl = avatarUrl
            }
        }

    }
</script>

<style>
    page {
        background-color: rgb(245, 247, 250);

    }

    .avatar-wrapper {
        padding: 0;
        width: 90px;
        height: 90px;
        border-radius: 8px;
        margin-top: 40px;
        margin-bottom: 40px;
        border-radius: 50%;
    }

    .avatar {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .container {
        display: flex;
    }

    .info-card {
        padding: 20px;
        background-color: white;
        border-radius: 20px;
        width: 95%;
        margin: 0 auto;
    }

    .form-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

    }

    .label {
        font-size: 16px;
        color: #333;
        width: 130rpx;
        font-weight: bolder;
    }

    .radio-group {
        display: flex;
    }

    .radio {
        margin-right: 20rpx;
        font-size: 28rpx;
    }

    .input {
        flex: 1;
        height: 70rpx;
        padding: 0 10rpx;
        font-size: 28rpx;
        border: 1rpx solid #ccc;
        border-radius: 10rpx;
    }

    .textarea {
        flex: 1;
        height: 160rpx;
        padding: 20rpx;
        font-size: 28rpx;
        border: 1rpx solid #ccc;
        border-radius: 10rpx;
        resize: none;
    }

    .submit {
        width: 95%;
        margin: 0 auto;
        height: 50px;
        background-color: 20px;
        background-color: rgb(252, 197, 58);
        font-size: 14px;
        text-align: center;
        line-height: 50px;
        margin-top: 60px;
    }
</style>