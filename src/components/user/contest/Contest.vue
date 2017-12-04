<template>
    <div class="contest">
        <div class="wrapper admin">
            <h2>管理比赛
                <router-link to="/user_admin/contest/add"><Button style="float:right" size="small" icon="plus" type="success">创建比赛</Button></router-link>
            </h2>
            <Table :columns="admin.column" :data="admin.data"></Table>
        </div>
        <div class="wrapper join">
            <h2>比赛加入</h2>
            <Table :columns="user.columns" :data="user.data"></Table>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getUserContests(1)
    },
    data() {
        return {
            admin: {
                column: [
                    {
                        title: '比赛名称',
                        key: 'name'
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
            },
            user: {
                columns: [
                    {
                        title: '比赛名称',
                        key: 'title'
                    },
                ],
                data: [
                    {
                        title: 'xxx'
                    }
                ]
            }
        }
    },
    methods: {
        getUserContests(page) {
            this.$http.get('/user/contest?page='+page+'&page_size=5').then(res => {
                this.admin.data = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        getTimeType(type) {
            if (type == 1 || type == 4) {
                return '限时'
            } else {
                return '不限时'
            }
        },
        getContestType(type) {
            if (type == 0 || type == 3) {
                return '普通比赛'
            } else {
                return 'ACM比赛'
            }
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


