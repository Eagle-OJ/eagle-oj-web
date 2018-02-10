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
                    <td>类型</td>
					<td>举办者</td>
					<td>开始时间</td>
					<td>操作</td>
				</thead>
				<tbody>
                    <tr v-if="data.length==0">
                        <td colspan="6" style="text-align:center;color: #80848f">暂无比赛</td>
                    </tr>
                    <tr v-for="item in data">
                        <td><Icon v-if="item.password" type="locked"></Icon></td>
						<td>
                            <router-link :to="{path: '/contest/'+item.cid}" :class="{official: item.official==1}">{{item.name}}</router-link>
                        </td>
						<td>
                            <Tag v-if="getContestStatus(item.start_time, item.end_time) == 0" color="yellow" style="cursor: default" type="dot">即将开始</Tag>
                            <Tag v-else-if="getContestStatus(item.start_time, item.end_time) == 1" color="green" style="cursor: default" type="dot">进行中</Tag>
                            <Tag v-else color="red" style="cursor: default" type="dot">已结束</Tag>
                        </td>
                        <td>
                            <ContestType :type="item.type" :total_time="item.total_time"></ContestType>
                        </td>
						<td>
                            <router-link :to="{path: '/profile/'+item.owner}">{{item.nickname}}</router-link>
                        </td>
						<td>{{getTime(item.start_time)}}</td>
						<td>
                            <router-link :to="{path: '/contest/'+item.cid}">参加</router-link>
                        </td>
                    </tr>
				</tbody>
			</table>
		</div>
		<Page :total="this.total" size="small" show-total style="text-align: right; margin-top: 40px"></Page>
    </div>
</template>

<script>
import Util from '@/util'
import ContestType from '@/components/common/ContestType'

export default {
    created() {
        this.getContests(1)
    },
    data() {
        return {
            pageSize: 10,
            total: 0,
            data: []
        }
    },
    methods: {
        getContests(page) {
            this.$http.get('/contests/opened', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                res = res.data
                this.total = res.total
                this.data = res.data
            })
        },
        getContestStatus(startTime, endTime) {
            let time = new Date().valueOf()
            if (time < startTime) {
                // 即将开始
                return 0;
            } else if (time > endTime) {
                // 已经结束
                return 2
            } else {
                // 正在进行
                return 1
            }
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:mm:ss')
        }
    },
    components: {
        ContestType
    }
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


