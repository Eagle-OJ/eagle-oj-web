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
                        <Icon type="compass" style="color: dodgerblue"></Icon>
                        数据
                    </p>
                    <div class="data">
                        <div class="data-each">
                            <span class="num">{{userInfo.submit_times}}</span>
                            <span class="text">提交</span>
                        </div>
                        <div class="data-each">
                            <span class="num">{{userInfo.ac_times}}</span>
                            <span class="text">AC</span>
                        </div>
                        <div class="data-each">
                            <span class="num">{{userInfo.wa_times}}</span>
                            <span class="text">WA</span>
                        </div>
                        <div class="data-each">
                            <span class="num">{{userInfo.rte_times}}</span>
                            <span class="text">RTE</span>
                        </div>
                        <div class="data-each">
                            <span class="num">{{userInfo.tle_times}}</span>
                            <span class="text">TLE</span>
                        </div>
                        <div class="data-each">
                            <span class="num">{{userInfo.ce_times}}</span>
                            <span class="text">CE</span>
                        </div>
                    </div>
                </div>
                <div class="each">
                    <p class="info" >
                        <Icon type="trophy" style="color: #ff9900"></Icon>
                        当前排名
                        <router-link style="float: right" :to="{path: '/contest/'+this.getCid+'/leaderboard'}">排行榜</router-link>
                    </p>
                    <div class="rank">
                        <span style="font-size: 35px" v-if="userMeta.rank == -1">暂无排名</span>
                        <span style="font-size: 60px" v-else>{{userMeta.rank}}/<span style="font-size: 35px">{{userMeta.total}}</span></span>
                        <span class="update-time">{{getTime(userMeta.create_time)}}更新</span>
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
            userMeta: {},
            problems: []
        }
    },
    methods: {
        getContestInfo() {
            this.$http.get('/contest/'+this.getCid+'/info').then(res => {
                this.contest = res.data
            })
        },
        getContestUserData() {
            this.loading = true
            this.$http.get('/contest/'+this.getCid+'/user_data').then(res => {
                this.userInfo = res.data.user
                this.userMeta = res.data.meta
                this.problems = res.data.problems
                this.loading = false
            }).catch(res => {
                this.$router.push('/contest/'+this.getCid)
                this.$Message.error('你没有加入此比赛')
                this.loading = false
            })
        },
        getTime(time) {
            return Util.getDistanceTime(time)
        },
    },
    computed: {
        getCid() {
            return this.$route.params.cid
        },
        getCountDown() {
            let type = this.contest.type
            if (type == 0 || type == 2) {
                return Util.getFormatTime(this.contest.end_time, 'YYYY-MM-DD HH:mm:ss')
            } else {
                // 获取限定时间
                let join = this.userInfo.join_time
                let total = this.contest.total_time
                return Util.getFormatTime(join+total, 'YYYY-MM-DD HH:mm:ss')
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
    @import 'ContestProblem.styl'
</style>


