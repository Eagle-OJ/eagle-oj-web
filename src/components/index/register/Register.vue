<template>
	<div class="wrapper">
	<div class="register">
        <h1>提升自己的编程技能</h1>
        <div class="choose">
            <router-link to="/register" class="active">注册</router-link>
            <span>|</span>
            <router-link to="/login">登入</router-link>
        </div>
        <Form ref="form" :model="form" :rules="ruleValidate">
            <FormItem prop="nickname">
                <Input v-model="form.nickname" placeholder="昵称"></Input>
            </FormItem>
            <FormItem prop="email">
                <Input v-model="form.email" placeholder="邮箱"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="form.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem style="margin-bottom: 0">
                <Button type="info" @click="handleSubmit()" long>注 册</Button>
            </FormItem>
        </Form>
	</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                'nickname': '',
                'eamil': '',
                'password': ''
            },
            ruleValidate: {
                nickname: [
                    { required: true, message: '请输入昵称' },
                    { type: 'string', max: 20, message: '最大不要超出20个字', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '非法邮箱格式'}
                ],
                password: [
                    { required: true, message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$Message.success('注册成功');
                } else {
                    this.$Message.error('请按照规则填写');
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
	.wrapper
		height 590px
		background url("/src/assets/login.jpg") no-repeat
		padding-top 100px
		padding-left 870px
		.register
			text-align center
			width 350px
			margin 10px auto
			border 1px solid #dddee1
			background #f8f8f9
			padding 10px
			border-radius 5px
			h1
				font-weight 400
				margin-bottom 15px
			.choose
				margin-bottom 15px
				span
					margin 0 10px
					font-size 23px
				a
					font-size 20px
					&.active
						color #495060
</style>


