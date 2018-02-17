<template>
    <div class="setting">
        <Form ref="form" :model="form" :rules="rules">
            <FormItem prop="title" label="网站名称">
                <Input v-model="form.title" placeholder="长度不超过20" :maxlength="20"></Input>
            </FormItem>
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
                title: ''
            },
            rules: {
                title: [
                    { required: true, message: '网站名称不能为空' },
                    { type: 'string', max: 20, message: '长度不得超出20' }
                ]
            }
        }
    },
    methods: {
        getData() {
            this.$http.get('/setting/global').then(res => {
                this.form.title = res.data.web_title
            })
        },
        update() {
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    this.$http.post('/setting/global', {title: this.form.title}).then(res => {
                        this.$Message.success(res.message)
                        this.$store.dispatch('setWebsite')
                    })
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


