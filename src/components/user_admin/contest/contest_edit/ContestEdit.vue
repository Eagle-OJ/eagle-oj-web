<template>
    <div id="container">
        <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
            <MenuItem name="description">
                <Icon type="ios-paper"></Icon>
                比赛管理
            </MenuItem>
            <MenuItem name="other">
                <Icon type="code"></Icon>
                其他
            </MenuItem>
            <MenuItem name="back">
                <Icon type="android-arrow-back"></Icon>
                返回
            </MenuItem>
        </Menu>

        <div class="content" style="margin-top: 20px">
            <keep-alive>
                <component :is="getActive" :cid="getCid"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Description from './Description'
import Other from './Other'
export default {
    data() {
        return {

        }
    },
    methods: {
        goTo(name) {
            if (name == 'back') {
                this.$router.push('/user/contest')
            } else {
                this.$router.push('/user_admin/contest/1/edit?action='+name)
            }
        }
    },
    components: {
        Description,
        Other
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


