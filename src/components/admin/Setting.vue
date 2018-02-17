<template>
    <div class="setting">
        <div class="nav">
            <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
                <MenuItem name="global">
                    <Icon type="ios-paper"></Icon>
                    全局设置
                </MenuItem>
                <MenuItem name="storage">
                    <Icon type="ios-people"></Icon>
                    存储设置
                </MenuItem>
                <MenuItem name="mail">
                    <Icon type="settings"></Icon>
                    邮件设置
                </MenuItem>
            </Menu>
        </div>
        <div class="content">
            <component :is="getActive"></component>
        </div>
        <!-- <div class="little-title">网站设置</div>
        <Form inline ref="title" :model="form">
            <FormItem prop="title" :rules="rules.title" :label-width="100" label="网站名称">
                <Input style="width: 300px" v-model="form.title" placeholder="长度不超过20" :maxlength="20"></Input>
            </FormItem>
            <FormItem :label-width="0">
                <Button type="text" @click="handleSubmit('title')">更新</Button>
            </FormItem>
        </Form>
        <div class="little-title">阿里云OSS设置</div>
        <Form inline ref="accessKey" :model="form">
            <FormItem prop="accessKey" :rules="rules.accessKey" :label-width="100" label="Access Key">
                <Input style="width: 300px" v-model="form.accessKey"></Input>
            </FormItem>
            <FormItem :label-width="0">
                <Button type="text" @click="handleSubmit('accessKey')">更新</Button>
            </FormItem>
        </Form>
        <Form inline ref="secretKey" :model="form">
            <FormItem prop="secretKey" :rules="rules.secretKey" :label-width="100" label="Secret Key">
                <Input style="width: 300px" v-model="form.secretKey"></Input>
            </FormItem>
            <FormItem :label-width="0">
                <Button type="text" @click="handleSubmit('secretKey')">更新</Button>
            </FormItem>
        </Form>
        <Form inline ref="bucket" :model="form">
            <FormItem prop="bucket" :rules="rules.bucket" :label-width="100" label="Bucket">
                <Input style="width: 300px" v-model="form.bucket" ></Input>
            </FormItem>
            <FormItem :label-width="0">
                <Button type="text" @click="handleSubmit('bucket')">更新</Button>
            </FormItem>
        </Form>
        <Form inline ref="endPoint" :model="form">
            <FormItem prop="endPoint" :rules="rules.endPoint" :label-width="100" label="End Point">
                <Input style="width: 300px" v-model="form.endPoint" ></Input>
            </FormItem>
            <FormItem :label-width="0">
                <Button type="text" @click="handleSubmit('endPoint')">更新</Button>
            </FormItem>
        </Form>
        <Form inline ref="url" :model="form">
            <FormItem prop="url" :rules="rules.url" :label-width="100" label="URL">
                <Input style="width: 300px" v-model="form.url" ></Input>
            </FormItem>
            <FormItem :label-width="0">
                <Button type="text" @click="handleSubmit('url')">更新</Button>
            </FormItem>
        </Form> -->
    </div>
</template>

<script>
import GlobalSetting from './setting/GlobalSetting'
import StorageSetting from './setting/StorageSetting'
import MailSetting from './setting/MailSetting'
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
            }
        }
    },
    methods: {
        goTo(name) {
            this.$router.push('?action='+name)
        },
        getSetting() {
            this.$http.get('/setting', {
                params: {
                    is_detail: true
                }
            }).then(res => {
                let data = res.data
                this.form.title = data.web_title
                this.form.accessKey = data.oss_access_key
                this.form.secretKey = data.oss_secret_key
                this.form.bucket = data.oss_bucket
                this.form.endPoint = data.oss_end_point
                this.form.url = data.oss_url
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid) {
                    let value = this.$refs[name].model[name]
                    this.$http.put('/setting', {
                        key: name,
                        value: value
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.$store.dispatch('setWebsite')
                    })
                }
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
            })
        }
    },
    computed: {
        getActive() {
            let action = this.$route.query.action
            if (action == undefined)
                return 'global'
            else 
                return action 
        }
    },
    components: {
        'global': GlobalSetting,
        'storage': StorageSetting,
        'mail': MailSetting
    }
}
</script>


<style lang="stylus" scoped>
    .content
        padding 10px
    .little-title
        text-align center
        margin 10px 0
        padding 5px
        color #80848f
        font-size 16px
    input
        width 200px
</style>

