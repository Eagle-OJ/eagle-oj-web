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
                <Col span="20" offset="4" class="right">
                    <Button @click="updateSetting()">保存设置</Button>
                </Col>
            </Row>
        </Row>

        <Row :gutter="10" class="each">
            <Col span="4" class="left"><h2>公开题目</h2></Col>
            <Col span="20" class="right">
                <Alert>公开自己的题目供所有人使用-需要管理员审核</Alert>
                <Button key="application" v-if="status == 0" type="primary" @click="updateStatus()">申请审核</Button>
                <Button key="waiting" v-else-if="status == 1" type="default">审核中</Button>
                <Button key="shared" v-else type="primary" disabled>已经分享</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    created() {
        this.setProblem()
    },
    props: ['pid', 'problem'],
    data() {
        return {
            lang: [],
            status: 0,
            time: 1,
            memory: 1
        }
    },
    methods: {
        setProblem() {
            let problem = this.problem
            this.lang = problem.lang
            this.time = problem.time
            this.memory = problem.memory
            this.status = problem.status
        },
        updateSetting() {
            this.$http.put('/user/problem/'+this.pid+'/setting', {
                lang: this.lang,
                time: this.time,
                memory: this.memory
            }).then(res => {
                this.$Message.success(res.message)
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        updateStatus() {
            let pid = this.pid
            this.$http.post('/user/problem/'+pid+'/status').then(res => {
                this.$Message.success(res.message)
                this.status = 1
            }).catch(res => {
                this.$Message.error(res.message)
            })
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


