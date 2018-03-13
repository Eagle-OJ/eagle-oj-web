<template>
    <div id="container">
        <div class="meta" v-if="meta">
            <router-link :to="{path: '/contest/'+getCid+'/problems'}" style="float: left">
                <Button size="small" icon="arrow-left-c" type="info">返回比赛</Button>
            </router-link>
            <span class="total">统计人数 <span class="num">{{meta.total}}人</span></span>
            <span class="time"><span class="num">{{getTime(meta.create_time)}}</span>更新</span>
        </div>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import Util from '@/util'
import ContestUserDetail from './ContestUserDetail'
export default {
    created() {
        this.getRank()
    },
    data() {
        return {
            loading: false,
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(ContestUserDetail, {
                            props: {
                                cid: this.getCid,
                                uid: params.row.uid,
                            }
                        })
                    }
                },
                {
                    title: '排名',
                    render: (h, params) => {
                        return h('div', {}, params.index+1)
                    }
                },
                {
                    title: '昵称',
                    render: (h, param) => {
                        return h('router-link', {
                            props: {
                                to: '/profile/'+param.row.uid
                            }
                        }, param.row.nickname)
                    }
                },
                {
                    title: '分数',
                    key: 'total_score'
                },
                {
                    title: '完成题数',
                    key: 'finished_problems'
                },
                {
                    title: '提交',
                    key: 'submit_times'
                },
                {
                    title: 'AC',
                    key: 'ac_times'
                },
                {
                    title: '耗时',
                    render: (h, params) => {
                        return h('div', {}, this.getParsedTime(params.row.total_used_time))
                    }
                },
            ],
            data: [],
            meta: null
        }
    },
    methods: {
        getRank() {
            this.loading = true
            this.$http.get('/leaderboard/contest', {
                params: {
                    cid: this.getCid
                }
            }).then(res => {
                this.meta = res.data.splice(0, 1)[0]
                if(this.meta.is_acm) {
                    this.columns.push({
                        title: '罚时',
                        render: (h, params) => {
                            return h('div', {}, this.getParsedTime(params.row.penalty_time))
                        }
                    })
                    this.columns.push({
                        title: '总耗时',
                        render: (h, params) => {
                            return h('div', {}, this.getParsedTime(params.row.penalty_time + params.row.total_used_time))
                        }  
                    })  
                }
                this.data = res.data
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        getTime(time) {
            return Util.getDistanceTime(time)
        },
        getParsedTime(time) {
            if(time == 0) {
                return '无'
            }
            return Math.ceil(time/1000/60)+'分钟'
        }
    },
    computed: {
        getCid: function() {
            return this.$route.params.cid
        }
    }
}
</script>

<style lang="stylus" scoped>
    #container
        position relative
        .meta
            text-align center
            padding 10px
            font-size 15px
            .time
                float right 
                color #80848f
            .num
                font-weight bold
                margin-right 10px
</style>


