<template>
    <div id="container">
        <Card class="my">
            <Spin fix v-if="my.loading"></Spin>
            <p slot="title">已加入的比赛</p>
            <ul>
                <li class="contest-li" v-if="my.data.length == 0" style="text-align: center; font-size: 20px">
                    你很懒，还没有参加过比赛
                </li>
                <li class="contest-li" v-for="item in my.data">
                    <div class="info">
                        <router-link :to="{path: '/contest/'+item.cid+'/problems'}" class="contest-name">{{item.name}}</router-link>
                        <div class="bottom">
                            <Icon type="clock"></Icon>
                            {{getDistanceTime(item.join_time)}} 加入
                        </div>
                    </div>
                    <div class="data">
                        <Tag style="cursor: default" type="border" :color="getProblemStatusColor('AC')">AC - {{item.ac_times}}</Tag>
                        <Tag style="cursor: default" type="border" :color="getProblemStatusColor('WA')">WA - {{item.wa_times}}</Tag>
                        <Tag style="cursor: default" type="border" :color="getProblemStatusColor('RTE')">RTE - {{item.rte_times}}</Tag>
                        <Tag style="cursor: default" type="border" :color="getProblemStatusColor('TLE')">TLE - {{item.tle_times}}</Tag>
                        <Tag style="cursor: default" type="border" :color="getProblemStatusColor('CE')">CE - {{item.ce_times}}</Tag>
                    </div>
                </li>
            </ul>
            <Page v-if="my.data.length != 0" :total="my.total" @on-change="getJoinedContests" simple style="text-align: center; margin-top: 10px"></Page>
        </Card>
        <Card class="other">
            <Spin fix v-if="other.loading"></Spin>
            <p slot="title">比赛列表</p>
            <ul>
                <li class="contest-li" v-if="other.data.length == 0" style="text-align: center; font-size: 20px">
                    暂无比赛
                </li>
                <li class="contest-li" v-for="item in other.data">
                    <div class="info">
                        <router-link :to="{path: '/contest/'+item.cid}" class="contest-name">
                            {{item.name}}                        
                        </router-link>
                        <Icon class="icon" style="color: #ffcc66" type="locked" v-if="item.password"></Icon>
                        <Icon class="icon" style="color: #ed3f14" type="trophy" v-if="item.official == 1"></Icon>
                        <div class="bottom">
                            <Icon type="calendar"></Icon>
                            {{getTime(item.start_time)}} 开始
                            <router-link style="margin-left: 10px" :to="{path: '/profile/'+item.owner}">{{item.nickname}}</router-link> 举办
                            <ContestType class="type" :type="item.type" :total_time="item.total_time"></ContestType>
                        </div>
                    </div>

                    <span class="status">
                        <Tag v-if="getContestStatus(item.start_time, item.end_time) == 0" color="yellow" style="cursor: default" type="dot">即将开始</Tag>
                        <Tag v-else-if="getContestStatus(item.start_time, item.end_time) == 1" color="green" style="cursor: default" type="dot">进行中</Tag>
                        <Tag v-else color="red" style="cursor: default" type="dot">已结束</Tag>
                    </span>

                </li>
            </ul>
            <Page v-if="other.data.length != 0" @on-change="getContests" style="text-align: center; margin-top: 10px" :total="other.total" :page-size="other.pageSize" simple></Page>
        </Card>
    </div>
</template>

<script>
import Util from '@/util'
import ContestType from '@/components/common/ContestType'
export default {
    created() {
        this.getContests(1),
        this.getJoinedContests(1)
    },
    data() {
        return {
            my: {
                total: 0,
                pageSize: 5,
                data: [],
                loading: false
            },
            other: {
                total: 0,
                pageSize: 5,
                data: [],
                loading: false
            },
        }
    },
    methods: {
        getContests(page) {
            this.other.loading = true
            this.$http.get('/contests/opened', {
                params: {
                    page: page,
                    page_size: this.other.pageSize
                }
            }).then(res => {
                res = res.data
                this.other.total = res.total
                this.other.data = res.data
                this.other.loading = false
            }).catch((res) => {
                this.other.loading = false
            })
        },
        getJoinedContests(page) {
            this.my.loading = true
            this.$http.get('/user/joined_contests', {
                params: {
                    page: page,
                    page_size: this.my.pageSize
                }
            }).then(res => {
                this.my.data = res.data.data
                this.my.total = res.data.total
                this.my.loading = false
            }).catch((res) => {
                this.my.loading = false
            })
        },
        getContestStatus(startTime, endTime) {
            let time = new Date().valueOf()
            if (time < startTime) {
                // 即将开始
                return 0;
            } else if (time > endTime) {
                // 已经结束
                return 2
            } else {
                // 正在进行
                return 1
            }
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:mm:ss')
        },
        getDistanceTime(time) {
            return Util.getDistanceTime(time)
        },
        getProblemStatusColor(text) {
            return Util.getProblemStatusColor(text)
        }
    },
    components: {
        ContestType
    }
}
</script>

<style lang="stylus" scoped>
	@import 'Contest.styl'
</style>


