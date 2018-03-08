<template>
	<div id="navigation" class="navigation">
		<div id="container">
			<div class="title">
                <router-link to="/">
                    <h1>{{getTitle}}</h1>
                </router-link>
			</div>
			<ul class="nav">
				<li>
					<router-link to="/dashboard" active-class="active" v-if="isLogin">主页</router-link>
				</li>
				<li>
					<router-link to="/problems" active-class="active">题目</router-link>
				</li>
                <li>
					<router-link to="/contest" active-class="active" v-if="isLogin">比赛</router-link>
				</li>
                <li>
                    <router-link to="/groups" active-class="active" v-if="isLogin">小组</router-link>
                </li>
				<li>
					<router-link to="/leaderboard" active-class="active">排行榜</router-link>
				</li>
			</ul>
			<div class="account" v-if="! isLogin">
				<router-link to="/login" class="button-style" style="margin-right: 30px">登录</router-link>
				<router-link to="/register" class="button-style">注册</router-link>
			</div>
            <div class="account" v-else>
                <Dropdown class="menu" @on-click="goTo" trigger="click">
                    <a href="javascript:void(0)">
                        {{$store.state.userInfo.nickname}}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="/user">个人中心</DropdownItem>
                        <DropdownItem name="/admin" v-if="$store.state.userInfo.role>=8">管理中心</DropdownItem>
                        <DropdownItem name="/logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <router-link to="/user">
                    <img class="avatar" :src="$getAvatar($store.state.userInfo.avatar)"/>
                </router-link>
            </div>
		</div>

	</div>
</template>

<script>
export default {
    methods: {
        goTo(name) {
            if (name == '/logout') {
                this.$store.commit('logout')
            } else {
                this.$router.push(name)
            }
        }
    },
    computed: {
        getTitle() {
            let title = this.$store.state.setting.web_title
            if (title == undefined || title.length == 0) {
                return 'EagleOJ'
            } else {
                return title
            }
        },
        isLogin() {
            return this.$store.state.userInfo.isLogin
        }
    }
}
</script>


<style lang="stylus">
    #navigation.navigation
        background white
        height 70px
        box-shadow 8px 1px 3px 0 rgba(0,34,77,.1)
        margin-bottom 20px
        .title
            margin-right 50px
            height 70px
            float left
            h1
                line-height 70px
                font-weight 500
                letter-spacing 1px
        .nav
            line-height 70px
            li
                float left
                a
                    display block
                    padding 0 15px
                    height 70px
                    color #ed3f14
                    font-family "Helvetica"
                    font-size 16px
                    font-weight 600
                    margin-left 15px
                    &:hover
                        color white
                        background #ed3f14
                    &.active
                        border-bottom  solid #ed3f14 4px
        .account
            float right 
            height 70px
            line-height 70px            
            .button-style
                padding 6px 15px
                font-size 12px
                border-radius 4px
                border: 1px solid #ed3f14;
                background  white
                color #ed3f14
                margin-top 20px
                cursor  pointer
                &:hover
                    background  #ed3f14
                    color white
            .avatar
                height 50px
                width 50px
                border-radius 10px
                float right 
                margin-left 10px
                margin-top 10px
            .menu
                line-height 0
                height auto
                float none
                .ivu-select-dropdown
                    z-index 1000
</style>









