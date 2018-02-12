<template>
    <div class="problem">
        <Spin size="large" fix v-if="dataLoading"></Spin>
        <div class="header" v-if="data">
            <h1>{{data.problem.title}}</h1>
            <Difficult :difficult="data.problem.difficult"></Difficult>
            <span class="tool">
                <router-link v-if="getGid>0" :to="{path: '/group/'+this.getGid}">
                    <Button class="favorite" icon="ios-arrow-back" type="info">返回小组</Button>
                </router-link>
                <router-link v-if="getCid>0" :to="{path: '/contest/'+this.getCid+'/problems'}">
                    <Button class="favorite" icon="ios-arrow-back" type="info">返回比赛</Button>
                </router-link>
                <Button v-if="false" class="favorite" icon="android-favorite-outline" type="ghost">收藏</Button>
            </span>
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
                <MenuItem name="submission" v-if="isLogin">
                    <Icon type="code"></Icon>
                    我的提交
                </MenuItem>
                <MenuItem name="all-submission" v-if="isLogin">
                    <Icon type="code-working"></Icon>
                    所有提交
                </MenuItem>
            </Menu>
        </div>
        <div class="content" v-if="data">
            <component :is="getActive" :cid="getCid" :pid="getPid" :gid="getGid" :data="data"></component>
        </div>
    </div>
</template>

<script>
import Description from './Description.vue'
import Submission from './Submission.vue'
import AllSubmission from './AllSubmission.vue'
import Difficult from '@/components/common/Difficult'
export default {
    created() {
        this.getData()
    },
    data() {
        return {
            dataLoading: false,
            data: null,
            tags: []
        }
    },
    methods: {
        getData() {
            this.dataLoading = true
            this.getTags()
            let url
            if(this.getCid>0) {
                url = '/contest/'+this.getCid+'/problem/'+this.getPid
            } else {
                url = '/problem/'+this.getPid
            }
            this.$http.get(url).then(res => {
                this.data = res.data
                this.dataLoading = false
			}).catch(res => {
                this.dataLoading = false
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
        },
        getGid() {
            if (this.data.contest) {
                return this.data.contest.group
            } else {
                return 0
            }
        },
        isLogin() {
            return this.$store.state.userInfo.isLogin
        }
    },
    watch: {
        'getPid': function() {
            this.getData()
        }
    },
    components: {
        Description,
        Submission,
        AllSubmission,
        Difficult
    },
}
</script>


<style lang="stylus" scoped>
    @import 'problem.styl'
</style>

