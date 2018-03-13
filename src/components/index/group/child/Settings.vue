<template>
    <div class="settings">
        <Row>
            <Col span="4" class="left">小组操作</Col>
            <Col span="20" class="right">
                <Alert>一旦退出小组所有信息将被清除</Alert>
                <Button type="error" @click="quitGroup">退出小组</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['gid', 'uid'],
    data() {
        return {}
    },
    methods: {
        quitGroup() {
            this.$Modal.confirm({
                title: '确认退出小组',
                content: '<p>一旦退出小组，组内所有数据会被清除</p>',
                onOk: () => {
                    this.$http.delete('/group/'+this.gid+'/user/'+this.uid).then(res => {
                        this.$Message.success('退出成功')
                        this.$router.push('/groups')
                    })
                },
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
    .settings
        padding-top 10px
        .left
            font-size 20px
</style>


