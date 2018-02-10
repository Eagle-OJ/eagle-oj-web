<template>
    <div id="container" v-if="data != null">
        <h1 class="id">判卷ID：{{data.id}}</h1>
        <div class="content">
            <div class="each">判卷状态：{{data.status}}</div>
        </div>
        <Alert show-icon>本页的详细结果不会永久保存</Alert>
        <div class="result" v-if="data.response">
            <div class="main">
                <ProblemResult :result="data.response.result"></ProblemResult>
                <Tag color="green">{{data.response.memory}} M</Tag>
				<Tag color="green">{{data.response.time}} S</Tag>
            </div>
            <Row v-for="(item, index) in data.response.test_cases" :key="index" class="detail">
                <Col span="6">测试点{{index+1}}
                    <ProblemResult :result="item.result"></ProblemResult>
                </Col>
                <Col span="18">
                    {{item.error_message}}
                </Col>
            </Row>        
        </div>
    </div>
</template>

<script>
import Util from '@/util'
import ProblemResult from '@/components/common/ProblemResult'
export default {
    created() {
        this.getStatus()
    },
    data() {
        return {
            data: null
        }
    },
    methods: {
        getStatus() {
            this.$http.get('/code/'+this.getId).then(res => {
                this.data = res.data
            })
        }
    },
    computed: {
        getId() {
            return this.$route.params.id
        }
    },
    components: {
        ProblemResult
    }
}
</script>

<style lang="stylus" scoped>
    .id
        font-size 25px
        margin-bottom 10px
    .content
        font-size 20px
        border-bottom 1px solid #ccc
        margin-bottom 10px
        .each
            margin-bottom 8px
    .result
        .main
            margin-bottom 5px
        ul
            li
                font-size 15px
                margin-bottom 5px
        .detail
            font-size 18px
            background #d5efe9
            margin-bottom 10px
            padding 10px
            border-radius 5px
</style>



