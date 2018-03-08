<template>
    <div class="setting">
        <Alert>
            邮件功能说明
            <template slot="desc">只有开启邮件功能用户才能进行用户验证、密码找回和消息通知等功能。<p>只支持SMTP发信功能</p></template>
        </Alert>
        <Form ref="form" :model="form">
            <FormItem label="发信功能">
                <i-switch v-model="form.isOpenMail" size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </FormItem>
            <template v-if="form.isOpenMail">
                <FormItem label="地址">
                    <Input v-model="form.host"></Input>
                </FormItem>
                <FormItem label="端口">
                    <InputNumber v-model="form.port" :min="1"></InputNumber>
                </FormItem>
                <FormItem label="发件人">
                    <Input v-model="form.username" placeholder="test@test.com"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="form.password"></Input>
                </FormItem>
            </template>
            <FormItem>
                <Button type="success" @click="update()" style="margin-right: 10px">更新</Button>
                <Button type="ghost" :disabled="! form.isOpenMail" @click="sendTest()">测试发信</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    created() {
        this.get()
    },
    data() {
        return {
            form: {
                isOpenMail: false,
                host: '',
                port: 25,
                username: '',
                password: ''
            },
            testMail: ''
        }
    },
    methods: {
        get() {
            this.$http.get('/setting/mail').then(res => {
                let data = res.data
                this.form.isOpenMail = data.is_open_mail == 'true'
                if(this.form.isOpenMail) {
                    this.form.host = data.mail_host
                    this.form.port = parseInt(data.mail_port)
                    this.form.username = data.mail_username
                    this.form.password = data.mail_password
                }
            })
        },
        update() {
            let data = {}
            if(this.form.isOpenMail) {
                data = this.form
            } else {
                data.isOpenMail = false
            }
            this.$http.post('/setting/mail', data).then(res => {
                this.$Message.success(res.message)
            })
        },
        sendTest() {
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.testMail,
                            autofocus: true,
                            placeholder: '测试收信邮箱'
                        },
                        on: {
                            input: (val) => {
                                this.testMail = val;
                            }
                        },
                    })
                },
                onOk: () => {
                    let data = this.form
                    data.testMailAddress = this.testMail
                    this.$http.post('/setting/mail/test', data).then(res => {
                        this.$Message.success(res.message)
                    })
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


