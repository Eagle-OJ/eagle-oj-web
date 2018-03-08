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
        <Modal v-model="addProblemModal" title="添加题目" width="650" >
            <Input v-model="query" @on-enter="getCommonProblems(1)" placeholder="搜索关键词" style="width: 360px; margin-bottom: 10px"></Input>
            <Table :columns="problems.columns" :data="problems.data"></Table>
            <Page :page-size="problems.pageSize" :total="problems.total" @on-change="getCommonProblems" simple style="margin-top: 10px; text-align: center"></Page>
            <p slot="footer"></p>
        </Modal>
        <Modal v-model="editModal" title="编辑" >
            <div style="text-align:center">
                <span>题号 </span>
                <InputNumber style="margin-right: 10px" v-model="pid" :min="1" disabled></InputNumber>
                <span>显示题号 </span>
                <InputNumber style="margin-right: 10px" v-model="displayId" :min="1"></InputNumber>
                <span>分值 </span>
                <InputNumber v-model="score" :min="1" :max="100"></InputNumber>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="loading" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Difficult from '@/components/common/Difficult'
export default {
    props: ['cid'],
    created() {
        this.getProblems()
    },
    data() {
        return {
            loading: false,
            score: null,
            displayId: null,
            pid: null,
            addProblemModal: false,
            editModal: false,
            isEdit: false,
            query: '',
            data: [],
            columns: [
                {
                    title: '显示题号',
                    key: 'display_id',
                },
                {
                    title: '题目编号',
                    key: 'pid',
                },
                {
                    title: '标题',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/problem/'+params.row.pid
                            },
                            attrs: {
                                target: '_blank'
                            }
                        }, params.row.title)
                    }
                },
                {
                    title: '分值',
                    render: (h, params) => {
                        return h('Tag', {
                            props: {
                                color: 'green'
                            },
                        }, params.row.score)
                    },
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
                                        this.deleteProblem(params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            problems: {
                columns: [
                    {
                        title: '标题',
                        render: (h, params) => {
                            return h('router-link', {
                                props: {
                                    to: '/problem/'+params.row.pid,
                                },
                                attrs: {
                                    target: '_blank'
                                }
                            }, params.row.title)
                        }
                    },
                    {
                        title: '提交',
                        key: 'submit_times',
                        width: 60
                    },
                    {
                        title: '通过率',
                        render: (h, params) => {
                            if (params.row.submit_times == 0) {
                                return '0.00%'
                            } else {
                                return ((params.row.ac_times / params.row.submit_times)*100).toFixed(2)+'%'
                            }
                        },
                        width: 100
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
                        width: 100
                    },
                    {
                        title: '操作',
                        width: 80,
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'ghost',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.editModal = true
                                        this.pid = params.row.pid
                                        this.displayId = null
                                        this.score = null
                                        this.isEdit = false
                                    }
                                }
                            }, '添加')
                        }
                    }
                ],
                data: [],
                total: 0,
                pageSize: 5
            }
        }
    },
    methods: {
        getProblems() {
            this.$http.get('/contest/'+this.cid+"/problems")
            .then(res => {
                this.data = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        getCommonProblems(page) {
            this.$http.get('/problems/contest', {
                params: {
                    page: page,
                    page_size: this.problems.pageSize,
                    query: this.query
                }
            }).then(res => {
                this.problems.data = res.data.data
                this.problems.total = res.data.total
            })
        },
        showAddProblem() {
            this.addProblemModal = true
            this.getCommonProblems(1)
        },
        showEditProblem(index) {
            this.displayId = this.data[index].display_id
            this.pid = this.data[index].pid
            this.score = this.data[index].score
            this.editModal = true
            this.isEdit = true
        },
        save() {
            if (this.displayId == null) {
                this.$Message.warning('请输入显示题号')
                return
            }
            if (this.pid == null) {
                this.$Message.warning('请输入添加题目编号')
                return
            }
            if (this.score == null) {
                this.$Message.warning('请输入分值号')
                return
            }
            if(this.isEdit) {
                this.loading = true
                this.$http.put('/contest/'+this.cid+'/problem/'+this.pid, {
                    score: this.score,
                    display_id: this.displayId
                }).then(res => {
                    this.$Message.success(res.message)
                    this.getProblems()
                    this.editModal = false
                    this.loading = false
                }).catch(res => {
                    this.loading = false
                })
            } else {
                this.loading = true
                this.$http.post('/contest/'+this.cid+'/problem', {
                    pid: this.pid,
                    display_id: this.displayId,
                    score: this.score
                }).then(res => {
                    this.$Message.success(res.message)
                    this.getProblems()
                    this.editModal = false
                    this.loading = false
                }).catch(res => {
                    this.loading = false
                })
            }
        },
        deleteProblem(index) {
            let pid = this.data[index].pid
            let title = this.data[index].title
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>确认删除 <b>'+title+'</b> ？</p>',
                onOk: () => {
                    this.$http.delete('/contest/'+this.cid+'/problem/'+pid).then(res => {
                        this.$Message.success(res.message)
                        this.getProblems()
                    }).catch(res => {
                        this.$Message.error(res.message)
                    })
                }
            });
        },
    }
}
</script>

<style lang="stylus" scoped>
    .add
        margin-bottom 10px
</style>




