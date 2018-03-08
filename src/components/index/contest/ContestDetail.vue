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
                <Button type="info" v-if="getStatus() == 'closed' && isEnter" @click="goContest()">查看结果</Button>
                <Button disabled v-else-if="getStatus() == 'closed' && ! isEnter">已结束</Button>
                <Button type="primary" v-else-if="getStatus() == 'pending'">即将开始</Button>
                <Button type="success" v-else-if="isEnter" @click="goContest()">开始做题</Button>
                <Button v-else-if="getStatus() == 'entering'" @click="goContest()">参加比赛</Button>
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
                <p><b>OI模式</b> 按照测试点得分来计算</p>
                <p><b>ACM模式</b> 如果题目的一个测试点错误，则判整体都是错误</p>
                <p><b>不限时</b> 开始比赛后没有时间限制</p>
                <p><b>限时</b> 在选手加入比赛为计时开始时间，比赛时间到即比赛结束</p>
            </div>
        </div>
        <div></div>
        <div style="clear: both"></div>
    </div>

</template>

<script>
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
            this.$http.post('/contest/'+this.getCid+'/enter', {password: this.password}).then(res => {
                this.$Message.success(res.message)
                this.redirectToContest()
            })
        },
        redirectToContest() {
            this.$router.push('/contest/'+this.getCid+'/problems')
        },
        getContest() {
            this.$http.get('/contest/'+this.getCid+'/info').then(res => {
                this.data = res.data
            })
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:mm:ss')
        },
        getContestUserInfo() {
            if (this.$store.state.userInfo.isLogin) {
                this.$http.get('/contest/'+this.getCid+'/user_data').then(res => {
                    if(res.data) {
                        this.isEnter = true
                    } else {
                        this.isEnter = false
                    }
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


