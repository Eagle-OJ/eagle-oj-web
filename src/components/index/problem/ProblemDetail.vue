<template>
    <div id="container">
        <v-problem :pid="getPid" :cid="getCid"></v-problem>
    </div>
</template>

<script>
import Problem from '@/components/common/problem/Problem'
export default {
    computed: {
        getPid() {
            return this.$route.params.pid
        },
        getCid() {
            let cid = this.$route.params.cid
            if(cid == undefined) {
                return 0
            } else {
                return cid
            }
        }
    },
    components: {
        'v-problem': Problem
    }
}
</script>

<style lang="stylus" scoped>
    @import 'problem_detail.stylus'
</style>


