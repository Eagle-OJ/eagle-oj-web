<template>
    <div class="setting">
        <Form :model="form" :rules="rules" label-position="top" ref="form">
            <div class="little-title">网站设置</div>
            <FormItem label="网站名称" prop="title">
                <Input v-model="form.title" placeholder="长度不超过20" :maxlength="20"></Input>
            </FormItem>
            <div class="little-title">阿里云OSS设置</div>
            <FormItem label="Access key" prop="accessKey">
                <Input v-model="form.accessKey"></Input>
            </FormItem>
            <FormItem label="Secret key" prop="secretKey">
                <Input v-model="form.secretKey"></Input>
            </FormItem>
            <FormItem label="Bucket" prop="bucket">
                <Input v-model="form.bucket"></Input>
            </FormItem>
            <FormItem label="End point" prop="endPoint">
                <Input v-model="form.endPoint"></Input>
            </FormItem>
            <FormItem label="url" prop="url">
                <Input v-model="form.url"></Input>
            </FormItem>
            <div class="little-title">判卷机设置</div>
            <FormItem label="判卷机地址" prop="judgerUrl">
                <Input v-model="form.judgerUrl"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    created() {
        this.getSetting()
    },
    data() {
        return {
            form: {
                title: '',
                accessKey: '',
                secretKey: '',
                bucket: '',
                endPoint: '',
                url: '',
                judgerUrl: ''
            },
            rules: {
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
                judgerUrl: [
                    { required: true, message: '判卷机地址不得为空'}
                ]
            }
        }
    },
    methods: {
        getSetting() {
            this.$http.get('/setting', {
                params: {
                    is_detail: true
                }
            }).then(res => {
                let data = res.data
                let oss_config = data.oss_config
                this.form.title = data.title
                this.form.accessKey = oss_config.access_key
                this.form.secretKey = oss_config.secret_key
                this.form.bucket = oss_config.bucket
                this.form.endPoint = oss_config.end_point
                this.form.url = oss_config.url
                this.form.judgerUrl = data.judger_url
            })
        },
        submit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.update()
                }
            })
        },
        update() {
            this.$http.put('/setting', this.form).then(res => {
                this.$Message.success(res.message)
            }).catch(res => {
                this.$Message.error(res.message)
            })
        }
    }
}
</script>


<style lang="stylus" scoped>
    .little-title
        text-align center
        margin 10px 0
        padding 5px
        color #80848f
        font-size 16px
</style>

