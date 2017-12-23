<template>
	<div id="container">
		<div class="user-info" v-if="profile!=null">
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
		</div>
		<div class="other-thing">
			<div class="title"><span>个人成就</span></div>
			<div class="achieve">
                <span>
                    <Icon type="edit" style="font-size: 15px;margin-right: 8px;"></Icon>完成题目
                </span>
				<span style="margin-left: 90px">
                    <Badge count="20/600"></Badge>
                </span>
			</div>
			<div class="charts">
				<canvas id="myChart" width="400" height="400"></canvas>
			</div>
		</div>
		<div class="submissions">
			<div class="title"><span>最近提交</span></div>
			<div>
				<table cellpadding="0" cellspacing="0">
					<tr v-for="i in 9">
						<td width="300px">A+B problem</td>
						<td width="200px">
							2017-01-01
						</td>
						<td width="200px">
							<Tag color="green" style="margin-right: 20px">java</Tag>
							<Tag color="red">Fail</Tag>
						</td>
					</tr>
					<tr>
						<td width="300px">A+B problem</td>
						<td width="200px">
							2017-01-01
						</td>
						<td width="200px">
							<Tag color="green" style="margin-right: 20px">java</Tag>
							<Tag color="blue">Accpet</Tag>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="clear: both"></div>
		<div class="recent-charts">
			<div class="title"><span>提交统计</span></div>
			<canvas id="liner" width="680" height="200"></canvas>
		</div>
		<div class="rank-charts">
			<div class="title">Rank积分</div>
			<canvas id="rank-liner" width="680" height="220"></canvas>
		</div>
		<div style="clear: both"></div>
	</div>
</template>


<script>
import Chart from 'chart.js'
import Util from '@/util'
export default {
    created() {
        this.getUserProfile()
    },
    mounted() {
        this.doughnut();
        this.recentSub();
        this.rankline();
    },
    data() {
        return {
            profile: null,
            util: Util
        }
    },
    methods: {
        getUserProfile() {
            this.$http.get('/profile/'+this.getUid).then(res => {
                this.profile = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        doughnut() {
            let ctx = document.getElementById('myChart').getContext('2d');
            let chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'doughnut',

                // The data for our dataset
                data: {
                    labels: ["Accept", "TLE", "Wrong Answer", "Other", "Runtime Error"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: [
                            '#4bc0c0',
                            '#ff6384',
                            '#ffcd56',
                            '#36a2eb',
                            '#ff9f40',
                        ],
                        borderColor: 'white',
                        data: [10, 15, 15, 20, 40],
                    }]
                },

                // Configuration options go here
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
            });
        },
        recentSub(){
            let ctx = document.getElementById('liner').getContext('2d');
            let chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',
                data: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [{
                            label: "Accept",
                            backgroundColor:"#0099FF",
                            borderColor: '#0099FF',
                            data: [0, 10, 5, 2, 20, 30, 45],
                            pointBackgroundColor:'#0099FF',
                            pointRadius:4,
                            fill:false
                        },
                        {
                            label: "Wrong Answer",
                            backgroundColor:"#FF0033",
                            borderColor: '#FF0033',
                            data: [30, 12, 9, 8, 21, 42, 17],
                            pointBackgroundColor:'#FF0033',
                            pointRadius:4,
                            fill:false,
                            borderDash: [5, 5],
                        },
                        {
                            label: "Submission",
                            backgroundColor: "#339900",
                            borderColor: '#339900',
                            data: [30, 22, 14, 19, 41, 17, 23],
                            pointBackgroundColor: '#339900',
                            pointRadius: 4,
                            fill:false
                        }]
                },

                // Configuration options go here
                options: {
                    responsive: true,
                    title:{
                        display: true,
                        text:'一周活动',
                        fontSize:16
                    },
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
                            scaleLabel: {
                                display: true,
                                labelString: '分数'
                            }
                        }]
                    }
                }
            });
        },
        rankline(){
            let ctx = document.getElementById('rank-liner').getContext('2d');
            let chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [{
                        label: "Score",
                        backgroundColor: '#ff9f40',
                        borderColor: '#ff9f40',
                        data: [1800, 2100, 2000, 2300, 2200, 1999, 2000],
                        fill:false
                    },]
                },

                // Configuration options go here
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
                            scaleLabel: {
                                display: true,
                                labelString: 'score'
                            },
                            ticks: {
                                max: 2500,
                                min: 1800,
                                stepSize: 100
                            }
                        }],
                        xAxes: [{
                            display: true,
                            time: {
                                unit: 'second'
                            },
                            ticks: {
                                callback: function(dataLabel, index) {
                                    // Hide the label of every 2nd dataset. return null to hide the grid line too
                                    return index % 2 === 0 ? dataLabel : '';
                                }
                            }
                        }]
                    }
                },
            });
        }
    },
    computed: {
        getUid() {
            return this.$route.params.uid
        }
    }
}
</script>


<style lang="stylus" scoped>
	@import 'Profile.styl'
</style>


