<template>
    <div class="setting">
        <Alert>
            存储功能说明
            <template slot="desc">存储功能能够用于保存用户的头像和提交代码，暂时只支持阿里云OSS</template>
        </Alert>
        <Form ref="form" :model="form">
            <FormItem label="存储功能">
                <i-switch v-model="form.isOpenStorage" size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </FormItem>
            <template v-if="form.isOpenStorage">
                <FormItem label="Accesss Key">
                    <Input v-model="form.accessKey"></Input>
                </FormItem>
                <FormItem label="Secret Key">
                    <Input v-model="form.secretKey"></Input>
                </FormItem>
                <FormItem label="End Point (e.g oss-cn-shanghai.aliyuncs.com)">
                    <Input v-model="form.endPoint"></Input>
                </FormItem>
                <FormItem label="Bucket">
                    <Input v-model="form.bucket"></Input>
                </FormItem>
                <FormItem label="Url (e.g http://cdn.eagleoj.com)">
                    <Input v-model="form.url"></Input>
                </FormItem>
            </template>
            <FormItem>
                <Button type="success" @click="update()">更新</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    created() {
        this.getData()
    },
    data() {
        return {
            form: {
                isOpenStorage: false,
                accessKey: '',
                secretKey: '',
                endPoint: '',
                bucket: '',
                url: ''
            },
        }
    },
    methods: {
        getData() {
            this.$http.get('/setting/storage').then(res => {
                let data = res.data
                this.form.isOpenStorage = data.is_open_storage == 'true'
                this.form.accessKey = data.oss_access_key
                this.form.secretKey = data.oss_secret_key
                this.form.endPoint = data.oss_end_point
                this.form.bucket = data.oss_bucket
                this.form.url = data.oss_url
            })
        },
        update() {
            let data = {}
            if(this.form.isOpenStorage) {
                data = this.form
            } else {
                data.isOpenStorage = false
            }
            this.$http.post('/setting/storage', data).then(res => {
                this.$Message.success(res.message)
                this.$store.dispatch('setWebsite')
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


