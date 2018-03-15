<template>
    <div id="container" class="dashboard">
        <Card shadow class="nav" :padding="0">
            <ul>
                <li @click="randomDoProblem()">
                    <Icon type="shuffle"></Icon>
                    随机做题
                </li>
                <li @click="() => {this.$router.push('/help')}">
                    <Icon type="help-circled"></Icon>
                    帮助
                </li>
            </ul>
        </Card>
        <Row :gutter="16">
            <Col span="16" class="left">
                <Card class="each" shadow v-if="message.data.length==0">
                    <div class="none-message">暂无消息</div>
                </Card>
                <template v-else>
                    <Card class="each" shadow v-for="item in message.data" :key="item.mid">
                        <div class="message" v-if="item.type == 0">
                            <Row>
                                <Col span="2" class="img">
                                    <Icon type="ios-email" color="#4b3a76"></Icon>
                                </Col>
                                <Col span="22" class="content">
                                    <div class="time">{{getTime(item.create_time)}}</div>
                                    <div class="detail">
                                        <span v-html="item.content"></span>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div class="contest" v-if="item.type == 1">
                            <Row>
                                <Col span="2" class="img">
                                    <Icon type="trophy" color="#fea116"></Icon>
                                </Col>
                                <Col span="22" class="content">
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
                    </Card>
                    <Card shadow>
                        <Page style="text-align:center" :total="message.total" :page-size="message.pageSize" @on-change="getMessage" show-elevator></Page>
                    </Card>
                </template>
                <div class="sloved" v-if="false">
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
                <div class="message" v-if="false">
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
                <div class="message" v-if="false">
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
            </Col>
            <Col span="8" class="right">
                <Card shadow class="user" v-if="isLogin">
                    <Avatar class="avatar" shape="square" size="large" :src="$getAvatar($store.state.userInfo.avatar)" />
                    <div class="detail">
                        <h3><router-link :to="{path: '/profile/'+$store.state.userInfo.uid}">{{$store.state.userInfo.nickname}}</router-link></h3>
                        <p>
                            <span>提交 {{$store.state.userInfo.submit_times}}</span>
                            <span>通过 {{$store.state.userInfo.ac_times}}</span>
                            <span>AC {{util.getACRate($store.state.userInfo.ac_times,$store.state.userInfo.submit_times)}}</span>
                        </p>
                    </div>
                </Card>
                <Card shadow class="announcements">
                    <p slot="title">
                        <Icon type="speakerphone"></Icon>
                        公告
                    </p>
                    <ul>
                        <li style="text-align: center" v-if="announcements.list.length == 0">暂无公告</li>
                        <li class="announcement" v-for="(item, index) in announcements.list" @click="showAnnouncement(index)">
                            {{item.title}}
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <Modal v-model="announcements.switch" :title="announcements.title" class="announcement-detail">
            <p class="time">发布时间：{{getTime(announcements.time)}}</p>
            <p class="content">{{announcements.content}}</p>
            <div slot="footer">
                <Button type="success" size="large" long @click="closeAnnouncement">我知道了</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    mounted() {
        this.getMessage(1)
        this.getAnnouncements()
    },
    data() {
        return {
            announcements: {
                list: [],
                title: '',
                content: '',
                time: 0,
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
            this.$http.get('/messages/user', {
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
            return Util.getDistanceTime(time)
        },
        showAnnouncement(index) {
            this.announcements.switch = true
            this.announcements.title = this.announcements.list[index].title
            this.announcements.content = this.announcements.list[index].content
            this.announcements.time = this.announcements.list[index].create_time
        },
        closeAnnouncement() {
            this.announcements.switch = false
        },
        getAnnouncements() {
            this.$http.get('/announcements').then(res => {
                this.announcements.list = res.data
            })
        },
        randomDoProblem() {
            this.$http.get('/problem/random').then(res => {
                this.$Message.success('祝你好运')
                this.$router.push('/problem/'+res.data)
            })
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.userInfo.isLogin
        }
    }
}
</script>

<style lang="stylus">
    @import './Dashboard.styl'
</style>


