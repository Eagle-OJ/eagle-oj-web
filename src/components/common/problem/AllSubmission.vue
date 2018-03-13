<template>
    <div class="all-submissions">
        <p class="refresh">
            <Button @click="getData(1)" type="primary" icon="refresh" shape="circle">刷新</Button>
        </p>
        <div class="no" v-if="data == null">
            只有你解出这道题或者是管理才能查看他人解答
        </div>
        <div class="yes" v-else>
            <Table :loading="loading" :data="data" :columns="columns"></Table>
            <Page :total="total" :page-size="pageSize" @on-change="getData" simple style="text-align: center; margin-top: 10px"></Page>
        </div>
    </div>
</template>

<script>
import ProblemResult from '@/components/common/ProblemResult'
import Util from '@/util'
export default {
    props: ['cid', 'pid'],
    created() {
        this.getData(1)
    },
    data() {
        return {
            columns: [
                {
                    title: '作者',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/profile/'+params.row.owner
                            }
                        }, params.row.nickname)
                    }
                },
                {
                    title: '编程语言',
                    render: (h, params) => {
                        return h('div', {}, this.$getLang(params.row.lang))
                    }
                },
                {
                    title: '时间',
                    render: (h, params) => {
                        return h('div', {}, params.row.time+' S')
                    }
                },
                {
                    title: '内存',
                    render: (h, params) => {
                        return h('div', {}, params.row.memory+ ' MB')
                    }
                },
                {
                    title: '结果',
                    render: (h, params) => {
                        return h(ProblemResult, {
                            props: {
                                result: params.row.status
                            }
                        })
                    }
                },
                {
                    title: '提交时间',
                    render: (h, params) => {
                        return h('div', {}, this.parseTime(params.row.submit_time))
                    },
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                size: 'small',
                                type: 'ghost',
                            },
                            on: {
                                click: () => {
                                    this.seeCode(params.row.url)
                                }
                            },
                        }, '查看源码')
                    }
                }
            ],
            data: [],
            pageSize: 5,
            total: 0,
            loading: false
        }
    },
    methods: {
        getData(page) {
            this.loading = true
            this.$http.get('/submissions/all', {
                params: {
                    pid: this.pid,
                    cid: this.cid,
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                if (res.data) {
                    this.data = res.data.data
                    this.total = res.data.total
                } else {
                    this.data = null
                }
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        parseTime(time) {
            return Util.getDistanceTime(time)
        },
        seeCode(url) {
            if(this.$store.state.setting.is_open_storage && url) {
                window.open(this.$getUrl(url))
            } else {
                this.$Message.warning('此代码没有储存，无法查看')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .all-submissions
        .refresh
            text-align right
            margin-bottom 10px
        .no
            color #ccc
            text-align center
            padding 2rem 0
            font-size 1rem
</style>


