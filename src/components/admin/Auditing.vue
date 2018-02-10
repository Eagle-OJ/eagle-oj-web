<template>
    <div class="auditing">
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import Difficult from '@/components/common/Difficult'
export default {
    created() {
        this.getProblems(1)
    },
    data() {
        return {
            columns: [
                {
                    title: 'id',
                    key: 'pid',
                    width: 50
                },
                {
                    title: '名称',
                    key: 'title',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/problem/'+params.row.pid
                            }
                        }, params.row.title)
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
                    },
                    width: 130
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.auditing(params.row.pid, true)
                                    }
                                }
                            }, '通过'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.auditing(params.row.pid, false)
                                    }
                                }
                            }, '不通过')
                        ])
                    }
                }
            ],
            total: 0,
            data: [],
            pageSize: 10
        }
    },
    methods: {
        getProblems(page) {
            this.$http.get('/problems/auditing', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.total = res.data.total
                this.data = res.data.data
            })
        },
        auditing(pid, isAccepted) {
            this.$http.post('/problem/'+pid+'/auditing', {
                is_accepted: isAccepted
            }).then(res => {
                this.$Message.success(res.message)
                this.getProblems(1)
            })
        },
    }
}
</script>


<style lang="stylus" scoped>

</style>
