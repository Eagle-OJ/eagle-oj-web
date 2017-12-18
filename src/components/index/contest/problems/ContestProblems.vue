<template>
	<div id="container">
        <Spin fix v-if="loading"></Spin>
        <h1 class="title">{{contest.name}}</h1>
        <Row :gutter="20">
            <Col span="16" class="left">
                <table cellspacing="0" cellpadding="0" class="problem-table">
                    <thead class="problem-head">
                        <tr>
                            <td>状态</td>
                            <td>名称</td>
                            <td>难度</td>
                            <td>提交</td>
                            <td>AC率</td>
                            <td v-if="contest.type==0 || contest==1">分值</td>
                        </tr>
                    </thead>
                    <tbody class="problem-list">
                        <tr v-for="item in problems">
                            <td>
                                <Icon v-if="item.status=='AC'" type="checkmark" style="color: #19be6b"></Icon>
                                <Icon v-else-if="item.status!=undefined" type="minus-round" style="color: #ff9900"></Icon>
                            </td>
                            <td>
                                <router-link :to="{ path:'/contest/'+getCid+'/problem/'+item.pid }">{{item.title}}</router-link>
                            </td>
                            <td>
                                <difficult :difficult="item.difficult"></difficult>
                            </td>
                            <td>{{item.submit_times}}</td>
                            <td>{{util.getACRate(item.ac_times, item.submit_times)}}</td>
                            <td v-if="contest.type==0 || contest==1">{{item.score}}</td>
                        </tr>
                    </tbody>
                </table>
            </Col>
            <Col span="8" class="right">
                <div class="each">
                    <p class="info" >
                        <Icon type="compass" style="color: dodgerblue"></Icon>
                        剩余时间
                    </p>
                    <count-down class="countdown" :deadline="getCountDown" end_text=""></count-down>
                </div>
                <div class="each">
                    <p class="info" >
                        <Icon type="trophy" style="color: #ff9900"></Icon>
                        当前排名
                    </p>
                    <div class="rank">
                        <span style="font-size: 60px">29/<span style="font-size: 35px">45</span></span>
                        <span class="update-time">20秒前更新</span>
                    </div>
                </div>
                <div class="each">
                    <p class="info" >
                        <Icon type="alert-circled" style="color: red"></Icon>
                        比赛模式
                    </p>
                    <div>
                        <Tag color="blue">{{util.getContestType(contest.type)}}</Tag>
                        <Tag color="green">{{util.getContestTimeType(contest.type, contest.total_time)}}</Tag>
                    </div>
                </div>
            </Col>
        </Row>
	</div>
</template>

<script>
import CountDown from '@/components/index/contest/CountDown'
import format from 'date-fns/format'
import Difficult from '@/components/common/Difficult'
import Util from '@/util'
export default {
    created() {
        this.getContestUserData()
        this.getContestInfo()
    },
    data() {
        return {
            loading: false,
            util: Util,
            contest: {},
            userInfo: {},
            problems: []
        }
    },
    methods: {
        getContestInfo() {
            this.$http.get('/contest/'+this.getCid).then(res => {
                this.contest = res.data
            })
        },
        getContestUserData() {
            this.loading = true
            this.$http.get('/user/contest/'+this.getCid+'/data').then(res => {
                this.userInfo = res.data.user
                this.problems = res.data.problems
            }).catch(res => {
                this.$router.push('/contest/'+this.getCid)
                this.$Message.error('你没有加入比赛')
            }).finally(() => {
                this.loading = false
            })
        },
    },
    computed: {
        getCid() {
            return this.$route.params.cid
        },
        getCountDown() {
            let type = this.contest.type
            if (type == 0 || type == 2) {
                return format(new Date(this.contest.end_time), 'YYYY-MM-DD HH:mm:ss')
            } else {
                // 获取限定时间
                let join = this.userInfo.join_time
                let total = this.contest.total_time
                return format(new Date(join+total), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    },
    components: {
        CountDown,
        Difficult
    }
}
</script>

<style lang="stylus" scoped>
    @import 'ContestProblem.stylus'
</style>


