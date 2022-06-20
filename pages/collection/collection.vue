<template>
	<view>
		<view class="cal" :style="{height: `${statusBarHeight}px`}"></view>
		<search-box class="cal"></search-box>
		<tab-top class="cal" :tabIndex="tabIndex" :tabArr="['我的收藏', '收听历史']" @changeTabIndex="changeTabIndex"></tab-top>

		<swiper :style="{height: `${calHeight}rpx`}" :current="tabIndex" @change="swiperChangeIndex">
			<swiper-item>
				<scroll-view scroll-y :style="{height: `${calHeight}rpx`}">
					<block v-for="item in collectedArr" :key="item.id">
						<collect-item :bookID="item.id" :bookImgUrl="item.imgurl" :bookName="item.name" :bookSynopsis="item.synopsis"
						 @getID="getID" @showCancalCol="showCancalCol"></collect-item>
					 </block>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height: `${calHeight}rpx`}">
					<view></view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-popup type="bottom" ref="popup" @change="changeStatus">
			<view class="bg-white">
				<view style="height: 100rpx;line-height: 100rpx;" @tap="cancalCollect">
					<my-icon iconId="icon-xingxing" iconColor="text-danger" class="px-3"></my-icon>
					<text class="font">取消收藏</text>
				</view>
				<view class="bg-hover-light" style="height: 15rpx;"></view>
				<view class="text-center" style="height: 110rpx;line-height: 110rpx;" @tap="showCancalCol(false)">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import $U from '@/common/unit';
	import tabTop from '@/components/tabTop.vue';
	import searchBox from '@/components/searchBox.vue';
	import collectItem from '@/components/collectItem.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				statusBarHeight: this.$statusBarHeight,
				calHeight: 0,
				tabIndex: 0,
				showCancalColStatus: false,
				collectedArr: [],
				cancalColID: 0
			}
		},
		components: {
			tabTop,
			searchBox,
			collectItem,
			uniPopup
		},
		watch: {
			showCancalColStatus(newVal) {
				newVal ? uni.hideTabBar({animation: true}) : uni.showTabBar({animation: true})
			}
		},
		methods: {
			changeTabIndex(index) {
				this.tabIndex = index
			},
			swiperChangeIndex(e) {
				this.tabIndex = e.detail.current
			},
			initData(){
				this.collectedArr = getApp().globalData.collectedBooks
			},
			getID(id) {
				this.cancalColID = id
			},
			IDtoIndex(id){
				return this.collectedArr.findIndex(item => item.id === id)
			},
			cancalCollect(){
				let index = this.IDtoIndex(this.cancalColID);
				this.collectedArr.splice(index, 1);
				this.showCancalCol(false)
			},
			showCancalCol(bol) {
				bol ? this.$refs.popup.open() : this.$refs.popup.close()
			},
			changeStatus(e) {
				this.showCancalColStatus = e.show
			}
		},
		onLoad() {
			this.initData()
		},
		mounted() {
			$U.calSurplusHeight({
				pageID: this,
				pos: 'cal',
				isTabBarPage: true,
				success: val => this.calHeight = val
			})
		}
	}
</script>

<style>

</style>
