<template>
	<div class="wrapper">
		<div class="account">
			<div class="choose">
				<router-link to="/register" active-class="active" class="register">注册</router-link>
				<router-link to="/login" active-class="active" class="login">登入</router-link>
			</div>
			<Form v-if="getSwitch=='register'" ref="register_form" :model="register_form" :rules="register_form.ruleValidate" key="register">
				<FormItem prop="nickname">
					<Input v-model="register_form.nickname" placeholder="昵称"></Input>
				</FormItem>
				<FormItem prop="email">
					<Input v-model="register_form.email" placeholder="邮箱"></Input>
				</FormItem>
				<FormItem prop="password">
					<Input v-model="register_form.password" placeholder="密码"></Input>
				</FormItem>
				<FormItem style="margin-bottom: 0">
					<Button type="info" @click="handleRegister()" long>注 册</Button>
				</FormItem>
			</Form>
			<Form v-else ref="login_form" :model="login_form" :rules="login_form.ruleValidate" key="login">
				<FormItem prop="email">
					<Input v-model="login_form.email" placeholder="邮箱"></Input>
				</FormItem>
				<FormItem prop="password">
					<Input v-model="login_form.password" placeholder="密码"></Input>
				</FormItem>
				<FormItem style="margin-bottom: 0">
					<Button type="info" @click="handleLogin()" long>登 入</Button>
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		
	},
	data() {
		return {
			register_form: {
				nickname: '',
				eamil: '',
				password: '',
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
			},
			login_form: {
				email: '',
				password: '',
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
			
		}
	},
	computed: {
		getSwitch() {
			return this.$route.name
		}
	},
	methods: {
		handleRegister() {
			this.$refs['register_form'].resetFields()
			this.$refs['register_form'].validate((valid) => {
				if (valid) {
					this.$Message.success('注册成功');
				} else {
					this.$Message.error('请按照规则填写');
				}
			})
		},
		handleLogin() {
			this.$refs['login_form'].validate((valid) => {
				if (valid) {
					this.$Message.success('登入成功');
				} else {
					this.$Message.error('请按照规则填写');
				}
			})
		}
	},
}
</script>

<style lang="stylus" scoped>
	.wrapper
		height 590px
		background url("/static/background.jpg") no-repeat
		padding-top 100px
		padding-left 870px
		margin-top -20px
		.account
			text-align center
			width 350px
			margin 10px auto
			border 1px solid #dddee1
			background #f8f8f9
			padding 10px
			border-radius 5px
			.choose
				margin-bottom 15px
				display flex
				a
					font-size 20px
					color #495060
					display block
					flex 1
					border-bottom 1px solid #dddee1
					padding 10px
					&.active
						color #2d8cf0
						border-bottom 2px solid #2d8cf0
</style>


