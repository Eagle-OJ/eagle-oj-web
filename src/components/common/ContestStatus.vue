<template>
    <span>
        <Tag color="yellow">{{util.getContestStatus(status)}}</Tag>
    </span>
</template>

<script>
import Util from '@/util'
export default {
    props: ['status'],
    data() {
        return {
            util: Util
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>


