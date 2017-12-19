<template>
    <div id="container">
        <Row>
            <Col span="16" class="left">
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
                <div class="contest">
                    <Row>
                        <Col span="3" class="img">
                            <Icon type="trophy" color="#fea116"></Icon>
                        </Col>
                        <Col span="21" class="content">
                            <div class="time">14秒前</div>
                            <div class="detail">
                                一起来看看<router-link to="/contest/1">大烘焙比赛</router-link>的<router-link to="/leadboard">排行榜</router-link>
                            </div>
                            <div class="description">
                                前三名：
                                <Icon type="ribbon-a" color="#c37e00"></Icon><router-link to="/profile/1">Danny</router-link>
                                <Icon type="ribbon-a" color="#a1a3a6"></Icon><router-link to="/profile/1">Danny</router-link>
                                <Icon type="ribbon-a" color="#78331e"></Icon><router-link to="/profile/1">Danny</router-link>
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
            </Col>
            <Col span="8" class="right">
                <div class="user">
                    <Avatar class="avatar" shape="square" size="large" src="/static/avatar.jpg" />
                    <div class="detail">
                        <h3><router-link :to="{path: '/porfile/'+$store.state.userInfo.uid}">{{$store.state.userInfo.nickname}}</router-link></h3>
                        <p>
                            <span>提交 {{$store.state.userInfo.submit_times}}</span>
                            <span>提交 {{$store.state.userInfo.ac_times}}</span>
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
export default {
    data() {
        return {
            announcement: {
                title: '',
                switch: false
            },
            util: Util
        }
    },
    methods: {
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

<style lang="stylus" scoped>
    @import './Dashboard.styl'
</style>


