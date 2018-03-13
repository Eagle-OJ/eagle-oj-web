<template>
    <div>
        <router-link to="/user_admin/problem/add">
            <Button icon="plus" type="ghost">添加题目</Button>
        </router-link>
        <Table style="margin-top: 10px" :loading="loading" :columns="column" :data="data"></Table>
        <div style="margin-top: 10px; text-align: center">
            <Page :current="1" :total="total" :page-size="pageSize" @on-change="getProblems" simple></Page>
        </div>
    </div>
</template>

<script>
import Util from '@/util'
import Difficult from '@/components/common/Difficult'
export default {
    created() {
        this.getProblems(1)
    },
    data() {
        return {
            loading: false,
            column: [
                {
                    title: '标题',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/problem/'+params.row.pid
                            }
                        }, params.row.title)
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        let status = params.row.status
                        let text = ''
                        if(status == 0) {
                            text = '自用'
                        } else if (status == 1) {
                            text = '审核中'
                        } else {
                            text = '分享中'
                        }
                        return h('div', {}, text)
                    }
                },
                {
                    title: '难度',
                    render: (h, params) => {
                        return h(Difficult, {
                            props: {
                                difficult: params.row.difficult
                            }
                        })
                    }
                },
                {
                    title: '创建时间',
                    render: (h, params) => {
                        return h('span', {
                        }, this.getTime(params.row.create_time))
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
                                    this.$router.push('/user_admin/problem/'+params.row.pid+'/edit')
                                }
                            }
                        }, '管理')
                    }
                }
            ],
            data: [],
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        getProblems(page) {
            this.loading = true
            this.$http.get('/problems/user', {
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
        getTime(time) {
            return Util.getDistanceTime(time)
        },
    }
}
</script>

<style lang="stylus" scoped>

</style>


