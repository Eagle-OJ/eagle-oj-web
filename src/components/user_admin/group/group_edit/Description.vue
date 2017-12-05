<template>
    <div class="description">
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
                <Button type="primary" @click="updateGroup()" :loading="loading">更新</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    props: ['gid'],
    created() {
        this.getGroup()
    },
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
        updateGroup() {
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
                    this.$http.put('/user/group/'+this.gid, {name: this.form.name, password: password}).then(res => {
                        this.$Message.success(res.message)
                    }).catch(res => {
                        this.$Message.error(res.message)
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    this.$Message.error('请按要求填写')
                }
            })
        },
        getGroup() {
            this.$http.get('/user/group/'+this.gid).then(res => {
                res = res.data
                if (res.password) {
                    this.form.password = res.password
                    this.form.isSecret = true
                }
                this.form.name = res.name
            }).catch(res => {
                this.$Message.error(res.message)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


