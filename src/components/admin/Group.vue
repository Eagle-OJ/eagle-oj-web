<template>
    <div class="group">
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" simple @on-change="getData" style="margin-top: 10px;text-align: center"></Page>
    </div>
</template>

<script>
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
                                to: '/group/'+params.row.gid
                            }
                        }, params.row.name)
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                on: {
                                    click: () => {
                                        this.$router.push('/user_admin/group/'+params.row.gid+'/edit')
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
            this.$http.get('/groups', {
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
            let gid = this.data[index].gid
            let name = this.data[index].name
            this.$Modal.confirm({
                title: '是否删除',
                content: '<p>是否删除<b>'+name+'</b>?</p>',
                onOk: () => {
                    this.$http.delete('/group/'+gid).then(res => {
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
