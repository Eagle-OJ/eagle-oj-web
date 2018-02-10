<template>
    <div class="problem">
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" simple @on-change="getData" style="margin-top: 10px;text-align: center"></Page>
    </div>
</template>

<script>
import Difficult from '@/components/common/Difficult'
export default {
    created() {
        this.getData(1)
    },
    data() {
        return {
            total: 0,
            pageSize: 10,
            data: [],
            columns: [
                {
                    title: '标题',
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
                    }
                },
                {
                    title: '状态',
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
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                on: {
                                    click: () => {
                                        this.$router.push('/user_admin/problem/'+params.row.pid+'/edit')
                                    }
                                },
                                style: {
                                    marginRight: '10px'
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
        }
    },
    methods: {
        getData(page) {
            this.$http.get('/problems', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
            })
        },
        delete(index) {
            let pid = this.data[index].pid
            let title = this.data[index].title
            this.$Modal.confirm({
                title: '是否删除',
                content: '<p>是否删除<b>'+title+'</b>?</p>',
                onOk: () => {
                    this.$http.delete('/problem/'+pid).then(res => {
                        this.$Message.success(res.message)
                        this.getData(1)
                    })
                },
            });
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
