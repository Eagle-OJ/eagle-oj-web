<template>
    <div class="problem">
        <div class="header">
            <h1>A+B的经典问题</h1>
            <span class="budget">困 难</span>
            <Button class="favorite" icon="android-favorite-outline" type="ghost">收藏</Button>
        </div>
        <div class="tags">
            <span>知识点：</span>
            <router-link to="#">链表</router-link>
            <router-link to="#">链表</router-link>
            <router-link to="#">链表</router-link>
            </div>
        <div class="nav">
            <Menu mode="horizontal" :active-name="getActive" @on-select="goTo">
                <MenuItem name="description">
                    <Icon type="ios-paper"></Icon>
                    题目
                </MenuItem>
                <MenuItem name="submission">
                    <Icon type="code"></Icon>
                    提交
                </MenuItem>
            </Menu>
        </div>
        <div class="content">
            <keep-alive>
                <component :is="getActive"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Description from './Description.vue'
import Submission from './Submission.vue'

export default {
    props: ['pid', 'cid'],
    components: {
        Description,
        Submission
    },
    methods: {
        goTo(name) {
            this.$router.push('?action='+name)
        }
    },
    computed: {
        getActive() {
            let action = this.$route.query.action
            if (action == undefined)
                return 'description'
            else 
                return action 
        }
    }
}
</script>


<style lang="stylus" scoped>
    @import 'problem.stylus'
</style>

