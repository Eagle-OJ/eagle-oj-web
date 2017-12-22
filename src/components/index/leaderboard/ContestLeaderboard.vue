<template>
    <div id="container">
        <div class="meta" v-if="meta">
            <span class="total">统计人数 <span class="num">{{meta.total}}人</span></span>
            <span class="time"><span class="num">{{getTime(meta.create_time)}}</span>更新</span>
        </div>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import DistanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import cn from 'date-fns/locale/zh_cn'
export default {
    created() {
        this.getRank()
    },
    data() {
        return {
            loading: false,
            columns: [
                {
                    title: '排名',
                    render: (h, params) => {
                        return params.index+1
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
                    key: 'score'
                },
                {
                    title: '总耗时',
                    render: (h, param) => {
                        return Math.ceil(param.row.used_time/1000/60)+'分钟'
                    }
                }
            ],
            data: [],
            meta: null
        }
    },
    methods: {
        getRank() {
            this.loading = true
            this.$http.get('/leaderboard/contest/'+this.getCid).then(res => {
                console.log(res)
                this.meta = res.data.splice(0, 1)[0]
                this.data = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.loading = false
            })
        },
        getTime(date) {
            return DistanceInWordsToNow(new Date(date), {
                addSuffix: true,
                locale: cn
            })
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


