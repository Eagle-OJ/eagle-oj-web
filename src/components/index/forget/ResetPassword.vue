<template>
    <div id="container">
        <Card class="card">
            <p slot="title">重设密码</p>
            <Form ref="form" :model="form" :rules="rules">
                <FormItem prop="email" label="待找回邮箱">
                    <Input v-model="form.email" type="email">
                    </Input>
                </FormItem>
                <FormItem prop="password" label="新密码">
                    <Input v-model="form.password" type="password">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="success" long @click="findPassword">找回密码</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '邮箱不得为空' },
                    { type: 'email', message: '邮箱格式错误' }
                ],
                password: [
                    { required: true, message: '密码不得为空' }
                ]
            }
        }
    },
    methods: {
        findPassword() {
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    this.$http.post('/account/reset_password', {
                        email: this.form.email,
                        password: this.form.password,
                        code: this.getCode
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.$router.push('/login')
                    })
                } else {
                    this.$Message.warning('请按要求填写')
                }
            })
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


