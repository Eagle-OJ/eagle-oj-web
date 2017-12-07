<template>
    <div class="setting">
        <Row :gutter="10" class="each">
            <Col span="4" class="left"><h2>编程语言</h2></Col>
            <Col span="20" class="right">
                <Alert>暂时不支持限定内存和耗时</Alert>
                <CheckboxGroup v-model="data.languages">
                    <Checkbox label="JAVA8"></Checkbox>
                    <Checkbox label="Python27"></Checkbox>
                    <Checkbox label="C"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row :gutter="10" class="each">
            <Col span="4" class="left"><h2>公开题目</h2></Col>
            <Col span="20" class="right">
                <Alert>公开自己的题目供所有人使用-需要管理员审核</Alert>
                <Button key="application" v-if="data.status == 0" type="primary" @click="updateStatus()">申请审核</Button>
                <Button key="waiting" v-else-if="data.status == 1" type="default">审核中</Button>
                <Button key="shared" v-else type="primary" disabled>已经分享</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    created() {
        this.getProblem()
    },
    props: ['pid'],
    data() {
        return {
            data: {
                languages: [],
                status: 0
            }
        }
    },
    methods: {
        getProblem() {
            let pid = this.pid
            this.$http.get('/user/problem/'+pid).then(res => {
                this.data.status = res.data.status
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        updateStatus() {
            let pid = this.pid
            this.$http.post('/user/problem/'+pid+"/status").then(res => {
                this.$Message.success(res.message)
                this.data.status = 1
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
</style>


