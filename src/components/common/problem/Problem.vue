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
            <v-description>xx</v-description>
        </div>
    </div>
</template>

<script>
import Description from './Description.vue'

export default {
    created() {
        console.log(this.$route.params)
    },
    components: {
        'v-description': Description
    }
}
</script>


<style lang="stylus" scoped>
    @import 'problem.stylus'
</style>

