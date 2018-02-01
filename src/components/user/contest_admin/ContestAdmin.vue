<template>
    <div class="contest">
        <div class="wrapper admin">
            <h2>管理比赛
                <router-link to="/user_admin/contest/add"><Button style="float:right" size="small" icon="plus" type="success">创建比赛</Button></router-link>
            </h2>
            <Table :loading="loading" :columns="columns" :data="data"></Table>
            <div class="pager" style="text-align: center; margin-top: 10px">
                <Page :total="total" :page-size="pageSize" show-total @on-change="getUserContests" simple></Page>
            </div>
        </div>
    </div>
</template>

<script>
import util from '@/util'
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
                    title: '类型',
                    render: (h, params) => {
                        if(params.row.group > 0) {
                            return '小组赛'
                        } else {
                            return '普通'
                        }
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
                        if (status == 0) {
                            return '编辑中'
                        } else if (status == 1) {
                            return '启用中'
                        } else {
                            return '已关闭'
                        }
                    },
                    width: 100
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
            this.$http.get('/contests/user?page='+page+'&page_size='+this.pageSize).then(res => {
                this.data = res.data.data
                this.total = res.data.total
            }).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.loading = false
            })
        },
        getTimeType(type, totalTime) {
            return util.getContestTimeType(type, totalTime)
        },
        getContestType(type) {
            return util.getContestType(type)
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


