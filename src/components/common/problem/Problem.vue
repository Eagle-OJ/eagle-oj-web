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
            <router-link to="description" active-class="active"  class="description">
                <Icon type="document-text"></Icon> 题目
            </router-link>
            <router-link to="submission" active-class="active" class="submission">
                <Icon type="code"></Icon> 提交
            </router-link>
        </div>
        <div class="content">
            <keep-alive>
                <v-description v-if="$route.params.action=='description'"></v-description>
            </keep-alive>
            <keep-alive>
                <v-submission v-if="$route.params.action=='submission'"></v-submission>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Description from './Description.vue'
import Submission from './Submission.vue'

export default {
    created() {
        console.log(this.$route.params)
    },
    components: {
        'v-description': Description,
        'v-submission': Submission
    }
}
</script>


<style lang="stylus" scoped>
    @import 'problem.stylus'
</style>

