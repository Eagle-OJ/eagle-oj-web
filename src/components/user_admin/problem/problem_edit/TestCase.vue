<template>
    <div class="test_case">
        <div class="header">
            <Button icon="plus" type="success" @click="addTestCase">添加测试用例</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal class="modal" v-model="showAddModal" title="添加测试用例">
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
                    <InputNumber :max="10" :min="1" v-model="test_case.strength"></InputNumber>
                </div>
            </div>
        </Modal>
        <Modal class="modal" v-model="showEditModal" title="编辑测试用例" ok-text="更新">
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
                    <InputNumber :max="10" :min="1" v-model="test_case.strength"></InputNumber>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
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
                                        this.deleteTestCase(params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            data: [
                {
                    stdin: 'hello',
                    stdout: 'world',
                    strength: 5,
                    create_time: '123123'
                }
            ],
            showAddModal: false,
            showEditModal: false,
            test_case: {
                tid: 0,
                pid: 0,
                stdin: '',
                stdout: '',
                strength: 5
            }
        }
    },
    methods: {
        addTestCase() {
            this.showAddModal = true
        },
        editTestCase(index) {
            this.showEditModal = true
            console.log(index)
        },
        deleteTestCase(index) {
            console.log(index)
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>删除此测试用例不会存在</p>',
                onOk: () => {
                    this.$Message.info('Clicked ok');
                }
            });
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


