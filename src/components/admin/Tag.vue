<template>
    <div class="tag">
        <div class="btn">
            <Button type="info" @click="addTag">添加标签</Button>
        </div>
        <Table :data="data" :columns="columns"></Table>
    </div>
</template>

<script>
export default {
    created() {
        this.getData()
    },
    data() {
        return {
            loading: false,
            name: '',
            data: [],
            columns: [
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '使用次数',
                    key: 'used'
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updateTag(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                    click: () => {
                                        this.deleteTag(params.row.tid)
                                    }
                                }
                            }, '删除'),
                        ])
                    }
                }
            ],
        }
    },
    methods: {
        addTag() {
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.name,
                            autofocus: true,
                            maxlength: 20,
                            placeholder: '输入标签名'
                        },
                        on: {
                            input: (val) => {
                                this.name = val;
                            }
                        }
                    })
                },
                onOk: () => {
                    this.$http.post('/tag', {
                        name: this.name
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.getData()
                    })
                }
            })
        },
        getData() {
            this.$http.get('/tags').then(res => {
                this.data = res.data
            })
        },
        deleteTag(tid) {
            this.$Modal.confirm({
                title: '删除标签',
                content: '<p>如果该标签被使用则无法删除</p>',
                onOk: () => {
                    this.$http.delete('/tag/'+tid).then(res => {
                        this.$Message.success(res.message)
                        this.getData()
                    })
                },
            })
        },
        updateTag(index) {
            let tid = this.data[index].tid
            let name = this.data[index].name
            this.name = name
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.name,
                            autofocus: true,
                            maxlength: 20,
                            placeholder: '输入标签名'
                        },
                        on: {
                            input: (val) => {
                                this.name = val;
                            }
                        }
                    })
                },
                onOk: () => {
                    this.$http.put('/tag/'+tid, {
                        name: this.name
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.getData()
                    })
                },
                okText: '更新'
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .btn
        text-align right
        margin-bottom 10px
</style>



