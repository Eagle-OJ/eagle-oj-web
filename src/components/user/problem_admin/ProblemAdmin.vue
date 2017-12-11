<template>
    <div>
        <router-link to="/user_admin/problem/add">
            <Button icon="plus" type="ghost">添加题目</Button>
        </router-link>
        <Table style="margin-top: 10px" :columns="column" :data="data"></Table>
        <div style="margin-top: 10px; text-align: center">
            <Page :current="1" :total="page.page_count" :page-size="page.page_size" @on-change="getProblems" simple></Page>
        </div>
    </div>
</template>

<script>
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import cn from 'date-fns/locale/zh_cn'
export default {
    created() {
        this.getProblems(1)
    },
    data() {
        return {
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
                        if(status == 0) {
                            return '自用'
                        } else if (status == 1) {
                            return '审核中'
                        } else {
                            return '分享中'
                        }
                    }
                },
                {
                    title: '难度',
                    render: (h, params) => {
                        let difficult = params.row.difficult
                        if (difficult == 0) {
                            return '简单'
                        } else if (difficult == 1) {
                            return '中等'
                        } else if (difficult == 2) {
                            return '困难'
                        } else {
                            return '专家'
                        }
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
            page: {
                page_size: 5,
                page_count: 0
            }
        }
    },
    methods: {
        getProblems(page) {
            this.$http.get('/user/problem?page='+page+'&page_size='+this.page.page_size).then(res => {
                this.data = res.data.data
                this.page.page_count = res.data.page_count
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        getTime(time) {
            return distanceInWordsToNow(new Date(time), {locale: cn})
        },
    }
}
</script>

<style lang="stylus" scoped>

</style>


