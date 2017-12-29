<template>
    <div id="container">
        <div class="first">
            <div class="contest-title">{{data.name}}</div>
            <div class="slogan">
                {{data.slogan}}
            </div>
            <div class="start_time">
                <b>{{getTime(data.start_time)}}</b>
                <span>-</span>
                <b>{{getTime(data.end_time)}}</b>
            </div>
            <div class="button">
                <button class="closed" v-if="getStatus() == 'closed'" @click="goContest()">已结束</button>
                <button class="pending" v-else-if="getStatus() == 'pending'">即将开始</button>
                <button class="entered" v-else-if="isEnter" @click="goContest()">开始做题</button>
                <button class="entering" v-else-if="getStatus() == 'entering'" @click="goContest()">参加比赛</button>
            </div>
        </div>
        <div class="countdown">
            <count-down v-if="getStatus() == 'pending'" :deadline="getTime(data.start_time)" end_text="开始"></count-down>
            <count-down v-else :deadline="getTime(data.end_time)" end_text="结束"></count-down>
        </div>
        <div class="description">
            <h2 class="des-title">比赛说明</h2>
            <div class="des-body">{{data.description}}</div>
        </div>
        <div class="mode">
            <div class="mode-title">模式说明<div style="width: 70%;border: 2px gray solid;margin: 0 auto"></div></div>
            <div class="contest-mode">
                本次比赛：
                <ContestType :type="data.type" :total_time="data.total_time"></ContestType>
            </div>
            <div class="mode-des">
                <p><b>ACM模式</b> 如果题目的一个测试点错误，则判整体都是错误</p>
                <p><b>普通模式</b> 按照测试点得分来计算</p>
                <p><b>不限时</b> 开始比赛后没有时间限制</p>
                <p><b>限时</b> 在选手开始答题为计时开始时间，比赛时间到即比赛结束</p>
            </div>
        </div>
        <div></div>
        <div style="clear: both"></div>
    </div>

</template>

<script>
import format from 'date-fns/format'
import Util from '@/util'
import CountDown from '@/components/index/contest/CountDown'
import ContestType from '@/components/common/ContestType'
export default {
    created() {
        this.getContest()
        this.getContestUserInfo()
    },
    data() {
        return {
            util: Util,
            data: {},
            isEnter: false,
            password: null
        }
    },
    methods: {
        goContest() {
            if (! this.isEnter) {
                if (! this.$store.state.userInfo.isLogin) {
                    this.$Message.warning('请先登入')
                    return
                }
                if (this.data.password) {
                    this.$Modal.confirm({
                        render: (h) => {
                            return h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    maxlength: 6,
                                    type: 'password',
                                    placeholder: '请输入密码'
                                },
                                on: {
                                    input: (val) => {
                                        this.password = val;
                                    }
                                },
                                
                            })
                        },
                        onOk: () => {
                            this.enterContest()
                        },
                    })
                } else {
                    this.enterContest()
                }
            } else {
                this.redirectToContest()
            }
        },
        enterContest() {
            this.$http.post('/user/contest/'+this.getCid+'/enter', {password: this.password}).then(res => {
                this.$Message.success(res.message)
                this.redirectToContest()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        redirectToContest() {
            this.$router.push('/contest/'+this.getCid+'/problems')
        },
        getContest() {
            this.$http.get('/contest/'+this.getCid).then(res => {
                this.data = res.data
            })
        },
        getTime(time) {
            return format(new Date(time), 'YYYY-MM-DD HH:mm:ss')
        },
        getContestUserInfo() {
            if (this.$store.state.userInfo.isLogin) {
                this.$http.get('/user/contest/'+this.getCid+'/data').then(res => {
                    this.isEnter = true
                }).catch(res => {
                    this.isEnter = false
                })
            }
        },
        getStatus() {
            let time = new Date().valueOf()
            if (time < this.data.start_time) {
                return 'pending'
            } else if (this.data.start_time < time && time < this.data.end_time) {
                return 'entering'
            } else {
                return 'closed'
            }
        },
    },
    computed: {
        getCid() {
            return this.$route.params.cid
        }
    },
    watch: {
        'getCid': function() {
            this.getContest()
            this.getContestUserInfo()
        },
        '$store.state.userInfo.isLogin': function () {
            this.getContestUserInfo()
        }
    },
    components: {
        CountDown,
        ContestType
    }
}
</script>

<style lang="stylus" scoped>
    @import 'ContestDetail.styl'
</style>


