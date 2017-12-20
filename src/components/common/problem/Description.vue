<template>
	<div class="description">
		<Row :gutter="5" class="content">
            <Alert v-if="contest.status!=1" show-icon type="error">本比赛已经不得参加！</Alert>
			<Col span="18" class="left">
				<div>
					<h2>描述</h2>
					<div id="description"></div>
				</div>
				<div>
					<h2>输入规范</h2>
					<div id="input_format"></div>
				</div>
				<div>
					<h2>输出规范</h2>
					<div id="output_format"></div>
				</div>
				<div class="samples">
					<h2>样例</h2>
					<div v-for="item in problem.samples" class="each">
						<h5>输入</h5>
						<pre>{{item.input}}</pre>
						<h5>输出</h5>
						<pre>{{item.output}}</pre>
					</div>
				</div>
			</Col>
			<Col span="6" class="right">
				<div class="contributor">
					<span>出题人：</span>
					<router-link :to="{path: '/profile/'+problem.owner}">{{problem.author}}</router-link>
				</div>
				<Card class="chart">
					<div>
						<canvas ref="myChart" width="300" height="450"></canvas>
					</div>
				</Card>
			</Col>
		</Row>

		<Row class="editor">
			<div class="toolbar">
				<Select v-model="lang" @on-change="changeLang" style="width:150px;margin-right:10px">
					<Option v-for="item in langList" :value="item" :key="item">{{$getLang(item)}}</Option>
				</Select>
				<Tooltip content="使用以前代码" placement="top">
					<Button type="ghost" icon="android-time">回退</Button>
				</Tooltip>
			</div>
			<div id="editor-container">

			</div>
			<div class="submit">
				<Button type="ghost" shape="circle" icon="play" style="margin-right:5px" @click="runTest" :loading="isSubmit">测试运行</Button>
				<Button type="primary" shape="circle" icon="upload" @click="submitCode(false)" :loading="isSubmit" :disabled="contest.status!=1">提交代码</Button>
			</div>
		</Row>

		<Modal class="test_case" v-model="testCases.isOpen" ok-text="运行" title="进行测试运行" @on-ok="submitCode(true)">
			<Alert>至少添加一组测试数据，输入字符串无可不填</Alert>
			<div class="body">
				<div class="line" v-for="(item,index) of testCases.data">
					<div class="input">
						<Input v-model="item.stdin" placeholder="输入字符串"></Input>
					</div>
					<div class="space"></div>
					<div class="output">
						<Input v-model="item.stdout" placeholder="期望结果"></Input>
					</div>
					<div class="trash">
						<Icon type="trash-b" @click.native="deleteTestCase(index)" />
					</div>
				</div>
			</div>
			<p>
				<Button size="small" @click="addTestCase">添加一组</Button>
			</p>
		</Modal>

	</div>
</template>

