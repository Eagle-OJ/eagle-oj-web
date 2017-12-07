<template>
    <div class="group">
        <div class="wrapper admin">
            <h2>管理小组
                <router-link to="/user_admin/group/add"><Button style="float:right" size="small" icon="plus" type="success">创建小组</Button></router-link>
            </h2>
            <Table :columns="admin.column" :data="admin.data"></Table>
            <div style="text-align:center;margin-top: 15px">
                <Page :current="admin.page" :total="admin.total" :page-size="5" @on-change="getOwnGroup" simple></Page>
            </div>
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
        this.getOwnGroup(1)
    },
    data() {
        return {
            admin: {
                column: [
                    {
                        title: '小组名称',
                        key: 'name'
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
                                        this.$router.push('/user_admin/group/'+params.row.gid+'/edit')
                                    }
                                }
                            }, '管理')
                        }
                    }
                ],
                data: [
                    {
                        name: '大红鹰战队',
                    }
                ],
                total: 0
            },
            user: {
                columns: [
                    {
                        title: '小组名称',
                        key: 'name'
                    },
                ],
                data: [
                    {
                        name: 'xxx'
                    }
                ]
            }
        }
    },
    methods: {
        getOwnGroup(page) {
            this.$http.get('/user/group?page='+page+'&page_size=5').then(res => {
                this.admin.data = res.data.data
                this.admin.total = res.data.total
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .group
        .wrapper
            h2
                font-weight 500
                color #80848f
                border-bottom 1px solid #e9eaec
                margin-bottom 5px
                padding 3px 0
            &.admin
                margin-bottom 20px
                h2
                    a
                        margin-top -1px
</style>


