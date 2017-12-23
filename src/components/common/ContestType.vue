<template>
    <span>
        <Tag color="blue">{{util.getContestType(type)}}</Tag>
        <Tag color="green">{{util.getContestTimeType(type, total_time)}}</Tag>
    </span>
</template>

<script>
import Util from '@/util'
export default {
    props: ['type', 'total_time'],
    data() {
        return {
            util: Util
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>


