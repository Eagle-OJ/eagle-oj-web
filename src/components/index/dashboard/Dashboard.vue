<template>
    <div id="container" style="max-width: 1000px; padding-top: 20px">
        <Row>
            <Col span="12" class="left">
                <div class="sloved">
                    <Row>
                        <Col span="3" class="img">
                            <Icon type="flag" color="#ed3f14"></Icon>
                        </Col>
                        <Col span="21" class="content">
                            <div class="time">14秒前</div>
                            <div class="detail">
                                <router-link to="#">Danny</router-link>第一个解出了<router-link to="#">耳机里的问题</router-link>
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
                                一起来看看<router-link to="#">大烘焙比赛</router-link>的<router-link to="#">排行榜</router-link>
                            </div>
                            <div class="description">
                                前三名：
                                <Icon type="ribbon-a" color="#c37e00"></Icon><router-link to="#">Danny</router-link>
                                <Icon type="ribbon-a" color="#a1a3a6"></Icon><router-link to="#">Danny</router-link>
                                <Icon type="ribbon-a" color="#78331e"></Icon><router-link to="#">Danny</router-link>
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
                                <router-link to="#">大烘焙比赛</router-link>已经结束，你获得了第5名，查看<router-link to="#">排行榜</router-link>
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
                                你的组长<router-link to="#">Smith</router-link>把你拉入了<router-link to="#">红英被</router-link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col span="12" class="right">
                <div class="announcement">
                    <div class="header">公告</div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
    @import './Dashboard.stylus'
</style>


