<template>
    <div id="container">
		<div class="left">
			<div class="medals">
				<div style="width: 100%;text-align: center" class="contest-title"><p style="color: #FF5722;font-size: 40px;text-shadow: -1px -1px 0 rgba(200, 0, 0, .7)">公 开 排 行榜</p></div>
				<div style="margin-left: 35px;margin-top: 10px">
					<embed src="/static/gold.svg" type="image/svg+xml" width="150px" height="150px" style="margin-left: 150px"/>
					<div class="first"><img src="/static/touxiang.jpg"><br><a href="#" title="查看资料">狗蛋</a></div>

				</div>
				<div style="height: 300px">

					<div class="other"><embed src="/static/silver.svg" type="image/svg+xml" width="150px" height="150px"/>
						<div class="other-img"><img src="/static/touxiang.jpg"><br><a href="#" title="查看资料">狗蛋</a></div></div>


					<div class="other" style="margin-left: 210px"><embed src="/static/cuprum.svg" type="image/svg+xml" width="150px" height="150px">
						<div class="other-img"><img src="/static/touxiang.jpg"><br><a href="#" title="查看资料">狗蛋</a></div></div>
				</div>
				<div class="join-contest"><a href="#">不甘心？赶紧做题吧！</a></div>
			</div>
		</div>
		<div class="right">
			<div class="tips">
				<p>当前数据截至：2017-10-01</p>
			</div>
			<div class="rank-list">

				<div class="rank-head" style="margin-left: 5px">
					<div style="flex: 1">排名</div>
					<div style="flex: 3">昵称</div>
					<div style="flex: 2">积分</div>
					<div style="flex: 2">通过率</div>
				</div>
				<div class="rank-body" v-for="i in 10">
					<div class="rank-sequence">1</div>
					<div class="rank-nickname"><a href="#" title="查看资料">狗蛋</a></div>
					<div class="rank-credit">2300</div>
					<div class="rank-percent">80%</div>
				</div>
				<Page :total="40" size="small" show-total style="text-align: right; margin-top: 40px"></Page>
			</div>
		</div>
		<div style="clear: both"></div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
	#container
		font-family  "Helvetica Neue",Helvetica,Arial,sans-serif
		.left
			float left
			margin-bottom 150px
			.medals
				margin-top 50px
				border-radius 20px
				height 590px
				width 530px
				box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.15)
				font-size 18px
				padding-top 20px
				.first
					margin-top 10px
					text-align center
					width 50px
					margin-left 200px
				.other
					margin-left 0px
					float left
					.other-img
						text-align center
				a
					color #464c5b
				a:hover
					color #2d8cf0
					text-decoration underline
			.medals img
				width 50px
				height 50px
			.join-contest
				height 100px
				width 340px
				padding-top 40px
				text-align center
				background coral
				font-size 18px
				border-radius 20px
				margin-left 100px
				a
					color white
				a:hover
					text-decoration underline
			.join-contest:hover
				cursor pointer
				background orangered
		.right
			float  right
			.rank-list
				border-radius  20px
				padding 10px 20px 20px 15px
				box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.15)
				width 450px
				font-size 15px
				height 500px
				.rank-head
					height 34px
					display flex
					border-bottom  dashed 1px lightgray
					margin-top 30px
				.rank-body
					line-height 34px
					height 34px
					border-bottom  dashed 1px lightgray
					margin-left 10px
					display flex
					a
						color  #464c5b
					a:hover
						color #2d8cf0
						text-decoration underline
					.rank-sequence
						flex 1
					.rank-nickname
						flex 3
					.rank-credit
						color #66CD00
						flex 2
					.rank-percent
						flex 2
				.rank-body:hover
					background #f0f0f4
					right 10%
					transform scale(1.25,1.25)
					box-shadow 1px 2px 10px rgba(0, 0, 0, 0.3)
					border-bottom none
			.tips
				margin-left 40px
				height 100px
				margin-top 75px
				margin-bottom 30px
				background #2d8cf0
				border-radius 20px
				font-size 18px
				text-align center
				color white
				width 340px
				padding 35px 30px 30px 30px
</style>


