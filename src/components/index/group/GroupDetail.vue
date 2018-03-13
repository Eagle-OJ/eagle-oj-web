<template>
    <div class="container">
        <div class="header">
            <div id="container">
                <h1>{{group.name}}</h1>
                <span class="info">
                    <router-link :to="{path: '/profile/'+group.owner}">{{group.nickname}}</router-link> 创建于{{getTime(group.create_time)}}
                </span>
            </div>
        </div>
        <div id="container">
            <Card dis-hover class="body">
                <Menu v-if="isIn" mode="horizontal" :active-name="getActive" @on-select="(name) => {this.$router.push('?action='+name)}">
                    <MenuItem name="contests">
                        <Icon type="ios-paper"></Icon>
                        比赛查看
                    </MenuItem>
                    <MenuItem name="members">
                        <Icon type="ios-people"></Icon>
                        成员
                    </MenuItem>
                    <MenuItem name="settings">
                        <Icon type="settings"></Icon>
                        设置
                    </MenuItem>
                </Menu>
                <component :is="getActive" :gid="getGid" :uid="getUid" :group="group" :user="user" @refreshUser="getUserInfo"></component>
            </Card>
        </div>
    </div>
</template>

<script>
import Util from '@/util'
import Contests from './child/Contests'
import Members from './child/Members'
import Join from './child/Join'
import Settings from './child/Settings'
export default {
    created() {
        this.getGroup()
        this.getUserInfo()
    },
    data() {
        return {
            group: {},
            user: {},
            isIn: false,
        }
    },
    methods: {
        getGroup() {
            this.$http.get('/group/'+this.getGid+'/info').then(res => {
                this.group = res.data
            })
        },
        getUserInfo() {
            if(this.getUid == undefined) {
                return
            }
            this.$http.get('/group/'+this.getGid+'/user/'+this.getUid).then(res => {
                if(! res.data) {
                    this.$router.push('?action=join')
                } else {
                    this.isIn = true
                    this.user = res.data
                }
            }).catch(res => {
                this.$router.push('/groups')
            })
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD')
        },
    },
    components: {
        Contests,
        Members,
        Join,
        Settings,
    },
    computed: {
        getGid() {
            return this.$route.params.gid
        },
        getUid() {
            return this.$store.state.userInfo.uid
        },
        getActive() {
            let action = this.$route.query.action
            if (action == undefined)
                return 'contests'
            else 
                return action 
        },
    },
    watch: {
        getUid: () => {
            this.getUserInfo()
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import 'GroupDetail.styl'
</style>


