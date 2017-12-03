<template>
	<div id="container">
		<div style="margin-top: 60px">
			<div class="title">
				世界ACM公开赛
			</div>
			<div class="right">
				<table cellspacing="0" cellpadding="0" class="problem-table">
					<thead class="problem-head">
					<tr>
						<td>状态</td>
						<td>名称</td>
						<td>难度</td>
						<td>分值</td>
					</tr>
					</thead>
					<tbody class="problem-list">
					<tr v-for="i in 10">
						<td>
							<Icon type="checkmark" style="color: #19be6b"></Icon>
						</td>
						<td>
                            <router-link to="/problem/1">A+B problem</router-link>
                        </td>
						<td>
							<Tag color="blue">中等</Tag>
						</td>
						<td>9</td>
					</tr>
					</tbody>
				</table>
				<div style="margin-top: 15px;text-align: right;margin-right: 10px;margin-bottom: 8px">
					<Page :total="40" size="small" show-total></Page>
				</div>
			</div>
			<div class="left">
				<div >
					<p class="info" >
						<Icon type="compass" style="font-size: 25px;margin-right: 8px;color: dodgerblue"></Icon>
						剩余时间
					</p>
				</div>
				<div class="countdown">
					<count-down deadline="2017-11-24 22:00:00"></count-down>
				</div>

				<div>
					<p style="margin-top: 27px" class="info" >
						<Icon type="trophy" style="font-size: 25px;margin-right: 12px;color: #ff9900"></Icon>
						当前排名
					</p>
					<div class="rank">
						<span class="user-rank">29/<span style="font-size: 40px">45</span></span>
					</div>
				</div>
				<div>
					<p style="margin-top: 27px" class="info" >
						<Icon type="alert-circled" style="font-size: 25px;color: red;margin-right: 14px"></Icon>
						比赛模式
					</p>
					<div>
						<p class="info" style="margin-left: 39px;margin-top: 10px;border-bottom:2px #ddd solid; ">ACM模式+限时模式</p>
					</div>
				</div>
				<div style="margin-top: 18px">
					<p style="font-size: 18px"><Icon type="help-circled" style="color: #19be6b;margin-right: 14px;font-size: 25px"></Icon>模式说明:</p>
					<p style="font-size: 14px;margin-top: 10px;padding-left: 35px;line-height: 26px">
						比赛一共有三种形式:ACM模式,普通模式,限时模式,模式可以两两组合.
						<br>
						ACM模式：答题时一个测试点错误则全错.<br>
						普通模式:答对所有测试点即可获得所有分数.<br>
						限时模式:当开始答题时开始计时，直到比赛时间结束.
					</p>
				</div>
			</div>
			<div style="clear: both"></div>
		</div>
	</div>
</template>

<script>
	import CountDown from '@/components/index/contest/CountDown'

	export default {
		components: {
			CountDown
		}
	}
</script>

<style lang="stylus" scoped>
	#container
		.title
			font-size 28px
			margin-bottom 30px
			border-bottom 1px #ddd solid
			text-align center
			padding-bottom 10px
		.right
			float left
			width 60%
			border-radius 10px
			border 1px solid #DDD
			overflow hidden
			.problem-table
				width 100%
				font-size 16px
			.problem-head td
				background #f8f8f9
				height 30px
				padding-left 18px
			.problem-table tbody td
				padding-left 18px
				height 34px
				padding-top 4px
				border-bottom 1px #ddd solid
			a
				color #657180
			a:hover
				color #2d8cf0
				text-decoration underline
		.left
			margin-right 30px
			width 30%
			float right
			padding-left 20px
			.countdown
				width auto
				border-radius 10px
				margin-top 10px
				text-align center
				font-size 20px
				background #EEEEEE
				height 35px
				padding-top 4px
			.rank
				margin-top 10px
				width 100%
				height 130px
				font-size 66px
				text-align center
				padding-top 10%
				border-bottom 2px #ddd solid
			.info
				font-size 18px
</style>


