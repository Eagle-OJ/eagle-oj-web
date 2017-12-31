<template>
    <div id="container" class="dashboard">
        <Row>
            <Col span="16" class="left">
                <template v-for="item in message.data">
                    <div class="message" v-if="item.type == 1">
                        <Row>
                            <Col span="3" class="img">
                                <Icon type="ios-email" color="#4b3a76"></Icon>
                            </Col>
                            <Col span="21" class="content">
                                <div class="time">{{getTime(item.create_time)}}</div>
                                <div class="detail">
                                    <span v-html="item.content"></span>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div class="contest" v-if="item.type == 2">
                        <Row>
                            <Col span="3" class="img">
                                <Icon type="trophy" color="#fea116"></Icon>
                            </Col>
                            <Col span="21" class="content">
                                <div class="time">{{getTime(item.create_time)}}</div>
                                <div class="detail">
                                    一起来看看<router-link :to="{path: '/contest/'+item.json_content.cid}">{{item.json_content.name}}</router-link>的<router-link :to="{path: '/contest/'+item.json_content.cid+'/leaderboard'}">排行榜</router-link>
                                </div>
                                <div class="description">
                                    前三名：
                                    <template v-if="item.json_content.rank[0]">
                                        <Icon type="ribbon-a" color="#c37e00"></Icon><router-link :to="{path: '/profile/'+item.json_content.rank[0].uid}">{{item.json_content.rank[0].nickname}}</router-link>
                                    </template>
                                    <template v-if="item.json_content.rank[1]">
                                        <Icon type="ribbon-a" color="#a1a3a6"></Icon><router-link :to="{path: '/profile/'+item.json_content.rank[1].uid}">{{item.json_content.rank[1].nickname}}</router-link>
                                    </template>
                                    <template v-if="item.json_content.rank[2]">
                                        <Icon type="ribbon-a" color="#78331e"></Icon><router-link :to="{path: '/profile/'+item.json_content.rank[2].uid}">{{item.json_content.rank[2].nickname}}</router-link>
                                    </template>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </template>
                <div class="sloved">
                    <Row>
                        <Col span="3" class="img">
                            <Icon type="flag" color="#ed3f14"></Icon>
                        </Col>
                        <Col span="21" class="content">
                            <div class="time">14秒前</div>
                            <div class="detail">
                                <router-link to="/profile/1">Danny</router-link>第一个解出了<router-link to="/problem/1">耳机里的问题</router-link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="message">
                    <Row>
                        <Col span="3" class="img">
                            <Icon type="ios-email" color="#4b3a76"></Icon>
                        </Col>
                        <Col span="21" class="content">
                            <div class="time">14秒前</div>
                            <div class="detail">
                                <router-link to="/contest/1">大烘焙比赛</router-link>已经结束，你获得了第5名，查看<router-link to="/leaderboard">排行榜</router-link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="message">
                    <Row>
                        <Col span="3" class="img">
                            <Icon type="ios-email" color="#4b3a76"></Icon>
                        </Col>
                        <Col span="21" class="content">
                            <div class="time">14秒前</div>
                            <div class="detail">
                                你的组长<router-link to="/profile/1">Smith</router-link>把你拉入了<router-link to="/contest/1">红英被</router-link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="pager">
                    <Page :current="1" :total="message.total" :page-size="message.pageSize" @on-change="getMessage" simple></Page>
                </div>
            </Col>
            <Col span="8" class="right">
                <div class="user">
                    <Avatar class="avatar" shape="square" size="large" src="/static/avatar.jpg" />
                    <div class="detail">
                        <h3><router-link :to="{path: '/profile/'+$store.state.userInfo.uid}">{{$store.state.userInfo.nickname}}</router-link></h3>
                        <p>
                            <span>提交 {{$store.state.userInfo.submit_times}}</span>
                            <span>通过 {{$store.state.userInfo.ac_times}}</span>
                            <span>AC {{util.getACRate($store.state.userInfo.ac_times,$store.state.userInfo.submit_times)}}</span>
                        </p>
                    </div>
                </div>
                <div class="random">
                    <Button icon="shuffle" long type="ghost" @click="randomDoProblem()">随机做题</Button>
                </div>
                <div class="announcement">
                    <div class="header"><Icon type="information-circled"></Icon>公告</div>
                    <ul>
                        <li v-for="(index, i) in 5" :key="i" @click="showAnnouncement(index)">
                            <span>{{index}}.</span>低级赛季隆重开始发而发而非爱我发呢阿瑟发
                        </li>
                    </ul>
                </div>
            </Col>
        </Row>
        <Modal v-model="announcement.switch" title="这个是网站公告" class="announcement-detail">
            <p class="time">发布时间：1990-12-12</p>
            <p class="content">这里是公告哈哈哈哈哈哈，的发哦飞啊飞发疯爱妃啊法恩莎阿瑟发额啊发。</p>
            <div slot="footer">
                <Button type="success" size="large" long @click="closeAnnouncement">我知道了</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Util from '@/util'
import DistanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import cn from 'date-fns/locale/zh_cn'
export default {
    created() {
        this.getMessage(1)
    },
    data() {
        return {
            announcement: {
                title: '',
                switch: false
            },
            message: {
                data: [],
                total: 0,
                pageSize: 10,
            },
            util: Util
        }
    },
    methods: {
        getMessage(page) {
            this.$http.get('/message', {
                params: {
                    page: page,
                    page_size: this.message.pageSize
                }
            }).then(res => {
                this.message.data = res.data.data
                this.message.total = res.data.total
            })
        },
        getTime(time) {
            return DistanceInWordsToNow(new Date(time), {
                addSuffix: true,
                locale: cn
            })
        },
        showAnnouncement() {
            this.announcement.switch = true
        },
        closeAnnouncement() {
            this.announcement.switch = false
        },
        randomDoProblem() {
            this.$router.push('/problem/1')
        }
    }
}
</script>

<style lang="stylus">
    @import './Dashboard.styl'
</style>


