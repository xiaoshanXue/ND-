let screenWidth = uni.getSystemInfoSync().windowWidth, // 屏幕宽度
	screenHeight = uni.getSystemInfoSync().windowHeight; // 屏幕高度 

const Torpx = num => 750 * num / screenWidth, // px转rpx
	Topx = num => num * screenWidth / 750; // rpx转px

const getSystemHeight = (isRpx = true) => isRpx ? Torpx(screenHeight) : screenHeight; // 获取屏幕高度

const formatTime = num => {
	if (!num && num !== 0) return '00:00';

	let divisionNum = Math.floor(num / 60),
		remainderNum = Math.floor(num % 60),
		zero = (x) => '0'.repeat(2 - String(x).length);
	return `${zero(divisionNum)+divisionNum}:${zero(remainderNum)+remainderNum}`
}


const getNodesHeightInfo = optionObj => {
	let {
		pageID,
		pos,
		success
	} = optionObj;
	let heightArr = [];
	const query = uni.createSelectorQuery().in(pageID);
	query.selectAll(`.${pos}`).boundingClientRect(data => {
		data.forEach(item => heightArr.push(item.height));
		success(heightArr)
	}).exec()
}
const calSurplusHeight = optionObj => {
	let {
		pageID,
		pos,
		isRpx = true,
		isTabBarPage = false,
		success
	} = optionObj;
	getNodesHeightInfo({
		pageID,
		pos,
		success: NodesHeightArr => {
			let usedTotalHeight = NodesHeightArr.reduce((pre, item) => pre + item);
			let SurHeight = isTabBarPage ? screenHeight - usedTotalHeight - 50 : screenHeight -
				usedTotalHeight;

			// #ifdef MP-WEIXIN
			SurHeight += 50;
			// #endif
			SurHeight = isRpx ? Torpx(SurHeight) : SurHeight;
			// 取整(防止震动)
			let SurHeightEND = Math.floor(SurHeight)
			success(SurHeightEND)
		}
	})
}



export default {
	Torpx,
	Topx,
	getSystemHeight,
	formatTime,
	getNodesHeightInfo,
	calSurplusHeight
}
