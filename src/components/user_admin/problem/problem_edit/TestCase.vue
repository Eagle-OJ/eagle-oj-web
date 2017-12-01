<template>
    <div class="test_case">
        <div class="header">
            <Button icon="plus" type="success" @click="addTestCase">添加测试用例</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal class="modal" v-model="showAddModal" title="添加测试用例" @on-ok="doAddTestCase()">
            <div class="each-line">
                <label for="input">输入</label>
                <Input id="input" v-model="test_case.stdin" type="textarea" :maxlength="1000"></Input>
            </div>
            <div class="each-line">
                <label for="output">输出</label>
                <Input id="output" v-model="test_case.stdout" type="textarea" :maxlength="1000"></Input>
            </div>
            <div class="each-line">
                <label for="strength">分值比</label>
                <div>
                    <InputNumber id="strength" :max="9" :min="1" v-model="test_case.strength"></InputNumber>
                </div>
            </div>
        </Modal>
        <Modal class="modal" v-model="showEditModal" title="编辑测试用例" @on-ok="doEditTestCase()" ok-text="更新">
            <div class="each-line">
                <label for="input">输入</label>
                <Input v-model="test_case.stdin" type="textarea"></Input>
            </div>
            <div class="each-line">
                <label for="input">输入</label>
                <Input v-model="test_case.stdout" type="textarea"></Input>
            </div>
            <div class="each-line">
                <label for="input">分值比</label>
                <div>
                    <InputNumber :max="9" :min="1" v-model="test_case.strength"></InputNumber>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: ['pid'],
    created() {
        this.getTestCases()
    },
    data() {
        return {
            columns: [
                {
                    title: '输入',
                    key: 'stdin'
                },
                {
                    title: '结果',
                    key: 'stdout'
                },
                {
                    title: '分值比',
                    key: 'strength'
                },
                {
                    title: '创建时间',
                    key: 'create_time'
                },
                {
                    title: '操作',
                    key: 'handle',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.editTestCase(params.index)
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
                                        this.deleteTestCase(params.row.tid)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            data: [],
            showAddModal: false,
            showEditModal: false,
            test_case: {
                tid: 0,
                stdin: '',
                stdout: '',
                strength: 1
            }
        }
    },
    methods: {
        addTestCase() {
            this.resetTestCase()
            this.showAddModal = true
        },
        doAddTestCase() {
            if (this.test_case.stdout.length == 0) {
                this.$Message.warning('输出不得为空')
                return
            }
            this.$http.post('/user/problem/'+this.pid+"/test_cases", {
                stdin: this.test_case.stdin,
                stdout: this.test_case.stdout,
                strength: this.test_case.strength
            }).then(res => {
                this.$Message.success(res.message)
                this.showAddModal = false
                this.getTestCases()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        editTestCase(index) {
            this.resetTestCase()
            this.showEditModal = true
            this.test_case.tid = this.data[index].tid
            this.test_case.stdin = this.data[index].stdin
            this.test_case.stdout = this.data[index].stdout
            this.test_case.strength = this.data[index].strength
        },
        doEditTestCase() {
            this.$http.put('/user/problem/'+this.pid+'/test_case/'+this.test_case.tid, {
                stdin: this.test_case.stdin,
                stdout: this.test_case.stdout,
                strength: this.test_case.strength
            }).then(res => {
                this.$Message.success(res.message)
                this.showEditModal = false
                this.getTestCases()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        deleteTestCase(tid) {
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>删除此测试用例不会存在</p>',
                onOk: () => {
                    this.$http.delete('/user/problem/'+this.pid+"/test_case/"+tid).then(res => {
                        this.$Message.success(res.message)
                        this.getTestCases()
                    }).catch(res => {
                        this.$Message.error(res.message)
                    })
                }
            });
        },
        getTestCases() {
            this.$http.get('/user/problem/'+this.pid+'/test_cases').then(res => {
                this.data = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        resetTestCase() {
            this.test_case.tid = 0
            this.test_case.stdin = ''
            this.test_case.stdout = ''
            this.test_case.strength = 1
        }
    },
    watch: {
        pid: function() {
            this.getTestCases()
        }
    }
}
</script>

<style lang="stylus" scoped>
    .test_case
        .header
            text-align right
            margin-bottom 10px
    .modal
        .each-line
            margin-bottom 10px
            label
                font-size 14px
</style>


