<template>
    <div id="container">
        <Card class="title">
            <h1>{{group.name}}</h1>
            <span class="other">
                <span class="leader">
                    组长:            
                    <router-link :to="{path: '/profile/'+group.owner}">{{group.leader}}</router-link>
                </span>
                <span class="create_time">创建于{{getTime(group.create_time)}}</span>
            </span>
        </Card>
        <Card class="security" v-if="! isIn" style="text-align: center">
            <h2 class="warning">你尚未加入此小组</h2>
            <div class="password">
                <Input v-if="group.password" v-model="password" type="password" :maxlength="6" style="width: 250px; margin: 0 auto">
                    <Icon type="locked" slot="prepend">http://</Icon >
                    <Button slot="append" @click="joinGroup">加入</Button>
                </Input>
                <Button v-else type="success" @click="joinGroup">加入小组</Button>
            </div>
            
        </Card>
        <Card class="group" v-else>
            <Row :gutter="32" class="user" v-if="user != null">
                <Col span="4"><img class="avatar" :src="$getAvatar(user.avatar)"/></Col>
                <Col span="20" class="right">
                    <div class="nickname">
                        <router-link :to="{path: '/profile/'+user.uid}">{{user.group_name}}</router-link>
                        <Button type="ghost" size="small" @click="changeGroupName">修改组内名称</Button>
                    </div>
                    <div class="join-time">
                        {{getDistanceTime(user.join_time)}}加入小组
                    </div>
                    <div class="data">
                        <div class="each">
                            <span class="number">{{user.finished_problems}}</span>
                            <span class="info">解决题目</span>
                        </div>
                        <div class="each">
                            <span class="number">{{user.submit_times}}</span>
                            <span class="info">提交</span>
                        </div>
                        <div class="each">
                            <span class="number">{{user.ac_times}}</span>
                            <span class="info">AC</span>
                        </div>
                        <div class="each">
                            <span class="number">{{user.wa_times}}</span>
                            <span class="info">WA</span>
                        </div>
                        <div class="each">
                            <span class="number">{{user.rte_times}}</span>
                            <span class="info">RTE</span>
                        </div>
                        <div class="each">
                            <span class="number">{{user.ce_times}}</span>
                            <span class="info">CE</span>
                        </div>
                        <div class="each">
                            <span class="number">{{user.tle_times}}</span>
                            <span class="info">TLE</span>
                        </div>
                    </div>
                    <Button class="quit" size="small" type="error" icon="log-out" @click="quitGroup">退出</Button>
                    <span class="invite">邀请链接：{{getUrl}}</span>
                </Col>
            </Row>
            <div class="divider"></div>
            <Row :gutter="16">
                <Col span="17">
                    <h4>组员列表</h4>
                    <Table :data="members.data" :columns="members.columns"></Table>
                    <Page style="margin-top: 10px; text-align: center" :total="members.total" :page-size="members.pageSize" @on-change="getMembers" simple></Page>
                </Col>
                <Col span="7">
                    <h4>小组赛</h4>
                    <ul class="contests">
                        <li v-if="contests.length == 0">暂无比赛</li>
                        <li v-for="item in contests">
                            <router-link :to="{path: '/contest/'+item.cid}">{{item.name}}</router-link>
                            <contest-status :status="item.status" class="badge"></contest-status>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import Util from '@/util'
import ContestType from '@/components/common/ContestType'
import ContestStatus from '@/components/common/ContestStatus'
export default {
    created() {
        this.init()
    }, 
    data() {
        return {
            password: null,
            group: {},
            isIn: false,
            user: null,

            groupName: '',
            members: {
                total: 0,
                data: [],
                columns: [
                    {
                        title: '组内名称',
                        render: (h, params) => {
                            return h('router-link', {
                                props: {
                                    to: '/profile/'+params.row.uid
                                }
                            }, params.row.group_name)
                        },
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '解决题数',
                        key: 'finished_problems',
                        width: 85,
                        align: 'center'
                    },
                    {
                        title: '提交',
                        key: 'submit_times',
                        align: 'center'
                    },
                    {
                        title: 'AC',
                        key: 'ac_times',
                        align: 'center'
                    },
                    {
                        title: 'WA',
                        key: 'wa_times',
                        align: 'center'
                    },
                    {
                        title: 'RTE',
                        key: 'rte_times',
                        align: 'center'
                    },
                    {
                        title: 'CE',
                        key: 'ce_times',
                        align: 'center'
                    },
                    {
                        title: 'TLE',
                        key: 'tle_times',
                        align: 'center'
                    }
                ],
                pageSize: 10,
            },
            contests: []
        }
    },
    methods: {
        init() {
            this.getGroup()
            this.getGroupUserInfo()
        },
        getGroup() {
            this.$http.get('/group/'+this.getGid+'/info').then(res => {
                this.group = res.data
            })
        },
        getGroupUserInfo() {
            if(this.$store.state.userInfo.isLogin) {
                this.$http.get('/group/'+this.getGid+'/user/'+this.getUid).then(res => {
                    if(res.data) {
                        this.user = res.data
                        this.isIn = true
                        this.getMembers(1)
                        this.getGroupContests()
                    } else {
                        this.isIn = false
                    }    
                }).catch(res => {
                    this.isIn = false
                })
            }
        },
        getMembers(page) {
            this.$http.get('/group/'+this.getGid+'/members', {
                params: {
                    page: page,
                    page_size: this.members.pageSize
                }
            }).then(res => {
                this.members.data = res.data.data
                this.members.total = res.data.total
            })
        },
        getGroupContests() {
            this.$http.get('/group/'+this.getGid+'/contests', {
                params: {
                    page: 1,
                    page_size: 10,
                    is_valid: true
                }
            }).then(res => {
                this.contests = res.data.data
            })
        },
        joinGroup() {
            if (! this.$store.state.userInfo.isLogin) {
                this.$Message.warning('请先登入')
                return
            }

            this.$http.post('/group/'+this.getGid+'/enter', {
                password: this.password
            }).then(res => {
                this.$Message.success(res.message)
                this.init()
            })
        },
        changeGroupName() {
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.groupName,
                            autofocus: true,
                            maxlength: 20,
                            placeholder: '请输入组内名称'
                        },
                        on: {
                            input: (val) => {
                                this.groupName = val;
                            }
                        }
                    })
                },
                onOk: () => {
                    if(this.groupName.length ==0 || this.groupName.length >20) {
                        this.$Message.warning('组内姓名不符合要求')
                        return
                    }
                    this.$http.put('/group/'+this.getGid+'/user/'+this.getUid, {
                        group_name: this.groupName
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.getGroupUserInfo()
                        this.getMembers(1)
                    })
                }
            })
        },
        quitGroup() {
            this.$Modal.confirm({
                title: '确认退出小组',
                content: '<p>一旦退出小组，组内所有数据会被清除</p>',
                onOk: () => {
                    this.$http.delete('/group/'+this.getGid+'/user/'+this.getUid).then(res => {
                        this.init()
                        this.$Message.success('退出成功')
                    })
                },
            })
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD')
        },
        getDistanceTime(time) {
            return Util.getDistanceTime(time)
        }
    },
    components: {
        ContestType,
        ContestStatus
    },
    computed: {
        getGid() {
            return this.$route.params.gid
        },
        getUid() {
            return this.$store.state.userInfo.uid
        },
        getUrl() {
            return window.location.href
        }
    },
    watch: {
        'getGid': function() {
            this.init()
        },
        '$store.state.userInfo.isLogin': function () {
            this.getGroupUserInfo()
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import 'GroupDetail.styl'
</style>


