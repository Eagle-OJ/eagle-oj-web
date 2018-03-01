<template>
	<div id="app">
		<div id="global-submission">
			<div class="each" v-for="(item,index) in getSubmissions">
				<h2>
					<router-link :to="item.path">
						{{item.title}}
					</router-link>
				</h2>
				<a class="close" @click="removeNotice(index)">
					<Icon type="close-round" />
				</a>
				<div class="content">
					<Spin v-if="item.response == null">
						<Icon v-if="item.status != '错误'" type="load-c" size=18 class="icon-loading"></Icon>
						<div>{{item.status}}</div>
					</Spin>
					<div class="response" v-else>
						<ProblemResult :result="item.response.result"></ProblemResult>
						<Tag color="green">{{item.response.memory}} M</Tag>
						<Tag color="green">{{item.response.time}} S</Tag>
						<router-link :to="{path: '/submission/'+item.id}" target="_blank">
							<Button type="primary" size="small">查看详情</Button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<router-view/>
		<v-footer id="footer"></v-footer>
	</div>
</template>

<script>
import ProblemResult from '@/components/common/ProblemResult'
import Footer from '@/components/index/Footer'

export default {
	name: 'app',
	mounted() {
		if (document.getElementsByClassName("loading")[0]) {
			document.body.removeChild(document.getElementsByClassName("loading")[0])
		}
	},
	methods: {
		removeNotice(index) {
			this.$store.commit('deleteSubmission', index)
		},

	},
	computed: {
		getSubmissions() {
			return this.$store.state.submissions
		}
	},
	components: {
		ProblemResult,
		'v-footer': Footer
	}
}
</script>

<style lang="stylus">
#app
	min-width 100%
	min-height 100%
	position relative
	padding-bottom 50px
	#global-submission
		position fixed
		top 24px
		right 0
		margin-right 24px
		width 335px
		z-index 1000
		.each
			box-shadow 0 1px 6px rgba(0,0,0,.2)
			padding 10px 16px
			background #fff
			border-radius 4px
			overflow hidden
			margin-bottom 10px
			position relative
			&:after
				background #2d8cf0
				content: ''
				display block
				width 4px
				position absolute
				top 0
				left 0
				bottom 0
			h2
				padding-right 10px
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
				font-size 14px
				a
					color #495060
			.close
				position absolute
				top 14px
				right 16px
			.content
				text-align center
				.icon-loading
					animation: ani-icon-loading 1s linear infinite;
				@keyframes ani-icon-loading
					from
						transform: rotate(0deg)
					50%
						transform: rotate(180deg)
					to
						transform: rotate(360deg)
	#container
		max-width 1000px
		margin 0 auto
	#footer
		position absolute
		bottom 0
		width 100%
</style>
