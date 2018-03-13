<template>
    <div class="group">
        <router-link to="/user_admin/group/add">
            <Button icon="plus" type="ghost">创建小组</Button>
        </router-link>
        <Table style="margin-top: 10px" :loading="loading" :columns="column" :data="data"></Table>
        <div style="text-align:center;margin-top: 15px">
            <Page :current="1" :total="total" :page-size="pageSize" @on-change="getOwnGroup" simple></Page>
        </div>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.getOwnGroup(1)
    },
    data() {
        return {
            loading: false,
            pageSize: 10,
            column: [
                {
                    title: '小组名称',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/group/'+params.row.gid
                            }
                        }, params.row.name)
                    }
                },
                {
                    title: '邀请码',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                background: '#19be6b',
                                color: '#fff',
                                borderRadius: '3px',
                                padding: '2px 5px'
                            }
                        }, this.getSecret(params.row.gid, params.row.password))
                    }
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
                                    this.$router.push('/user_admin/group/'+params.row.gid+'/edit')
                                }
                            }
                        }, '管理')
                    }
                }
            ],
            data: [],
            total: 0
        }
    },
    methods: {
        getOwnGroup(page) {
            this.loading = true
            this.$http.get('/groups/user', {
                params: {
                    page: page,
                    page_size: this.pageSize,
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        getSecret(gid, password) {
            if (password == undefined) {
                return gid+'-'+'000000'
            } else {
                return gid+'-'+password
            }
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:MM')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .group
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


