<template>
    <div class="announcement">
        <div class="tool">
            <Button @click="add">添加公告</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal v-model="isShowModal" title="公告编辑">
            <p style="margin-bottom: 10px"><Input v-model="title" placeholder="标题，最多50字" :maxlength="50"></Input></p>
            <p><Input v-model="content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="最多500字" :maxlength="500"></Input></p>
            <div slot="footer">
                <Button @click="save()" type="primary">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.get()
    },
    data() {
        return {
            isShowModal: false,
            isEdit: false,
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h('div', {}, params.row.content)
                    }
                },
                {
                    title: 'ID',
                    key: 'aid'
                },
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '发布日期',
                    render: (h, params) => {
                        return h('div', {}, this.getTime(params.row.create_time))
                    }
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
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
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
            data: [],
            title: '',
            content: '',
            aid: 0
        }
    },
    methods: {
        get() {
            this.$http.get('/announcements').then(res => {
                this.data = res.data
            })
        },
        add() {
            this.isShowModal = true
            this.isEdit = false
        },
        edit(index) {
            this.isShowModal = true
            this.isEdit = true
            this.title = this.data[index].title
            this.content = this.data[index].content
            this.aid = this.data[index].aid
        },
        delete(index) {
            let title = this.data[index].title
            let aid = this.data[index].aid
            let _this = this
            this.$Modal.confirm({
                title: '删除警告',
                content: '确认删除<b>'+title+'</b>?',
                onOk: function() {
                    this.$http.delete('/announcement/'+aid).then(res => {
                        this.$Message.success(res.message)
                        _this.get()
                    })
                }
            })
        },
        save() {
            if(this.title.length == 0 || this.title.length > 50) {
                this.$Message.warning('标题格式不符')
                this.resetLoading()
                return
            }

            if(this.content.length == 0 || this.content.length > 500) {
                this.$Message.warning('内容格式不符')
                return
            }

            if(this.isEdit) {
                this.$http.put('/announcement/'+this.aid, {title: this.title, content: this.content}).then(res => {
                    this.$Message.success(res.message)
                    this.get()
                    this.reset()
                    this.isShowModal = false
                })
            } else {
                this.$http.post('/announcement', {title: this.title, content: this.content}).then(res => {
                    this.$Message.success(res.message)
                    this.get()
                    this.reset()
                    this.isShowModal = false
                })
            }
        },
        reset() {
            this.title = ''
            this.content = ''
            this.aid = 0
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:mm:ss')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .tool
        text-align: right
        margin-bottom 10px
</style>


