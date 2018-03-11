<template>
    <div class="setting">
        <Row class="each">
            <Col span="5" class="title">发送通知</Col>
            <Col span="19" class="content">
                <p>
                    <Alert>给你的组员发送消息</Alert>
                    <Input v-model="message" :minlength="10">
                        <Button slot="append" icon="android-send" @click="sendMessage"></Button>
                    </Input>
                </p>
            </Col>
        </Row>
        <Row class="each">
            <Col span="5" class="title">解散小组</Col>
            <Col span="19" class="content">
                <p>
                    <Button type="error" @click="dismissGroup">解散小组</Button>
                </p>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['gid'],
    data() {
        return {
            message: '',
        }
    },
    methods: {
        sendMessage() {
            if(this.message.length < 10) {
                this.$Message.warning('消息长度不得小于10个字')
                return
            }

            this.$http.post('/group/'+this.gid+'/message', {message: this.message}).then(res => {
                this.$Message.success(res.message)
                this.message = ''
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        dismissGroup() {
            this.$Modal.confirm({
                title: '解散小组',
                content: '<p>如果组内开设有比赛，将无法解散！</p>',
                onOk: () => {
                    this.$http.delete('/group/'+this.gid).then(res => {
                        this.$Message.success(res.message)
                        this.$router.push('/user/group')
                    }).catch(res => {
                        this.$Message.error(res.message)
                    })
                },
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .setting
        .each
            margin-bottom 15px
            border-bottom 1px solid #ddd
            .title
                font-size 18px
            .content
                p
                    margin-bottom 10px
</style>


