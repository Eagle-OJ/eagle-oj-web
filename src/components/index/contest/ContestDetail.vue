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
        <Card shadow class="countdown">
            <count-down v-if="getStatus() == 'pending'" :deadline="getTime(data.start_time)" end_text="开始"></count-down>
            <count-down v-else :deadline="getTime(data.end_time)" end_text="结束"></count-down>
        </Card>
        <Card shadow class="info">
            <div class="description">
                <h3>比赛说明</h3>
                <p>{{data.description}}</p>
            </div>
            <div class="mode">
                <h3>比赛模式
                    <router-link to="/helper#contest-mode">
                        <Icon type="help-circled"></Icon>
                    </router-link>
                </h3>
                <p>
                    <ContestType :type="data.type" :total_time="data.total_time"></ContestType>
                </p>
            </div>
        </Card>
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


