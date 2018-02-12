<template>
	<div id="container">
        <Card class="user-info" v-if="profile!=null">
            <div class="nickname">{{profile.nickname}}
                <Icon type="male" v-if="profile.gender==1" color="#2d8cf0"></Icon>
                <Icon type="female" v-else-if="profile.gender==2" color="hotpink"></Icon>
                <Icon type="transgender" v-else color="#80848f"></Icon>
            </div>
			<div class="motto">{{profile.motto}}</div>
			<div class="user-detail">
				<Row>
					<Col span="12">
                        <Icon type="android-done" style="color:green"></Icon>
                        通过率: {{util.getACRate(profile.ac_times, profile.submit_times)}}
					</Col>
					<Col span="12">
                        <Icon type="clock" style="color: #2d8cf0;"></Icon>
                        比赛次数: {{profile.contest_times}}次
					</Col>
				</Row>
			</div>
            <img class="avatar" :src="$getAvatar(this.profile.avatar)">
        </Card>
        <Row class="middle" :gutter="20">
            <Col span="9">
                <Card class="left">
                    <p slot="title">
                        提交次数
                        <Badge v-if="profile!=null" :count="profile.submit_times"></Badge>
                    </p>
                    <div class="charts">
                        <canvas ref="timesChart" width="250" height="250"></canvas>
                    </div>
                </Card>
            </Col>
            <Col span="15">
                <Card class="right">
                    <p slot="title">最近做题</p>
                    <Table :show-header="false" :data="userProblems.data" :columns="userProblems.columns"></Table>
                </Card>
            </Col>
        </Row>
		
        <Card class="user_log">
            <p slot="title">提交统计</p>
            <p>
                <span style="float: right">
                    <Button size="small" type="info" @click="getUserLog('week')">近1星期</Button>
                    <Button size="small" type="info" @click="getUserLog('month')">近1月</Button>
                </span>
            </p>
            <canvas ref="logChart" width="700" height="280"></canvas>
        </Card>
	</div>
</template>


<script>
import Chart from 'chart.js'
import Util from '@/util'
import ProblemResult from '@/components/common/ProblemResult'
export default {
    mounted() {
        this.mountLogChart()
        this.mountTimesChart()
        this.initial()
    },
    data() {
        return {
            util: Util,
            profile: null,
            userProblems: {
                data: [],
                columns: [
                    {
                        render: (h, params) => {
                            return h('router-link', {
                                props: {
                                    to: {
                                        path: '/problem/'+params.row.pid
                                    }
                                }
                            }, params.row.title)
                        }
                    },
                    {
                        render: (h, params) => {
                            return h(ProblemResult, {
                                props: {
                                    result: params.row.status
                                }
                            })
                        }
                    }
                ]
            },
            timesChart: null,
            logData: {
                label: [],
                AC: [],
                CE: [],
                RTE: [],
                WA: [],
                TLE: [],
            },
            logChart: null
        }
    },
    methods: {
        initial() {
            this.getUserProblem()
            this.getUserProfile()
            this.getUserLog('week')
        },
        getUserProfile() {
            this.$http.get('/profile/'+this.getUid).then(res => {
                this.profile = res.data
                this.updateTimesChart()
            })
        },
        getUserProblem() {
            this.$http.get('/user_log/problem_history', {
                params: {
                    uid: this.getUid,
                    page: 1,
                    page_size: 10
                }
            }).then(res => {
                this.userProblems.data = res.data.data
            })
        },
        getUserLog(type) {
            this.logData.label = []
            this.logData.AC = []
            this.logData.CE = []
            this.logData.RTE = []
            this.logData.WA = []
            this.logData.TLE = []
            if(type == 'week') {
                this.logData.title = '最近一星期'
            } else {
                this.logData.title = '最近一月'
            }
            this.$http.get('/user_log/coding_frequency', {
                params: {
                    uid: this.getUid,
                    time: type
                }
            }).then(res => {
                let data = res.data
                for(let i=0; i<data.length; i++) {
                    let log = data[i]
                    this.logData.label.push(log.date)
                    this.logData.AC.push(log.ac_times? log.ac_times: 0)
                    this.logData.CE.push(log.ce_times? log.ce_times: 0)
                    this.logData.RTE.push(log.rte_times? log.rte_times: 0)
                    this.logData.WA.push(log.wa_times? log.wa_times: 0)
                    this.logData.TLE.push(log.tle_times? log.tle_times: 0)
                }
                this.updateLogChart()
            })
        },
        mountTimesChart() {
            this.timesChart = new Chart(this.$refs.timesChart, {
                type: 'doughnut',
                data: {
                    labels: [
						Util.convertProblemStatus('AC'),
						Util.convertProblemStatus('CE'),
						Util.convertProblemStatus('RTE'),
						Util.convertProblemStatus('TLE'),
						Util.convertProblemStatus('WA')
					],
                    datasets: [],
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
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                }
            })
        },
        updateTimesChart() {
            this.timesChart.data.datasets = [{
                data: [  
                    this.profile.ac_times,
                    this.profile.ce_times,
                    this.profile.rte_times,
                    this.profile.tle_times,
                    this.profile.wa_times],
                backgroundColor: [
                    Util.getProblemStatusColor('AC'),
                    Util.getProblemStatusColor('CE'),
                    Util.getProblemStatusColor('RTE'),
                    Util.getProblemStatusColor('TLE'),
                    Util.getProblemStatusColor('WA')
                ],
            }]
            this.timesChart.update()
        },
        mountLogChart() {
            this.logChart = new Chart(this.$refs.logChart, {
                type: 'line',
                options: {
                    responsive: true,
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero:true,
                                suggestedMax: 10,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '次数'
                            }
                        }]
                    },
                }
            });
        },
        updateLogChart() {
            this.logChart.options.title = {
                display: true,
                text: this.logData.title,
                fontSize:16
            },
            this.logChart.data.labels = this.logData.label
            this.logChart.data.datasets = [
                {
                    label: Util.convertProblemStatus('AC'),
                    backgroundColor: Util.getProblemStatusColor('AC'),
                    borderColor: Util.getProblemStatusColor('AC'),
                    data: this.logData.AC,
                    fill:false
                },
                {
                    label: Util.convertProblemStatus('WA'),
                    backgroundColor: Util.getProblemStatusColor('WA'),
                    borderColor: Util.getProblemStatusColor('WA'),
                    data: this.logData.WA,
                    fill:false
                },
                {
                    label: Util.convertProblemStatus('RTE'),
                    backgroundColor: Util.getProblemStatusColor('RTE'),
                    borderColor: Util.getProblemStatusColor('RTE'),
                    data: this.logData.RTE,
                    fill:false
                },
                {
                    label: Util.convertProblemStatus('TLE'),
                    backgroundColor: Util.getProblemStatusColor('TLE'),
                    borderColor: Util.getProblemStatusColor('TLE'),
                    data: this.logData.TLE,
                    fill:false
                },
                {
                    label: Util.convertProblemStatus('CE'),
                    backgroundColor: Util.getProblemStatusColor('CE'),
                    borderColor: Util.getProblemStatusColor('CE'),
                    data: this.logData.CE,
                    fill:false
                },
            ]
            this.logChart.update()
        }
    },
    computed: {
        getUid() {
            return this.$route.params.uid
        }
    },
    watch: {
        'getUid': function() {
            this.initial()
        }
    },
    components: {
        ProblemResult
    }
}
</script>


<style lang="stylus" scoped>
	@import 'Profile.styl'
</style>


