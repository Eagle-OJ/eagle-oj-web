<template>
    <div id="container">
        <Row :gutter="24">
            <Col span="13" class="left">
                <div class="content">
                    <h2>Leader!</h2>
                    <div class="first" v-if="best[0]">
                        <div class="medal">
                            <embed src="/static/gold.svg" type="image/svg+xml" width="150px" height="150px"/>
                        </div>
                        <div class="profile">
                            <img class="avatar" :src="$getAvatar(best[0].avatar)">
                            <router-link :to="{path: '/profile/'+best[0].uid}" title="查看资料">{{best[0].nickname}}</router-link>
                        </div>
                    </div>
                    <div class="second-third" v-if="best[1]">
                        <div class="second">
                            <div class="medal">
                                <embed src="/static/silver.svg" type="image/svg+xml" width="150px" height="150px"/>
                            </div>
                            <div class="profile">
                                <img class="avatar" :src="$getAvatar(best[1].avatar)">
                                <router-link :to="{path: '/profile/'+best[1].uid}" title="查看资料">{{best[1].nickname}}</router-link>
                            </div>
                        </div>
                        <div class="third"  v-if="best[2]">
                            <div class="medal">
                                <embed src="/static/cuprum.svg" type="image/svg+xml" width="150px" height="150px"/>
                            </div>
                            <div class="profile">
                                <img class="avatar" :src="$getAvatar(best[2].avatar)">
                                <router-link :to="{path: '/profile/'+best[2].uid}" title="查看资料">{{best[2].nickname}}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span="11" class="right">
                <div class="content">
                    <div class="rank-head" style="margin-left: 5px">
                        <div class="flex3">昵称</div>
                        <div class="flex2">解决题数</div>
                        <div class="flex2">提交次数</div>
                        <div class="flex2">通过率</div>
                    </div>
                    <div class="rank-body" v-for="item in people">
                        <div class="flex3">
                            <router-link :to="{path: '/profile/'+item.uid}" title="查看资料">{{item.nickname}}</router-link>
                        </div>
                        <div class="flex2">{{item.finished_problems}}</div>
                        <div class="flex2">{{item.submit_times}}</div>
                        <div class="flex2">{{getACRate(item.ac_times, item.submit_times)}}</div>
                    </div>
                    <Page :total="total" :page-size="pageSize" @on-change="getPeople" size="small" show-total style="text-align: right;"></Page>
                </div>
            </Col>
        </Row>
	</div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.getBest()
        this.getPeople(1)
    },
    data() {
        return {
            best: [],
            people: [],
            pageSize: 15,
            total: 0,
        }
    },
    methods: {
        getBest() {
            this.$http.get('/leaderboard', {
                params: {
                    page: 1,
                    page_size: 3
                }
            }).then(res => {
                this.best = res.data.data
            })
        },
        getPeople(page) {
            this.$http.get('/leaderboard', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.people = res.data.data
                this.total = res.data.total
            })
        },
        getACRate(ac, total) {
            return Util.getACRate(ac, total)
        }
    }
}
</script>

<style lang="stylus" scoped>
	@import 'leaderboard.styl'
</style>


