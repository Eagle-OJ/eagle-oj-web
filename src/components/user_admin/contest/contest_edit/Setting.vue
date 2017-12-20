<template>
    <div class="setting">
        <Row class="each">
            <Col span="4"><h2>是否启用</h2></Col>
            <Col span="20">
                <Alert>注意，启用比赛后不要修改关键信息，以免引起分值混乱</Alert>
                <div>
                    <Button key="start" v-if="getStatus==0" type="primary" @click="changeContestStatus()">启用比赛</Button>
                    <Button key="close" v-else-if="getStatus==1" @click="changeContestStatus()">停止启用</Button>
                    <Button key="closed" v-else-if="getStatus==2" disabled>比赛已结束</Button>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['cid', 'contest'],
    methods: {
        changeContestStatus() {
            let status = 0
            if (this.getStatus == 0) {
                status = 1
            } else {
                status = 0
            }
            this.$http.post('/user/contest/'+this.cid+'/status', {status: status}).then(res => {
                this.$Message.success(res.message)
                this.$parent.getContest()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        }
    },
    computed: {
        getStatus() {
            return this.contest.status
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


