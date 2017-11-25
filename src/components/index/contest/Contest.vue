<template>
    <div id="container">
		<div class="contest-img"><img src="/static/contest.jpg"></div>
		<div class="contests">
			<table cellpadding="0" cellspacing="0">
				<thead>
					<td style="width: 18px"></td>
					<td>名称
						<Tooltip placement="top">
							<div slot="content">
								<p>红色是官方认证比赛，黑色为普通比赛</p>
							</div>
						<Icon type="ios-help" style="cursor: pointer"></Icon>
						</Tooltip>
					</td>
					<td>状态</td>
					<td>举办者</td>
					<td>时间</td>
					<td>操作</td>
				</thead>
				<tbody>
					<tr>
						<td><Icon type="locked"></Icon></td>
						<td><a href="#" class="official">红鹰杯</a></td>
						<td><Tag color="yellow" style="cursor: default" type="dot">进行中</Tag></td>
						<td><a href="#">宁波大红鹰</a></td>
						<td>2017-01-01</td>
						<td><a href="#">参加</a></td>
					</tr>
					<tr>
						<td></td>
						<td><a href="#">红鹰杯</a></td>
						<td> <Tag color="red" style="cursor: default" type="dot">已结束</Tag></td>
						<td><a href="#">宁波大红鹰</a></td>
						<td>2017-01-01</td>
						<td><a href="#">参加</a></td>
					</tr>
					<tr>
						<td></td>
						<td><a href="#">红鹰杯</a></td>
						<td> <Tag color="green" style="cursor: default" type="dot">即将开始</Tag></td>
						<td><a href="#">宁波大红鹰</a></td>
						<td>2017-01-01</td>
						<td><a href="#">参加</a></td>
					</tr>
					<tr>
						<td><Icon type="locked"></Icon></td>
						<td><a href="#">红鹰杯</a></td>
						<td> <Tag color="yellow" style="cursor: default" type="dot">进行中</Tag></td>
						<td><a href="#">宁波大红鹰</a></td>
						<td>2017-01-01</td>
						<td><a href="#">参加</a></td>
					</tr>
					<tr v-for="i in 10">
						<td></td>
						<td><a href="#" title="查看比赛详情">红鹰杯</a></td>
						<td> <Tag color="red" style="cursor: default" type="dot">已结束</Tag></td>
						<td><a href="#" title="查看详细资料">宁波大红鹰</a></td>
						<td>2017-01-01</td>
						<td><a href="#" title="查看比赛详情">参加</a></td>
					</tr>

				</tbody>
			</table>
		</div>
		<Page :total="40" size="small" show-total style="text-align: right; margin-top: 40px"></Page>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
	.contest-img
		height 275px
		border-radius 30px
		box-shadow 0 0 30px  lightgray
		margin-bottom 10px
	.contest-img img
			width 100%
			height 100%

	.contests
		padding 10px 5px 20px 15px
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.15)
		border-radius  20px
		table
			width 100%
			font-size 15px
			font-family  "Helvetica Neue",Helvetica,Arial,sans-serif
			td
				height 34px
				border-bottom dashed 0.5px lightgray
				line-height 30px
				a
					color #464c5b
				a:hover
					text-decoration underline
					color #3399ff

			.official
				color #ed3f14
		tr:hover
			background #f0f0f4
	.contests:hover
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.4)


</style>


