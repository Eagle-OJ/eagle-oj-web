<template>
    <div class="index">
        <h2>代办事项</h2>
        <Card style="margin-bottom: 10px">
            <p><router-link to="/admin/auditing">待审核题目({{data.auditingProblems}})</router-link></p>
        </Card>
        <h2>数据概览</h2>
        <Row :gutter="12">
            <Col span="6">
                <Card class="each">
                    <CountTo :endVal="data.problems" :mainStyle="mainStyle" :countStyle="countStyle">
                        <span slot="leftText">题目</span>
                        <span slot="rightText">道</span>
                    </CountTo>
                </Card>
            </Col>
            <Col span="6" class="each">
                <Card>
                    <CountTo :endVal="data.users" :mainStyle="mainStyle" :countStyle="countStyle">
                        <span slot="leftText">用户</span>
                        <span slot="rightText">人</span>
                    </CountTo>
                </Card>
            </Col>
            <Col span="6" class="each">
                <Card>
                    <CountTo :endVal="data.contests" :mainStyle="mainStyle" :countStyle="countStyle">
                        <span slot="leftText">比赛</span>
                        <span slot="rightText">场</span>
                    </CountTo>
                </Card>
            </Col>
            <Col span="6" class="each">
                <Card>
                    <CountTo :endVal="data.groups" :mainStyle="mainStyle" :countStyle="countStyle">
                        <span slot="leftText">小组</span>
                        <span slot="rightText">组</span>
                    </CountTo>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import CountTo from '@/components/common/CountTo'
export default {
    created() {
        this.getData()
    },
    data() {
        return {
            data: {
                users: 0,
                contests: 0,
                groups: 0,
                problems: 0,
                auditingProblems: 0,
            },
            mainStyle: {
                fontSize: '20px'
            },
            countStyle: {
                fontSize: '30px',
                fontWeight: '700',
                color: 'rgb(45, 140, 240)'
            }
        }
    },
    methods: {
        getData() {
            this.$http.get('/admin/overview').then(res => {
                let data = res.data
                this.data.users = data.users
                this.data.contests = data.contests
                this.data.groups = data.groups
                this.data.problems = data.problems
                this.data.auditingProblems = data.auditing_problems
            })
        }
    },
    components: {
        CountTo
    }
}
</script>

<style lang="stylus" scoped>
    h2
        font-weight 500
        margin-bottom 10px
    .each
        text-align center
</style>


