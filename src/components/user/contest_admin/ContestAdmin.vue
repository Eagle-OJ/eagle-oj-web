<template>
    <div class="contest">
        <div class="wrapper admin">
            <h2>管理比赛
                <router-link to="/user_admin/contest/add"><Button style="float:right" size="small" icon="plus" type="success">创建比赛</Button></router-link>
            </h2>
            <Table :columns="columns" :data="data"></Table>
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
                                style: {
                                    marginRight: '5px'
                                },
                                props: {
                                    color: 'blue'
                                }
                            }, this.getTimeType(params.row.type)),
                            h('Tag', {
                                props: {
                                    color: 'green'
                                }
                            }, this.getContestType(params.row.type))
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
                    }
                }
            ],
            data: [
                {
                    title: '大红鹰比赛',
                }
            ]
        }
    },
    methods: {
        getUserContests(page) {
            this.$http.get('/user/contest?page='+page+'&page_size=5').then(res => {
                this.data = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        getTimeType(type) {
            return util.getContestTimeType(type)
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


