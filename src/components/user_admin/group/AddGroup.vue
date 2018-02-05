<template>
    <div id="container">
        <h1>创建小组</h1>
        <Form ref="form" :model="form" :label-width="80" :rules="validateRule">
            <FormItem label="小组名称" prop="name">
                <Input v-model="form.name" :maxlength="20"></Input>
            </FormItem>
            <FormItem label="是否公开">
                <i-switch v-model="form.isSecret" size="large">
                    <span slot="close">公开</span>
                    <span slot="open">私密</span>
                </i-switch>
            </FormItem>
            <FormItem label="小组密码" v-if="form.isSecret">
                <Input v-model="form.password" placeholder="密码不得超出6位" :maxlength="6"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="createGroup()" :loading="loading">创建</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            form: {
                name: '',
                password: '',
                isSecret: false,
            },
            validateRule: {
                name: [
                    { required: true, message: '名称不得为空'},
                    { type: 'string', max: 20, message: '长度不得超出20' }
                ]
            }
        }
    },
    methods: {
        createGroup() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let password = null
                    if (this.form.isSecret) {
                        if (this.form.password.length == 0) {
                            this.$Message.warning('密码不得为空')
                            return
                        } 
                        password = this.form.password
                    }
                    this.loading = true
                    this.$http.post('/group', {name: this.form.name, password: password}).then(res => {
                        this.$router.push('/user_admin/group/'+res.data+"/edit")
                        this.$Message.success(res.message)
                        this.loading = false
                    }).catch(res => {
                        this.loading = false
                    })
                } else {
                    this.$Message.error('请按要求填写')
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    h1
        font-weight 500
        border-bottom 1px solid #e9eaec
        margin-bottom 10px
</style>


