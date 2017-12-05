<template>
    <div class="setting">
        <Row class="each">
            <Col span="4"><h2>是否启用</h2></Col>
            <Col span="20">
                <Alert>注意，启用比赛后不要修改关键信息，以免引起分值混乱</Alert>
                <div>
                    <Button v-if="status==0" type="warning">启用比赛</Button>
                    <Button v-if="status==1" disabled>比赛开启中</Button>
                    <Button v-if="status==2" disabled>比赛已结束</Button>
                </div>
            </Col>
        </Row>
        <Row class="each">
            <Col span="4"><h2>是否开赛</h2></Col>
            <Col span="20">
                <Alert>一旦开赛后所有信息都将不得修改！</Alert>
                <div><Button type="warning">开始比赛</Button></div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['cid'],
    created() {
        this.getContest()
    },
    data() {
        return {
            status: 0
        }
    },
    methods: {
        getContest() {
            this.$http.get('/user/contest/'+this.cid).then(res => {
                this.status = res.data.status
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


