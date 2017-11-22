<template>
    <div class="footer">
		<ul>
			<li><span>© 2017 eagle OJ</span></li>
			<li><router-link to="#">关于我们</router-link></li>
			<li><router-link to="#">提出建议</router-link></li>
			<li><router-link to="#">我要捐赠</router-link></li>
			<li><router-link to="#">加入我们</router-link></li>
		</ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
    .footer

        margin-top 50px
        border-top 1px solid #dddee1
        box-shadow 8px -1px 3px 0 rgba(0,34,77,0.1)
		ul
			font-size 13px
			position: absolute;
			left 35%
			li
				float  left
				margin-left 30px
			a
				color  #464c5b
			a:hover
				text-decoration underline
				color #2d8cf0
</style>


