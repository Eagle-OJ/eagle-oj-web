<template>
	<div class="wrapper">
		<div class="account">
			<div class="choose">
				<router-link to="/register" active-class="active" class="register">注册</router-link>
				<router-link to="/login" active-class="active" class="login">登入</router-link>
			</div>
			<Form key="register" v-if="getSwitch=='register'" ref="registerForm" :model="registerForm" :rules="registerForm.ruleValidate" @keyup.enter.native="handleRegister()">
				<FormItem prop="nickname">
					<Input v-model="registerForm.nickname" placeholder="昵称"><Icon type="ios-person-outline" slot="prepend"></Icon></Input>
				</FormItem>
				<FormItem prop="email">
					<Input v-model="registerForm.email" placeholder="邮箱"><Icon type="email" slot="prepend"></Icon></Input>
				</FormItem>
				<FormItem prop="password">
					<Input v-model="registerForm.password" type="password" placeholder="密码"> <Icon type="ios-locked-outline" slot="prepend"></Icon></Input>
				</FormItem>
				<FormItem style="margin-bottom: 0">
					<Button type="error" @click="handleRegister()" :loading="isLoading" long>注 册</Button>
				</FormItem>
			</Form>
			<Form key="login" v-else ref="loginForm" :model="loginForm" :rules="loginForm.ruleValidate" @keyup.enter.native="handleLogin()">
				<FormItem prop="email">
					<Input v-model="loginForm.email" placeholder="邮箱"><Icon type="email" slot="prepend"></Icon></Input>
				</FormItem>
				<FormItem prop="password">
					<Input v-model="loginForm.password" placeholder="密码" type="password"><Icon type="ios-locked-outline" slot="prepend"></Icon></Input>
				</FormItem>
				<FormItem style="margin-bottom: 0">
					<Button type="error" @click="handleLogin()" :loading="isLoading" long>登 入</Button>
				</FormItem>
			</Form>
			<div class="bottom">
				<router-link :to="{path: '/forget_password'}">找回密码</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
	data() {
		return {
			isLoading: false,
			registerForm: {
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
			loginForm: {
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
			this.$refs['registerForm'].validate((valid) => {
				if (valid) {
					this.isLoading = true
					this.$http.post('/account/register', {
						'email': this.registerForm.email,
						'nickname': this.registerForm.nickname,
						'password': this.registerForm.password
					}).then(res => {
						this.$Message.success(res.message)
						this.$router.push('/login')
						this.isLoading = false
					}).catch(res => {
						this.isLoading = false
					})
				} else {
					this.$Message.error('请按照规则填写');
				}
			})
		},
		handleLogin() {
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					this.isLoading = true
					this.$http.post('/account/login', {
						'email': this.loginForm.email,
						'password': this.loginForm.password
					}).then(res => {
						// 保存token到cookie
						Cookie.set('token', res.data)
						// 保存信息到vuex中
						this.$store.dispatch('getUserInfo')
						// 判断是否有redirect，无跳转到dashboard
						let redirect = this.$route.query.redirect
						if (redirect) {
							this.$router.push(redirect)
						} else {
							// 跳转到dashboard
							this.$router.push('/dashboard')
						}
						this.$Message.success(res.message)
						this.isLoading = false
					}).catch(res => {
						this.isLoading = false
					})
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
		margin-top -20px
		.account
			text-align center
			width 300px
			margin 10px auto
			border 1px solid #dddee1
			background #f8f8f9
			padding 10px
			border-radius 5px
			position: relative
			top 20%
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
			.bottom
				margin-top: 10px
				text-align right 
</style>


