<template>
    <div class="contest">
        <Table :loading="loading" :columns="columns" :data="contests"></Table>
        <Page style="text-align:center; margin-top:10px" :current="1" :total="total" simple @on-change="getContests"></Page>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.getContests(1)
    },
    data() {
        return {
            loading: false,
            contests: [],
            columns: [
                {
                    title: '比赛名称',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/contest/'+params.row.cid
                            }
                        }, params.row.name)
                    }
                },
                {
                    title: '提交次数',
                    key: 'submit_times'
                },
                {
                    title: 'AC',
                    key: 'ac_times'
                },
                {
                    title: '加入时间',
                    render: (h, params) => {
                        return this.getTime(params.row.join_time)
                    }
                }
            ],
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        getContests(page) {
            this.loading = true
            this.$http.get('/user/contests', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.total = res.data.total
                this.contests = res.data.data
            }).finally(() => {
                this.loading = false
            })
        },
        getTime(time) {
            return Util.getDistanceTime(time)
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>

