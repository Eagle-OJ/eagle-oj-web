<template>
    <div class="setting">
        <Row :gutter="10" class="each setting">
            <Row class="each-sort">
                <Col span="4" class="left"><h2>程序限定</h2></Col>
                <Col span="20" class="right">
                    <Alert>如无特殊要求，推荐使用默认设置-最大10s / 256MB内存</Alert>
                    <InputNumber :max="10" :min="1" v-model="time"></InputNumber>
                    <span class="unit">S</span>
                    <InputNumber :max="256" :min="1" v-model="memory"></InputNumber>
                    <span class="unit">MB</span>
                </Col>
            </Row>
            <Row class="each-sort">
                <Col span="4" class="left"><h2>编程语言</h2></Col>
                <Col span="20" class="right">
                    <CheckboxGroup v-model="lang">
                        <Checkbox v-for="(item, key) in $store.state.setting.lang" :label="key" :key="key">
                            <span>{{item}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
            </Row>
            <Row class="each-sort">
                <Col span="4" class="left"><h2>公开题目</h2></Col>
                <Col span="20" class="right">
                    <Alert v-if="status == 1">管理员审核中</Alert>
                    <i-switch v-model="isShared">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </Col>
            </Row>
            <Row class="each-sort">
                <Col span="20" offset="4" class="right">
                    <Button type="success" :disabled="!isEditable" @click="updateSetting()">保存设置</Button>
                </Col>
            </Row>
            
        </Row>
        <Row :gutter="10" class="each setting">
            <Row class="each-sort">
                <Col span="4" class="left"><h2>删除题目</h2></Col>
                <Col span="20" class="right">
                    <Button type="error" :disabled="!isEditable" @click="deleteProblem()">删除题目</Button>
                </Col>
            </Row>
        </Row>
    </div>
</template>

<script>
export default {
    created() {
        this.setProblem()
    },
    props: ['pid', 'problem', 'isEditable'],
    data() {
        return {
            lang: [],
            status: 0,
            time: 1,
            memory: 1,
            isShared: false,
            beforeShared: false,
        }
    },
    methods: {
        setProblem() {
            let problem = this.problem
            this.lang = problem.lang
            this.time = problem.time
            this.memory = problem.memory
            this.status = problem.status
            if (this.status == 1 || this.status == 2) {
                this.isShared = true
                this.beforeShared = true
            } else {
                this.isShared = false
                this.beforeShared = false
            }
        },
        updateSetting() {
            this.$http.put('/problem/'+this.pid, {
                lang: this.lang,
                time: this.time,
                memory: this.memory,
                is_shared: this.isShared
            }).then(res => {
                this.$Message.success(res.message)
                if(this.isShared && this.beforeShared==false) {
                    this.status = 1
                }
                if(!this.isShared && this.beforeShared==true) {
                    this.status = 0
                }
            })
        },
        deleteProblem() {
            this.$Modal.confirm({
                title: '删除警告',
                content: '<p>如果题目已经有过提交或者被比赛引用，将无法删除!</p>',
                onOk: () => {
                    this.$http.delete('/problem/'+this.pid).then(res => {
                        this.$Message.success(res.message)
                        this.$router.push('/user/problem')
                    })
                },
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
    .setting
        .each
            margin-bottom 5px
            border-bottom 1px solid #e9eaec
            padding 10px 0
            .unit
                margin-right 10px
                font-weight 600
                font-size 14px
                color #80848f
            &.setting
                .each-sort
                    margin-bottom 20px
</style>


