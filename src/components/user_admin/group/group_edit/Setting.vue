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
            <Col span="5" class="title">创建小组赛</Col>
            <Col span="19" class="content">
                <p>
                    <Alert>创建只有本小组成员才可以加入的小组比赛</Alert>
                    <router-link :to="{path: '/user_admin/contest/add?group='+gid}">
                        <Button type="ghost">创建小组赛</Button>
                    </router-link>
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


