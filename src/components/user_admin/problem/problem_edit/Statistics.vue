<template>
    <div class="statistics">
        <div class="each">
            <CountTo :endVal="problem.used_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">被使用</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        <div class="each">
            <CountTo :endVal="problem.submit_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">提交</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        <div class="each">
            <CountTo :endVal="problem.ac_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">AC</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        <div class="each">
            <CountTo :endVal="problem.wa_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">WA</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        <div class="each">
            <CountTo :endVal="problem.ce_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">CE</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        <div class="each">
            <CountTo :endVal="problem.rte_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">RTE</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        <div class="each">
            <CountTo :endVal="problem.tle_times" :mainStyle="mainStyle" :countStyle="countStyle">
                <span slot="leftText">TLE</span>
                <span slot="rightText">次</span>
            </CountTo>
        </div>
        
    </div>
</template>

<script>
import CountTo from '@/components/common/CountTo'
export default {
    props: ['problem'],
    data() {
        return {
            mainStyle: {
                fontSize: '20px'
            },
            countStyle: {
                fontSize: '30px',
                color: '#dc9387'
            }
        }
    },
    components: {
        CountTo
    }
}
</script>

<style lang="stylus" scoped>
    .statistics
        display flex
        .each
            flex 1
            text-align center
</style>




