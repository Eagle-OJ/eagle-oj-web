<template>
    <div class="contests">
        <ul>
            <li class="contest-li" v-if="data.length == 0" style="text-align: center; font-size: 20px">
                暂无比赛
            </li>
            <li class="contest-li" v-for="item in data">
                <div class="info">
                    <router-link :to="{path: '/contest/'+item.cid}" class="contest-name">
                        {{item.name}}                        
                    </router-link>
                    <Icon class="icon" style="color: #ffcc66" type="locked" v-if="item.password"></Icon>
                    <Icon class="icon" style="color: #ed3f14" type="trophy" v-if="item.official == 1"></Icon>
                    <div class="bottom">
                        <Icon type="calendar"></Icon>
                        {{getTime(item.start_time)}} 开始
                        <ContestType class="type" :type="item.type" :total_time="item.total_time"></ContestType>
                    </div>
                </div>

                <span class="status">
                    <Tag v-if="getContestStatus(item.start_time, item.end_time) == 0" color="yellow" style="cursor: default" type="dot">即将开始</Tag>
                    <Tag v-else-if="getContestStatus(item.start_time, item.end_time) == 1" color="green" style="cursor: default" type="dot">进行中</Tag>
                    <Tag v-else color="red" style="cursor: default" type="dot">已结束</Tag>
                </span>

            </li>
        </ul>
        <Page v-if="data.length != 0" @on-change="getData" style="text-align: center; margin-top: 10px" :total="total" :page-size="pageSize" simple></Page>
    </div>
</template>

<script>
import Util from '@/util'
import ContestType from '@/components/common/ContestType'
export default {
    props: ['gid'],
    created() {
        this.getData(1)
    },
    data() {
        return {
            data: [],
            total: 0,
            pageSize: 10,
        }
    },
    methods: {
        getData(page) {
            this.$http.get('/group/'+this.gid+'/contests', {
                params: {
                    page: 1,
                    page_size: this.pageSize,
                    is_valid: false
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
            })
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:MM')
        },
        getContestStatus(startTime, endTime) {
            let time = new Date().valueOf()
            if (time < startTime) {
                // 即将开始
                return 0;
            } else if (time > endTime) {
                // 已经结束
                return 2
            } else {
                // 正在进行
                return 1
            }
        },
    },
    components: {
        ContestType
    }
}
</script>

<style lang="stylus" scoped>
    @import './Contests'
</style>


