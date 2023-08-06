<template>
    <view class=" old-order-container">
        oldOrder
    </view>

</template>

<script>
    import pageTaber from '@/components/pageTaber.vue'
    export default ({
        components: {
            pageTaber,

        },
        data() {
            return {

            }
        },
        methods: {

        },
        // 刷新
        onPullDownRefresh() {
            console.log(11);
        }

    })
</script>

<style>
    main {
        min-height: 100%;
        padding-top: 100px;
        padding-bottom: 100px;
        margin-top: -100px;
        margin-bottom: -100px;
    }
</style>