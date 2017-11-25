<template>
    <div id="container">
		<div class="first">
			<div class="contest-title">世界ACM公开赛</div>
			<div style="width: 100%;border: 2px #ddd solid"></div>
			<div class="slogan">和五大洲的人一起较量吧！和五大洲的人一起较量吧！和五大洲的人一起较量吧！
				<br><br>
				比赛开始时间:<span>2017-10-10</span>
			</div>
			<div style="margin: 0 auto;width: 160px;margin-top: 60px"><button class="join-btn">参加比赛<br>Sign up</button></div>
		</div>
        <div class="countdown"><count-down deadline="2017-12-23 21:40:00"></count-down></div>
		<div class="description">
			<div class="des-title">比赛说明<div style="width: 70%;border: 2px gray solid;margin: 0 auto"></div></div>
			<div class="des-body">
			对于我们来说，将某种颜色的10进制值转化为16进制值不是一件容易的事情，尽管我们可以学会将RGB颜色转化为16进制的数学原理。
			但是我们使用大多数图像编辑或者绘画程序中提供的颜色转化工具进行转化更为容易。通过使用滴管工具
			，可以在任何所需的颜色上单击，
			然后再颜色的拾取器中查看该颜色的RGB、HSB、CMYK、LAB和最终16进制数值。
			在HTML中，可以根据个人的意愿，通过编辑编码来修改文字和背景颜色，同时可以通过制定颜色的16进制数值来完成操
			作。代码相当简单---在HTML文件中的(暗红色代码）代码就得。</div>
		</div>
		<div class="mode">
			<div class="mode-title">模式说明<div style="width: 70%;border: 2px gray solid;margin: 0 auto"></div></div>
			<div class="thisTimeMode">本次比赛：ACM模式+限时模式</div>
			<div class="mode-des">
				ACM模式:如果题目的一个测试点错误，则判整体都是错误<br>
				限时模式：在选手开始答题为计时开始时间，比赛时间到即比赛结束
			</div>
		</div>
		<div></div>
		<div style="clear: both"></div>
	</div>

</template>

<script>
	import CountDown from '@/components/index/contest/CountDown'
	export default {
		data() {
			return {
				mode: 1
			}
		},
	  	components: {
	  		CountDown
		}
	}
</script>

<style lang="stylus" scoped>
	#container
		font-family  "Helvetica Neue",Helvetica,Arial,sans-serif
		.first
			border 1px solid #ddd
			box-shadow 1px 1px 30px #444444
			color white
			padding-top 13px
			width 100%
			background url("/static/contestdetail1.jpg") no-repeat
			padding-bottom 30px
			.contest-title
				width 35%
				font-size 33px
				margin 0 auto
				text-align center
			.slogan
				width 300px
				padding-top 40px
				font-size 15px
				text-align center
				margin 0 auto
			.join-btn
				border-radius 10px
				padding 10px
				width 140px
				font-size 17px
				letter-spacing 2px
				background #2ec866
				border none
				color white
			.join-btn:hover
				background #009900
				cursor pointer
			.join-btn:focus
				outline none
		.countdown
			border-radius 10px
			margin-top 10px
			text-align center
			font-size 38px
			background #EEEEEE
			height 65px
			padding-top 4px
		.description
			width 60%
			margin-top 60px
			border-right  #ddd 2px solid
			.des-body
				width 570px
				font-size 15px
				text-indent 2em
				margin-top 30px
				line-height 26px
		.mode
			margin-top 60px
			width 40%
			float right
			border-left 2px #ddd solid
			.mode-des
				font-size 15px
				padding-left 15px
				margin-top 30px
			.thisTimeMode
				margin-top 40px
				font-size 18px
				padding-left 15px
		.mode-title,.des-title
			padding-left 10px
			font-size 20px
			font-weight bold
			color #ed3f14
			width 90px
</style>


