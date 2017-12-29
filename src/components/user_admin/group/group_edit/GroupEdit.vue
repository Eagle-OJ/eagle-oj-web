<template>
    <div id="container">
        <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
            <MenuItem name="description">
                <Icon type="ios-paper"></Icon>
                小组编辑
            </MenuItem>
            <MenuItem name="members">
                <Icon type="ios-paper"></Icon>
                组员管理
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
            <keep-alive>
                <component v-if="group != null" :is="getActive" :gid="getGid" :group="group"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Description from './Description'
import Members from './Members'
import Setting from './Setting'
export default {
    created() {
        this.getGroup()
    },
    data() {
        return {
            loading: false,
            group: null
        }
    },
    methods: {
        goTo(name) {
            if (name == 'back') {
                this.$router.push('/user/group')
            } else {
                this.$router.push('/user_admin/group/'+this.getGid+'/edit?action='+name)
            }
        },
        getGroup() {
            this.loading = true
            this.$http.get('/user/group/'+this.getGid).then(res => {
                this.group = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            }).finally(() => {
                this.loading = false
            })
        }
    },
    components: {
        Description,
        Members,
        Setting,
    },
    computed: {
        getActive() {
            let action = this.$route.query.action
            return action == undefined ? 'description' : action
        },
        getGid() {
            return this.$route.params.gid
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


