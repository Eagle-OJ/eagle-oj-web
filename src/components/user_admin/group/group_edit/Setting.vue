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
        <Row class="each pull_contest">
            <Col span="5" class="title">拉入比赛</Col>
            <Col span="19" class="content">
                <Alert>将你的组员全部拉入比赛中</Alert>
                <p>
                    <span>比赛ID：</span><InputNumber style="margin-right: 10px" v-model="cid"></InputNumber>
                    <span>密码：</span><Input style="width: 200px" placeholder="无密码可不填" v-model="password"></Input>
                </p>
                <p>
                    <Button @click="pullUsersIntoContest">提交</Button>
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
            cid: 0,
            password: ''
        }
    },
    methods: {
        pullUsersIntoContest() {
            if(this.cid <= 0) {
                this.$Message.warning('比赛ID非法')
                return
            }
            let temp = null
            if(this.password.length != 0) {
                temp = this.password
            }
            this.$http.post('/group/'+this.gid+'/pull_contest', {cid: this.cid, password: temp}).then(res => {
                this.$Message.success(res.message)
                this.password = ''
                this.cid = 0
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
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


