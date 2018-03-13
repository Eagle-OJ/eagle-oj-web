<template>
    <div class="contest">
        <div class="wrapper admin">
            <router-link to="/user_admin/contest/add">
                <Button icon="plus" type="ghost">创建比赛</Button>
            </router-link>
            <Table style="margin-top: 10px" :loading="loading" :columns="columns" :data="data"></Table>
            <div class="pager" style="text-align: center; margin-top: 10px">
                <Page :total="total" :page-size="pageSize" show-total @on-change="getUserContests" simple></Page>
            </div>
        </div>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.getUserContests(1)
    },
    data() {
        return {
            loading: false,
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
                    title: '模式',
                    render: (h, params) => {
                        return h('div', [
                            h('Tag', {
                                props: {
                                    color: 'green'
                                }
                            }, this.getContestType(params.row.type)),
                            h('Tag', {
                                style: {
                                    marginRight: '5px'
                                },
                                props: {
                                    color: 'blue'
                                }
                            }, this.getTimeType(params.row.type, params.row.total_time)),
                        ])
                    }
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        let status  = params.row.status
                        let text = ''
                        if (status == 0) {
                            text = '编辑中'
                        } else if (status == 1) {
                            text = '启用中'
                        } else {
                            text = '已关闭'
                        }
                        return h('div', {}, text)
                    },
                    width: 100
                },
                {
                    title: '创建时间',
                    render: (h, params) => {
                        return h('div', {}, this.getTime(params.row.create_time))
                    }
                },
                {
                    title: '操作',
                    key: 'handle',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'ghost',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.$router.push('/user_admin/contest/'+params.row.cid+'/edit')
                                }
                            }
                        }, '管理')
                    },
                    width: 100
                }
            ],
            data: [],
            total: 0,
            pageSize: 10
        }
    },
    methods: {
        getUserContests(page) {
            this.loading = true
            this.$http.get('/contests/user', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        getTimeType(type, totalTime) {
            return Util.getContestTimeType(type, totalTime)
        },
        getContestType(type) {
            return Util.getContestType(type)
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:MM')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .contest
        .wrapper
            h2
                font-weight 500
                color #80848f
                border-bottom 1px solid #e9eaec
                margin-bottom 5px
                padding 3px 0
            &.admin
                margin-bottom 30px
                h2
                    a
                        margin-top -1px
</style>


