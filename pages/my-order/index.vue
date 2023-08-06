<template>
    <view class="my-order-container">
        <view class="order">
            <newOrder v-if="id == 0" />
            <oldOrder v-if="id == 1" />
        </view>
        <view class="taber">
            <pageTaber @handlerClick="handlerClick" :taber="taber" />
        </view>
    </view>
</template>

<script>
import pageTaber from '@/components/pageTaber.vue';
import newOrder from './components/new-order.vue';
import oldOrder from './components/oldOrder.vue';
export default {
    components: {
        pageTaber,
        newOrder,
        oldOrder
    },
    data() {
        return {
            id: 0,
            taber: [
                {
                    id: 0,
                    icon: 'icon-dingdanguanli1',
                    title: '新订单'
                },
                {
                    id: 1,
                    icon: 'icon-dingdanguanli1',
                    title: '历史订单'
                }
            ]
        };
    },
    methods: {
        handlerClick(id) {
            this.id = id;
            console.log(id);
        }
    },
    // 刷新
    onPullDownRefresh() {
        console.log(11);
    }
};
</script>

<style lang="scss">
// @import '@/uni_modules/uview-ui/index.scss';

.order {
    /* margin-bottom: 100px; */
    overflow: auto;
    /* min-height: 500px; */
    max-height: 90vh;
}

.taber {
    position: relative;
    /* margin-top: 150px; */
}
</style>
