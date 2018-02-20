<template>
    <div class="security">
        <h2>邮箱管理</h2>
        <div class="email each">
            <Form ref="password" :model="email.form" :rules="email.rules" :label-width="80">
                <FormItem label="邮箱" prop="email">
                    <Input v-model="email.form.email" type="email"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary">提交</Button>
                </FormItem>
            </Form>
        </div>
        <h2>密码管理</h2>
        <div class="password each">
            <Form ref="password" :model="password.form" :rules="password.rules" :label-width="80">
                <FormItem label="原密码" prop="originPassword">
                    <Input v-model="password.form.originPassword" type="password"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <Input v-model="password.form.newPassword" type="password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submitPassword">提交</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: {
                form: {
                    originPassword: '',
                    newPassword: ''
                },
                rules: {
                    originPassword: [
                        { required: true, message: '原密码不得为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '新密码不得为空', trigger: 'blur' }
                    ]
                }
            },
            email: {
                form: {
                    email: ''
                },
                rules: {
                    email: [
                        { required: true, message: '邮箱不得为空' },
                        { type: 'email', message: '邮箱格式错误' }
                    ]
                }
            }
        }
    },
    methods: {
        submitPassword() {
            this.$refs['password'].validate((valid) => {
                if (valid) {
                    this.$http.put('/user/profile/password', {
                        origin_password: this.password.form.originPassword,
                        new_password: this.password.form.newPassword
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.$store.commit('logout')
                    })
                } else {
                    this.$Message.error('请按要求填写');
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    h2
        font-weight 500
        margin-bottom 5px
    .each
        margin-bottom 10px
</style>


