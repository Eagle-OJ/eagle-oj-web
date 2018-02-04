<template>
    <div class="security">
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
            <FormItem label="原密码" prop="originPassword">
                <Input v-model="form.originPassword" type="password"></Input>
            </FormItem>
            <FormItem label="新密码" prop="newPassword">
                <Input v-model="form.newPassword" type="password"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
        }
    },
    methods: {
        submit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$http.put('/user/profile/password', {
                        origin_password: this.form.originPassword,
                        new_password: this.form.newPassword
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.$router.push('/login')
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

</style>


