<template>
	<div class="navigation">
		<div id="container">
			<div class="logo">
				<img src="../../assets/logo.png" style="height: 60px; margin-top: 6px"/>
			</div>
			<ul>
				<li>
					<router-link to="#" class="active">主页</router-link>
				</li>
				<li>
					<router-link to="#">比赛</router-link>
				</li>
				<li>
					<router-link to="#">题目</router-link>
				</li>
				<li>
					<router-link to="#">排行榜</router-link>
				</li>
			</ul>
			<div>
				<router-link to="/login" class="button-style">登录</router-link>
				<router-link to="/register" class="button-style">注册</router-link>
			</div>
		</div>

	</div>
</template>

<script>
export default {

}
</script>


<style lang="stylus" scoped>
    .navigation
        background white
        height 70px
        box-shadow 8px 1px 3px 0 rgba(0,34,77,.1)
        .logo
            margin-right 50px
            height 70px
            width 120px
            float left
        ul
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
        .button-style
            padding 6px 15px
            font-size 12px
            border-radius 4px
            border: 1px solid #ed3f14;
            background  white
            color #ed3f14
            float  right
            margin-top 20px
            margin-right 30px
            cursor  pointer
            &:hover
                background  #ed3f14
                color white
</style>









