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
                <Menu mode="horizontal" :active-name="getActive" @on-select="(name) => {this.$router.push('?action='+name)}">
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
                <component :is="getActive" :gid="getGid" :uid="getUid"></component>
            </Card>
        </div>
    </div>
</template>

<script>
import Util from '@/util'
import Contests from './child/Contests'
import Members from './child/Members'
import Settings from './child/Settings'
export default {
    created() {
        this.getGroup()
    },
    data() {
        return {
            group: {},
        }
    },
    methods: {
        getGroup() {
            this.$http.get('/group/'+this.getGid+'/info').then(res => {
                this.group = res.data
            })
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD')
        },
    },
    components: {
        Contests,
        Members,
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
}
</script>

<style lang="stylus" scoped>
    @import 'GroupDetail.styl'
</style>


