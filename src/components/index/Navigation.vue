<template>
	<div class="navgation">
		<div id="container">
			<div class="logo"></div>
			<ul>
				<li>
					<router-link to="#" class="active">主页</router-link>
				</li>
				<li>
					<router-link to="#">比赛</router-link>
				</li>
				<li>
					<router-link to="#">题目</router-link>
				</li>
				<li>
					<router-link to="#">排行榜</router-link>
				</li>
			</ul>
		</div>

	</div>
</template>

<<script>
export default {

}
</script>


<style lang="stylus" scoped>
.navgation
	background #ff5e52
	height 70px
	.logo
		margin-right 50px
		background #000
		height 70px
		width 120px
		float left
	ul
		line-height 70px
		li
			float left
			a
				display block
				padding 0 15px
				color #f8f8f9
				font-size 16px
				&:hover
					color #fff
				&.active
					background #FF0000
</style>









