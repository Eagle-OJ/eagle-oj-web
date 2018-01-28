<template>
    <div id="container">
        <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
            <MenuItem name="description">
                <Icon type="ios-paper"></Icon>
                比赛管理
            </MenuItem>
            <MenuItem name="problems">
                <Icon type="document-text"></Icon>
                题目管理
            </MenuItem>
            <MenuItem name="back">
                <Icon type="android-arrow-back"></Icon>
                返回
            </MenuItem>
        </Menu>

        <div class="content" style="margin-top: 20px; position: relative">
            <Spin size="large" fix v-if="loading"></Spin>
            <keep-alive>
                <component :is="getActive" :cid="getCid" :contest="contest" v-if="! loading"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Description from './Description'
import Problems from './Problems'
import Setting from './Setting'
export default {
    created() {
        this.getContest()
    },
    data() {
        return {
            loading: false,
            contest: {}
        }
    },
    methods: {
        goTo(name) {
            if (name == 'back') {
                this.$router.push('/user/contest')
            } else {
                this.$router.push('/user_admin/contest/'+this.getCid+'/edit?action='+name)
            }
        },
        getContest() {
            this.loading = true
            this.$http.get('/contest/'+this.getCid, {
                is_detail: true
            }).then(res => {
                this.contest = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.loading = false
            })
        }
    },
    components: {
        Description,
        Setting,
        Problems
    },
    computed: {
        getActive() {
            let action = this.$route.query.action
            return action == undefined ? 'description' : action
        },
        getCid() {
            return this.$route.params.cid
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


