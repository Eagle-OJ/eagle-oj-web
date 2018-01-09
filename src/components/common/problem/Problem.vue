<template>
    <div class="problem">
        <Spin size="large" fix v-if="problemLoading || contestLoading"></Spin>
        <div class="header">
            <h1>{{problem.title}}</h1>
            <Difficult :difficult="problem.difficult"></Difficult>
            <router-link v-if="getCid>0" :to="{path: '/contest/'+this.getCid+'/problems'}">
                <Button class="favorite" icon="ios-arrow-back" type="info">返回比赛</Button>
            </router-link>
            <Button v-else class="favorite" icon="android-favorite-outline" type="ghost">收藏</Button>
        </div>
        <div class="tags">
            <span>知识点：</span>
            <router-link :to="{path: '/problems?difficult=-1&tag='+item.name}" v-for="item in tags" :key="item.tid">{{item.name}}</router-link>
            </div>
        <div class="nav">
            <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
                <MenuItem name="description">
                    <Icon type="ios-paper"></Icon>
                    题目
                </MenuItem>
                <MenuItem name="submission">
                    <Icon type="code"></Icon>
                    我的提交
                </MenuItem>
            </Menu>
        </div>
        <div class="content" v-if="! (problemLoading || contestLoading)">
            <keep-alive>
                <component :is="getActive" :cid="getCid" :pid="getPid" :problem="problem" :contest="contest"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Description from './Description.vue'
import Submission from './Submission.vue'
import Difficult from '@/components/common/Difficult'
export default {
    created() {
        this.getProblem()
        if(this.getCid > 0) {
            this.getContest()
        }
    },
    data() {
        return {
            problemLoading: false,
            contestLoading: false,
            problem: {
                title: '',
                description: '',
                inputFormat: '',
                outputFormat: '',
                samples: [],
                submitTimes: 0,
                AC: 0,
                CE: 0,
                RTE: 0,
                TLE: 0,
                WA: 0,
                owner: 0,
                nickname: 0,
            },
            contest: null,
            tags: []
        }
    },
    methods: {
        getProblem() {
            this.problemLoading = true
            this.getTags()
            let url
            if(this.getCid>0) {
                url = '/contest/'+this.getCid+'/problem/'+this.getPid
            } else {
                url = '/problem/'+this.getPid
            }
            this.$http.get(url).then(res => {
                let data = res.data
                this.problem.title = data.title
				this.problem.description = data.description
				this.problem.inputFormat = data.input_format
				this.problem.outputFormat = data.output_format
                this.problem.samples = data.samples
                this.problem.submitTimes = data.submit_times
                this.problem.lang = data.lang
				this.problem.AC = data.ac_times
				this.problem.CE = data.ce_times
				this.problem.RTE = data.rte_times
				this.problem.TLE = data.tle_times
				this.problem.WA = data.wa_times
				this.problem.owner = data.owner
                this.problem.nickname = data.nickname
			}).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.problemLoading = false
            })
        },
        getContest() {
            this.contestLoading = true
            this.$http.get('/contest/'+this.getCid).then(res => {
                this.contest = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.contestLoading = false
            })
        },
        getTags() {
            this.$http.get('/problem/'+this.getPid+'/tags').then(res => {
                this.tags = res.data
            })
        },
        goTo(name) {
            this.$router.push('?action='+name)
        },
    },
    computed: {
        getActive() {
            let action = this.$route.query.action
            if (action == undefined)
                return 'description'
            else 
                return action 
        },
        getPid() {
            return this.$route.params.pid
        },
        getCid() {
            let cid = this.$route.params.cid
            if(cid == undefined) {
                return 0
            } else {
                return cid
            }
        }
    },
    watch: {
        'getPid': function() {
            this.getProblem()
        }
    },
    components: {
        Description,
        Submission,
        Difficult
    },
}
</script>


<style lang="stylus" scoped>
    @import 'problem.styl'
</style>

