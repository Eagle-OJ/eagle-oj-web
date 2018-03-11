<template>
    <div id="container">
        <Alert type="warning" v-if="! isEditable">题目处于公开分享状态，只有管理员能够对题目进行修改</Alert>
        <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
            <MenuItem name="description">
                <Icon type="ios-paper"></Icon>
                内容管理
            </MenuItem>
            <MenuItem name="testCase">
                <Icon type="code"></Icon>
                测试用例
            </MenuItem>
            <MenuItem name="moderator">
                <Icon type="ios-people"></Icon>
                编者管理
            </MenuItem>
            <MenuItem name="statistics">
                <Icon type="stats-bars"></Icon>
                题目统计
            </MenuItem>
            <MenuItem name="setting">
                <Icon type="settings"></Icon>
                设置
            </MenuItem>
            <MenuItem name="back">
                <Icon type="android-arrow-back"></Icon>
                返回
            </MenuItem>
        </Menu>

        <div class="content" style="margin-top: 20px; position: relative">
            <Spin size="large" fix v-if="loading"></Spin>
            <component :is="getActive" :pid="getPid" :problem="problem" :isEditable="isEditable" v-if="! loading"></component>
        </div>
    </div>
</template>

<script>
import Description from './Description'
import TestCase from './TestCase'
import Moderator from './Moderator'
import Statistics from './Statistics'
import Setting from './Setting'
export default {
    created() {
        this.getProblem()
    },
    data() {
        return {
            problem: null,
            loading: false
        }
    },
    methods: {
        goTo(name) {
            if (name == 'back') {
                this.$router.push('/user/problem')
            } else {
                this.$router.push('/user_admin/problem/'+this.getPid+'/edit?action='+name)
            }
        },
        getProblem() {
            this.loading = true
            this.$http.get('/problem/'+this.getPid).then(res => {
                this.problem = res.data.problem
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        }
    },
    components: {
        Description,
        TestCase,
        Moderator,
        Statistics,
        Setting
    },
    computed: {
        getActive() {
            let action = this.$route.query.action
            return action == undefined ? 'description' : action
        },
        getPid() {
            return this.$route.params.pid
        },
        isEditable() {
            if(this.problem == null) {
                return false
            } 
            if(this.$store.state.userInfo.role >= 8) {
                return true
            }
            return this.problem.status != 2
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>

