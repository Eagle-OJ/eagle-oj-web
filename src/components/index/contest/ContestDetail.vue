<template>
    <div id="container">
        <div class="first">
            <div class="contest-title">世界ACM公开赛</div>
            <div style="width: 100%;border: 2px #ddd solid"></div>
            <div class="slogan">
                {{data.slogan}}
            </div>
            <div class="start_time">
                比赛开始时间：{{getTime(data.start_time)}}
            </div>
            <div style="margin: 0 auto;width: 160px;margin-top: 60px">
                <button v-if="data.status!=1" class="join-btn" style="background: #ed3f14">比赛结束<br>End</button>
                <button v-else-if="isEnter" class="join-btn" @click="goContest()">开始做题<br>Begin</button>
                <button v-else class="join-btn" @click="goContest()">参加比赛<br>Sign up</button>
            </div>
        </div>
        <div class="countdown"><count-down :deadline="getStandardTime(data.end_time)"></count-down></div>
        <div class="description">
            <div class="des-title">比赛说明<div style="width: 70%;border: 2px gray solid;margin: 0 auto"></div></div>
            <div class="des-body">{{data.description}}</div>
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
    import util from '@/util'
    import CountDown from '@/components/index/contest/CountDown'
    export default {
        created() {
            this.getContest()
            this.getContestUserInfo()
        },
        data() {
            return {
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
                    }
                } else {
                    this.$router.push('/contest/1/problems')
                }
            },
            enterContest() {
                this.$http.post('/user/contest/'+this.getCid+'/enter', {password: this.password}).then(res => {
                    this.$Message.success(res.message)
                    this.$router.push('/contest/1/problems')
                }).catch(res => {
                    this.$Message.error(res.message)
                })
            },
            getContest() {
                this.$http.get('/contest/'+this.getCid).then(res => {
                    this.data = res.data
                })
            },
            getTime(time) {
                return util.getFormatTime(time)
            },
            getStandardTime(time) {
                return util.getStandardTime(time)
            },
            getContestUserInfo() {
                if (this.$store.state.userInfo.isLogin) {
                    this.$http.get('contest/'+this.getCid+'/user/'+this.$store.state.userInfo.uid).then(res => {
                        if (res.data) {
                            this.isEnter = true
                        }
                    }).catch(res => {
                        this.$Message.error(res.message)
                    })
                }
            }
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
            '$store.userInfo.isLogin': function () {
                this.getContestUserInfo()
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
                font-size 16px
                text-align center
                margin 0 auto 10px auto
            .start_time
                width 300px
                margin 0 auto
                text-align center
                font-size 16px
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


