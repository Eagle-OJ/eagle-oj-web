<template>
    <div id="container" class="install">
        <div class="form">
            <h1>Ealge-OJ系统安装</h1>
            <Form :model="form" :label-width="100" :rules="rules" ref="form">
                <div class="little-title" style="background: #ff9900">管理员设置</div>
                <FormItem label="名称" prop="nickname">
                    <Input v-model="form.nickname" placeholder="长度不超过20" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="form.email"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="form.password" type="password"></Input>
                </FormItem>
                <div class="little-title" style="background: #2d8cf0">网站设置</div>
                <FormItem label="网站名称" prop="title">
                    <Input v-model="form.title" placeholder="长度不超过20" :maxlength="20"></Input>
                </FormItem>
                <div class="little-title" style="background: #19be6b">阿里云OSS设置</div>
                <FormItem label="Access key" prop="accessKey">
                    <Input v-model="form.accessKey"></Input>
                </FormItem>
                <FormItem label="Secret key" prop="secretKey">
                    <Input v-model="form.secretKey"></Input>
                </FormItem>
                <FormItem label="End point" prop="endPoint">
                    <Input v-model="form.endPoint"></Input>
                </FormItem>
                <FormItem label="Bucket" prop="bucket">
                    <Input v-model="form.bucket"></Input>
                </FormItem>
                <FormItem label="Url" prop="url">
                    <Input v-model="form.url"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submit">提交</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        if(this.$store.state.setting.is_installed) {
            this.$router.push('/login')
            this.$Message.warning('你已经安装过网站了')
        }
    },
    data() {
        return {
            form: {
                nickname: 'admin',
                email: 'admin@admin.com',
                password: '',
                title: '',
                secretKey: '',
                accessKey: '',
                endPoint: '',
                bucket: '',
                url: '',
            },
            rules: {
                nickname: [
                    { required: true, message: '管理员名称不得为空'},
                    { type: 'string', max: 20, message: '管理员名称长度不得超过20'}
                ],
                email: [
                    { required: true, message: '管理员邮箱不得为空'},
                    { type: 'email', message: '非法邮箱格式'}
                ],
                password: [
                    { required: true, message: '管理员密码不得为空'},
                ],
                title: [
                    { required: true, message: '网站名称不得为空'},
                    { type: 'string', max: 20, message: '网站标题最大长度不能超出20'}
                ],
                secretKey: [
                    { required: true, message: 'Secret key不得为空'},
                ],
                accessKey: [
                    { required: true, message: 'Access key不得为空'},
                ],
                endPoint: [
                    { required: true, message: 'End point不得为空'},
                ],
                bucket: [
                    { required: true, message: 'Bucket不得为空'},
                ],
                url: [
                    { required: true, message: 'URL不得为空'},
                ],
            }
        }
    },
    methods: {
        submit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.doInstall()
                }
            })
        },
        doInstall() {
            let data = this.form
            this.$http.post('/setting', data).then(res => {
                this.$Message.success(res.message)
                this.$router.push('/login')
                this.$store.dispatch('setWebsite')
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    #container
        .form
            border 1px solid #ddd
            padding 10px
            width 500px
            margin 20px auto 0
            h1
                text-align center
                font-weight 500
                margin-bottom 10px
            .little-title
                text-align center
                margin 10px 0
                padding 5px
                color #fff
</style>


