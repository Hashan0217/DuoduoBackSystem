<template>
	<view class="my-order-container">
		<scroll-view scroll-y="true" @scroll="scroll">
			<view class="order">
				<menuAppear v-if="id == 0" />
				<addClass v-else-if="id == 1" />
				<addMenu v-else-if="id == 3" />
			</view>
		</scroll-view>

		<view class="taber">
			<pageTaber @handlerClick="handlerClick" :taber="taber" />
		</view>
	</view>
</template>

<script>
	import pageTaber from '@/components/pageTaber.vue';

	import addClass from './components/add-class.vue';

	import addMenu from './components/add-menu.vue';
	import menuAppear from './components/menu-appear.vue';
	export default {
		components: {
			pageTaber,
			addClass,
			addMenu,
			menuAppear
		},
		data() {
			return {
				id: 0,
				taber: [{
						id: 0,
						icon: 'icon-dingdanguanli1',
						title: '菜单展示'
					},
					{
						id: 1,
						icon: 'icon-dingdanguanli1',
						title: '分类添加'
					},
					{
						id: 3,
						icon: 'icon-dingdanguanli1',
						title: '菜单添加'
					}
				]
			};
		},
		methods: {
			handlerClick(id) {
				this.id = id;
			},
			scroll(e) {
				const data = e.detail
				uni.$emit('upScrollData', {
					data
				})

			}

		},
		// 刷新
		onPullDownRefresh() {
			console.log(11);
		},
		change(index) {
			this.current = index;
		},

	};
</script>

<style>
	.order {

		max-height: 90vh;

	}

	.taber {
		position: relative;
		width: 100px;
	}
</style>