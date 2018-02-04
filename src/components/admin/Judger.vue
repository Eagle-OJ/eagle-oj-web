<template>
    <div class="judger">
        <div class="tool">
            <Button type="primary" @click="add">添加</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal title="判卷机编辑" v-model="modal" class="modal">
            <Row class="each">
                <Col span="5">
                    判卷地址
                </Col>
                <Col span="19">
                    <Input v-model="url">
                        <span slot="prepend">http://</span>
                    </Input>
                </Col>
            </Row>
            <Row class="each">
                <Col span="5">
                    端口
                </Col>
                <Col span="19">
                    <InputNumber :min="1" v-model="port"></InputNumber>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    created() {
        this.getData()
    },
    data() {
        return {
            modal: false,
            isEdit: false,
            url: '',
            port: 0,
            jid: 0,
            data: [],
            columns: [
                {
                    title: 'ID',
                    key: 'jid'
                },
                {
                    title: '判卷机地址',
                    key: 'url'
                },
                {
                    title: '端口',
                    key: 'port'
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'ghost',
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.update(params.index)
                                    }
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
            ]
        }
    },
    methods: {
        getData() {
            this.$http.get('/judger').then(res => {
                this.data = res.data
            })
        },
        add() {
            this.isEdit = false
            this.modal = true
        },
        delete(index) {
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>确认删除此判卷机</p>',
                onOk: () => {
                    this.$http.delete('/judger/'+this.data[index].jid).then(res => {
                        this.$Message.success(res.message)
                        this.getData()
                    })
                },
            })
        },
        update(index) {
            this.isEdit = true
            this.url = this.data[index].url
            this.port = this.data[index].port
            this.jid = this.data[index].jid
            this.modal = true
        },
        save() {
            if(this.url.length == 0) {
                this.$Message.warning('判卷地址不得为空')
                return
            }

            if(this.port <= 0) {
                this.$Message.warning('端口号非法')
                return
            }

            if(this.isEdit) {
                this.$http.put('/judger/'+this.jid, {
                    url: this.url,
                    port: this.port
                }).then(res => {
                    this.$Message.success(res.message)
                    this.modal = false
                    this.getData()
                })
            } else {
                this.$http.post('/judger', {
                    url: this.url,
                    port: this.port
                }).then(res => {
                    this.$Message.success(res.message)
                    this.modal = false
                    this.getData()
                }).catch(res => {
                    this.$Message.error(res.message)
                })
            }
        },
    }
}
</script>

<style lang="stylus" scoped>
    .tool
        text-align right
        margin-bottom 10px
    .modal
        .each
            margin-bottom 10px
            line-height 30px
</style>


