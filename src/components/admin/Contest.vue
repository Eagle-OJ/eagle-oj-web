<template>
    <div class="contest">
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" simple @on-change="getData" style="margin-top: 10px;text-align: center"></Page>
    </div>
</template>

<script>
import ContestType from '@/components/common/ContestType'
import ContestStatus from '@/components/common/ContestStatus'
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
                    title: '名称',
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
                        return h(ContestType, {
                            props: {
                                type: params.row.type,
                                total_time: params.row.total_time
                            }
                        })
                    }
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        return h(ContestStatus, {
                            props: {
                                status: params.row.status
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                on: {
                                    click: () => {
                                        this.$router.push('/user_admin/contest/'+params.row.cid+'/edit')
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
            this.$http.get('/contests/all', {
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
            let cid = this.data[index].cid
            let name = this.data[index].name
            this.$Modal.confirm({
                title: '是否删除',
                content: '<p>是否删除<b>'+name+'</b>?</p>',
                onOk: () => {
                    this.$http.delete('/contest/'+cid).then(res => {
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
