<template>
	<div class="wrapper">
    <div class="login">
        <h1>welcome to eagle OJ</h1>
        <div class="choose">
            <router-link to="/register">注册</router-link>
            <span>|</span>
            <router-link to="/login" class="active">登入</router-link>
        </div>
        <Form ref="form" :model="form" :rules="ruleValidate">
            <FormItem prop="email">
                <Input v-model="form.email" placeholder="邮箱"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="form.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem style="margin-bottom: 0">
                <Button type="info" @click="handleSubmit()" long>登 入</Button>
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
                email: '',
                password: '',
            },
            ruleValidate: {
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
                    this.$Message.success('登入成功');
                } else {
                    this.$Message.error('请按照规则填写');
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
	.wrapper
		height 590px
		background url("/src/assets/login.jpg") no-repeat
		padding-top 130px
		padding-left 870px
		.login
			text-align center
			width 350px
			margin 0 auto
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


