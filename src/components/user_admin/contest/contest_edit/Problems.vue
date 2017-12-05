<template>
    <div class="problems">
        <Alert show-icon>
            加题事项
            <template slot="desc">输入题目编号即可添加。注意：只能添加已公开的题目或者自己创建的题目，ACM模式下面的分值无效。</template>
        </Alert>
        <div class="add" style="text-align:right">
            <Button type="primary" @click="showAddProblem()">添加题目</Button>
        </div>
        <Card>
            <p slot="title">已添加题目</p>
            <Table :columns="columns" :data="data"></Table>
        </Card>
        <Modal v-model="modal" width="360" title="添加题目">
            <div style="text-align:center">
                <span>题号 </span>
                <InputNumber style="margin-right: 10px" v-model="pid" :min="1"></InputNumber>
                <span>分值 </span>
                <InputNumber v-model="score" :min="1"></InputNumber>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="loading" @click="addProblem">添加题目</Button>
            </div>
        </Modal>
        <Modal v-model="editModal" width="20" title="修改分值" >
            <div style="text-align:center">
                <span>题号 </span>
                <InputNumber style="margin-right: 10px" v-model="pid" :min="1" disabled></InputNumber>
                <span>分值 </span>
                <InputNumber v-model="score" :min="1"></InputNumber>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="loading" @click="doEditProblem">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: ['cid'],
    created() {
        this.getProblems()
    },
    data() {
        return {
            loading: false,
            score: 1,
            pid: null,
            modal: false,
            editModal: false,
            data: [],
            columns: [
                {
                    title: '编号',
                    key: 'pid'
                },
                {
                    title: '名称',
                    key: 'title'
                },
                {
                    title: '分值',
                    render: (h, params) => {
                        return h('Tag', {
                            props: {
                                color: 'green'
                            }
                        }, params.row.score)
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
                                        this.showEditProblem(params.index)
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
                                        this.deleteProblem(params.row.title, params.row.pid)
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
        showAddProblem() {
            this.resetInput()
            this.modal = true
        },
        addProblem() {
            if (this.pid == null) {
                this.$Message.warning('请输入题目编号')
                return
            }
            this.loading = true
            this.$http.post('/user/contest/'+this.cid+"/problem", {
                pid: this.pid,
                score: this.score
            }).then(res => {
                this.$Message.success(res.message)
                this.resetInput()
                this.getProblems()
                this.modal = false
            }).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.loading = false
            })
        },
        getProblems() {
            this.$http.get('/user/contest/'+this.cid+"/problem").then(res => {
                this.data = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        showEditProblem(index) {
            this.resetInput()
            this.pid = this.data[index].pid
            this.score = this.data[index].score
            this.editModal = true
        },
        doEditProblem() {
            this.$http.put('/user/contest/'+this.cid+'/problem/'+this.pid, {score: this.score}).then(res => {
                this.$Message.success(res.message)
                this.getProblems()
            }).catch(res => {
                this.$Message.error(res.message)
            })
            this.editModal = false
        },
        deleteProblem(title, pid) {
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>确认删除['+title+']？</p>',
                onOk: () => {
                    this.doDeleteProblem(pid)
                }
            });
        },
        doDeleteProblem(pid) {
            this.$http.delete('/user/contest/'+this.cid+'/problem/'+pid).then(res => {
                this.$Message.success(res.message)
                this.getProblems()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        resetInput() {
            this.score = 1
            this.pid = null
        }
    }
}
</script>

<style lang="stylus" scoped>
    .add
        margin-bottom 10px
</style>




