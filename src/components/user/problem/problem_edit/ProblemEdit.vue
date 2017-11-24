<template>
    <div id="container">
        <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
            <MenuItem name="description">
                <Icon type="ios-paper"></Icon>
                内容管理
            </MenuItem>
            <MenuItem name="test_case">
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
                综合设置
            </MenuItem>
            <MenuItem name="back">
                <Icon type="android-arrow-back"></Icon>
                返回
            </MenuItem>
        </Menu>

        <div class="content" style="margin-top: 20px">
            <keep-alive>
                <component :is="getActive"></component>
            </keep-alive>
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
    data() {
        return {

        }
    },
    methods: {
        goTo(name) {
            if (name == 'back') {
                this.$router.push('/user/problem')
            } else {
                this.$router.push('/problem/:pid/edit/'+name)
            }
        }
    },
    components: {
        'description': Description,
        'test_case': TestCase,
        'moderator': Moderator,
        'statistics': Statistics,
        'setting': Setting
    },
    computed: {
        getActive() {
            return this.$route.params.action
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>

