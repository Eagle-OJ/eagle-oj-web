<template>
    <div class="detail">
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    props: ['cid', 'uid'],
    created() {
        this.getData()
    },
    data() {
        return {
            columns: [
                {
                    title: '题号',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/contest/'+this.cid+'/problem/'+params.row.pid
                            }
                        }, params.row.display_id)
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        return h('div', {}, this.getStatus(params.row.status))
                    }
                },
                {
                    title: '分数',
                    key: 'score'
                },
                {
                    title: '错误次数',
                    key: 'wrong_times'
                },
                {
                    title: '用时',
                    render: (h, params) => {
                        return h('div', {}, this.getParsedTime(params.row.used_time))
                    }
                },
                {
                    title: '解出时间',
                    render: (h, params) => {
                        return h('div', {}, this.getTime(params.row.solved_time))
                    }
                }
            ],
            data: []
        }
    },
    methods: {
        getData() {
            this.$http.get('/leaderboard/user', {
                params: {
                    cid: this.cid,
                    uid: this.uid
                }
            }).then(res => {
                let data = res.data
                for(let i=0; i<data.length; i++) {
                    let temp = data[i]
                    temp.cellClassName = {
                        status: temp.status
                    }
                }
                this.data = res.data
            })
        },
        getTime(time) {
            if(time == 0) {
                return '无'
            }
            return Util.getDistanceTime(time)
        },
        getParsedTime(time) {
            if(time == 0) {
                return '无'
            }
            return Math.ceil(time/1000/60)+'分钟'
        },
        getStatus(status) {
            return Util.convertProblemStatus(status)
        }
    }
}
</script>


<style lang="stylus">
    .detail
        .ivu-table
            .AC
                background #4bc0c0
                color #fff
            .WA
                background #ff6384
                color #fff
            .RTE
                background #ffcd56
                color #fff
            .TLE
                background #36a2eb
                color #fff
            .CE
                background #ff9f40
                color #fff
            .SE
                background #ed3f14
                color #fff
</style>


