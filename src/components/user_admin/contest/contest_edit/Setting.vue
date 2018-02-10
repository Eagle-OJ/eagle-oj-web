<template>
    <div class="setting">
        <Row class="each">
            <Col span="4"><h2>删除比赛</h2></Col>
            <Col span="20">
                <Button type="error" @click="deleteContest()">删除比赛</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['cid'],
    methods: {
        deleteContest() {
            this.$Modal.confirm({
                title: '删除比赛',
                content: '<p>如果比赛有人参加则无法删除</p>',
                onOk: () => {
                    this.$http.delete('/contest/'+this.cid).then(res => {
                        this.$Message.success(res.message)
                        this.$router.push('/user/contest')
                    })
                },
            });
        }
    },
}
</script>

<style lang="stylus" scoped>
    .setting
        .each
            margin-bottom 5px
            border-bottom 1px solid #e9eaec
            padding 10px 0
</style>


