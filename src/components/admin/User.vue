<template>
    <div class="user">
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" simple @on-change="getData" style="margin-top: 10px;text-align: center"></Page>
        <Modal v-model="modal" title="编辑用户信息">
            <Form :model="form" :rules="rules">
                <FormItem label="邮箱" prop="email">
                    <Input v-model="form.email"></Input>
                </FormItem>
                <FormItem label="昵称">
                    <Input v-model="form.nickname" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="form.password"></Input>
                </FormItem>
                <FormItem label="角色">
                    <RadioGroup v-model="form.role">
                        <Radio :label="0">普通用户</Radio>
                        <Radio :label="8">管理员</Radio>
                        <Radio :label="9" v-if="$store.state.userInfo.role==9">ROOT</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="form.gender">
                        <Radio :label="0">保密</Radio>
                        <Radio :label="1">男</Radio>
                        <Radio :label="2">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签名">
                    <Input v-model="form.motto" type="textarea" :maxlength="50"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="save()">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.getData(1)
    },
    data() {
        return {
            modal: false,
            total: 0,
            pageSize: 10,
            data: [],
            columns: [
                {
                    title: 'ID',
                    key: 'uid'
                },
                {
                    title: '名称',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/profile/'+params.row.uid
                            }
                        }, params.row.nickname)
                    }
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '角色',
                    render: (h, params) => {
                        return h('div', {}, this.getRole(params.row.role))
                    }
                },
                {
                    title: '注册时间',
                    render: (h, params) => {
                        return h('div', {}, this.getTime(params.row.register_time))
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'ghost'
                                },
                                on: {
                                    click: () => {
                                        this.modifyUser(params.index)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                }
            ],
            rules: {
                email: [
                    {type: 'email', message: '必须为email格式'}
                ],
            },
            form: {
                uid: 0,
                email: '',
                nickname: '',
                password: '',
                role: 0,
                gender: 0,
                motto: ''
            }
        }
    },
    methods: {
        getData(page) {
            this.$http.get('/users', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
            })
        },
        modifyUser(index) {
            this.modal = true
            let data = this.data[index]
            this.form.uid = data.uid
            this.form.email = data.email
            this.form.nickname = data.nickname
            this.form.role = data.role
            this.form.gender = data.gender
            this.form.motto = data.motto
        },
        save() {
            let form = {
                email: this.form.email.length==0? null: this.form.email,
                nickname: this.form.nickname.length==0? null: this.form.nickname,
                password: this.form.password.length==0? null: this.form.password,
                role: this.form.role,
                gender: this.form.gender,
                motto: !this.form.motto || this.form.motto.length==0? null: this.form.motto
            }
            this.$http.put('/user/'+this.form.uid, form).then(res => {
                this.$Message.success(res.message)
                this.modal = false
                this.getData(1)
            })
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD')
        },
        getRole(role) {
            return Util.getUserRole(role)
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