<script>
import Chart from 'chart.js'
import Util from '@/util'
import Cookie from 'js-cookie'
export default {
    props: ['cid', 'pid', 'problem', 'contest'],
    created() {
        this.langList = this.problem.lang
    },
	mounted() {
	   	this.mountEditor()
        this.mountQuill()
        this.mountChart()
	},
	data() {
		return {
			editor: null,
			quill: {
				description: null,
				inputFormat: null,
				outputFormat: null
			},
			lang: null,
			langList: [],
			testCases: {
				isOpen: false,
				data: []
            },
            isSubmit: false
		}
	},
	methods: {
		changeLang(value) {
			let editor = this.editor
			switch(value) {
				case 'CPP':
					editor.getSession().setMode("ace/mode/c_cpp")
					break;
				case 'C':
					editor.getSession().setMode("ace/mode/c_cpp")
					break
				case 'JAVA8':
					editor.getSession().setMode("ace/mode/java")
					break
				default:
					editor.getSession().setMode("ace/mode/python")
			}
		},
		runTest() {
			this.testCases.isOpen = true
		},
		submitCode(isTestMode) {
			let code = this.editor.getValue()
			if (this.lang == null) {
				this.$Message.warning('选择编程语言')
				return
			}
			if (code.length==0) {
				this.$Message.warning('请输入代码')
				return
			}
			let path = this.$route.fullPath
			let title = this.problem.title
			if (isTestMode) {
				// test mode
				if (this.testCases.data.length==0) {
					this.$Message.warning('请输入测试数据')
					return
                }
                this.isSubmit = true
				this.$http.post('/code', {
					lang: this.lang,
					source_code: code,
					test_cases: this.testCases.data
				}).then(res => {
					this.$store.commit('addSubmission', {
						title: title,
						url: path,
						id: res.data
					})
				}).catch(res => {
                    this.$Message.error(res.message)
                }).finally(() => {
                    this.isSubmit = false
                })
			} else {
                if (! this.$store.state.userInfo.isLogin) {
                    this.$Message.warning('请先进行登入')
                    return
                }
                this.isSubmit = true
				this.$http.post('/user/code', {
                    contest_id: this.cid,
                    problem_id: this.pid,
                    lang: this.lang,
                    source_code: code,
                }).then(res => {
                    this.$store.commit('addSubmission', {
                        title: title,
                        url: path,
                        id: res.data
                    })
                }).catch(res => {
                    this.$Message.error(res.message)
                }).finally(() => {
                    this.isSubmit = false
                })
			}
		},
		addTestCase() {
			let obj = {
				stdin: '',
				stdout: ''
			}
			this.testCases.data.push(obj)
		},
		deleteTestCase(index) {
			let newArray = []
			for (let i=0; i<this.testCases.data.length; i++) {
				if (i != index) {
					newArray.push(this.testCases.data[i])
				}
			}
			this.testCases.data = newArray
        },
		mountChart() {
			let config = {
				type: 'doughnut',
				data: {
					datasets: [{
						data: [
							this.problem.AC,
							this.problem.CE,
							this.problem.RTE,
							this.problem.TLE,
							this.problem.WA],
						backgroundColor: [
							Util.getProblemStatusColor('AC'),
							Util.getProblemStatusColor('CE'),
							Util.getProblemStatusColor('RTE'),
							Util.getProblemStatusColor('TLE'),
							Util.getProblemStatusColor('WA')
						],
					}],
					labels: [
						Util.convertProblemStatus('AC'),
						Util.convertProblemStatus('CE'),
						Util.convertProblemStatus('RTE'),
						Util.convertProblemStatus('TLE'),
						Util.convertProblemStatus('WA')
					]
				},
				options: {
					responsive: true,
					legend: {
						display: true,
						labels: {
							usePointStyle: true,
						}
					},
					title: {
						display: true,
						text: '提 交 次 数 - '+this.problem.submitTimes+'次'
					},
					animation: {
						animateScale: true,
						animateRotate: true
					},
				}
			};
			let myChart = new Chart(this.$refs.myChart, config)
		},
		mountQuill() {
			let config = {
				theme: 'snow',
				modules: {
					toolbar: false,
					formula: true
				}
			}
			this.quill.description = new Quill(document.getElementById('description'), config)
			this.quill.description.enable(false)
			this.quill.description.setContents(this.problem.description)

			this.quill.inputFormat = new Quill(document.getElementById('input_format'), config)
			this.quill.inputFormat.enable(false)
			this.quill.inputFormat.setContents(this.problem.description)

			this.quill.outputFormat = new Quill(document.getElementById('output_format'), config)
			this.quill.outputFormat.enable(false)
			this.quill.outputFormat.setContents(this.problem.description)
		},
		mountEditor() {
			let editor = ace.edit('editor-container')
			this.editor = editor
			editor.setTheme("ace/theme/github");
			editor.setShowPrintMargin(false)
			document.getElementById('editor-container').style.fontSize='14px';
		}
    },
}
</script>


<style lang="stylus" scoped>
	@import './description.styl'
</style>

