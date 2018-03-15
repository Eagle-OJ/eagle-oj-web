<template>
    <div id="container">
        <v-problem></v-problem>
    </div>
</template>

<script>
import Problem from './problem_detail/Problem'
export default {
    components: {
        'v-problem': Problem
    }
}
</script>

<style lang="stylus" scoped>
    @import 'problem_detail.styl'
</style>


