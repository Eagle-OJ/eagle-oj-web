<template>
    <div id="container">
        <Card class="card">
            <p slot="title">找回密码</p>
            <Form ref="form" :model="form" :rules="rules" v-if="! isSend">
                <FormItem prop="email">
                    <Input v-model="form.email" type="email" placeholder="输入待找回的邮箱">
                        <Icon type="email" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="success" long @click="findPassword">找回密码</Button>
                </FormItem>
            </Form>
            <Alert type="success" show-icon v-else>邮件已发送，请查看</Alert>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSend: false,
            form: {
                email: ''
            },
            rules: {
                email: [
                    { type: 'email', message: '邮箱格式错误' },
                    { required: true, message: '邮箱不得为空' }
                ]
            }
        }
    },
    methods: {
        findPassword() {
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    this.$http.post('/account/forget_password', {url: this.getUrl(), email: this.form.email}).then(res => {
                        this.$Message.success(res.message)
                        this.isSend = true
                    })
                } else {
                    this.$Message.warning('请按要求添加')
                }
            })
        },
        getUrl() {
            let url = window.location.href
            let protocol = url.split('//')
            return protocol[0]+'//'+window.location.host+'/#/reset_password?code='
        }
    },
    computed: {
        getCode() {
            return this.$route.query.code
        }
    }
}
</script>

<style lang="stylus" scoped>
    .card
        max-width 400px
        margin 0 auto
</style>


