<template>
    <div class="members">
        <Row :gutter="12">
            <Col span="8" class="list">
                <ul>
                    <li v-for="item in data">
                        <Avatar class="avatar" shape="square" :src="$getAvatar(item.avatar)" size="large" />
                        <div class="info">
                            <div class="name">
                                <router-link :to="{path: '/profile/'+item.uid}">{{item.group_name}}</router-link>
                            </div>
                            <div class="data">
                                <span>解题数 {{item.finished_problems}}</span>
                                <span>AC {{item.ac_times}}</span>
                                <span>{{getTime(item.join_time)}} 加入</span>
                            </div>
                        </div>
                    </li>
                    <Page :total="total" :page-size="pageSize" @on-change="getMembers" style="text-align: center; margin-top: 10px" simple></Page>
                </ul>
            </Col>  
            <Col span="16" class="user" v-if="user.group_name">
                <div class="info">
                    <img class="avatar" :src="$getAvatar(user.avatar)"/>
                    <div class="name">
                        {{user.group_name}}
                        <Button type="ghost" size="small" @click="changeGroupName">修改组内名称</Button>
                    </div>
                    <div class="other">
                        <span>已解出 {{user.finished_problems}} 道题</span> 
                        <span>{{getTime(user.join_time)}}加入</span>
                    </div>
                    <div style="clear: both"></div>
                </div>
                <div class="data">
                    <h2>我的数据</h2>
                    <div class="content">
                        <span class="each">
                            <CountTo :endVal="user.submit_times" :mainStyle="mainStyle" :countStyle="countStyle">
                                <span slot="leftText">提交</span>
                                <span slot="rightText">次</span>
                            </CountTo>
                        </span>
                        <span class="each">
                            <CountTo :endVal="user.ac_times" :mainStyle="mainStyle" :countStyle="countStyle">
                                <span slot="leftText">AC</span>
                                <span slot="rightText">次</span>
                            </CountTo>
                        </span>
                        <span class="each">
                            <CountTo :endVal="user.wa_times" :mainStyle="mainStyle" :countStyle="countStyle">
                                <span slot="leftText">WA</span>
                                <span slot="rightText">次</span>
                            </CountTo>
                        </span>
                        <span class="each">
                            <CountTo :endVal="user.ce_times" :mainStyle="mainStyle" :countStyle="countStyle">
                                <span slot="leftText">CE</span>
                                <span slot="rightText">次</span>
                            </CountTo>
                        </span>
                        <span class="each">
                            <CountTo :endVal="user.rte_times" :mainStyle="mainStyle" :countStyle="countStyle">
                                <span slot="leftText">RTE</span>
                                <span slot="rightText">次</span>
                            </CountTo>
                        </span>
                        <span class="each">
                            <CountTo :endVal="user.tle_times" :mainStyle="mainStyle" :countStyle="countStyle">
                                <span slot="leftText">TLE</span>
                                <span slot="rightText">次</span>
                            </CountTo>
                        </span>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import Util from '@/util'
import CountTo from '@/components/common/CountTo'
export default {
    props: ['gid', 'uid', 'user'],
    created() {
        this.getMembers(1)
    },
    data() {
        return {
            data: [],
            groupName: this.user.group_name,
            pageSize: 10,
            total: 0,
            mainStyle: {
                fontSize: '15px'
            },
            countStyle: {
                fontSize: '25px',
                color: '#dc9387'
            }
        }
    },
    methods: {
        getMembers(page) {
            this.$http.get('/group/'+this.gid+'/members', {
                params: {
                    page: page,
                    page_size: this.pageSize,
                    rank: true
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
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
                    this.$http.put('/group/'+this.gid+'/user/'+this.uid, {
                        group_name: this.groupName
                    }).then(res => {
                        this.$Message.success(res.message)
                        this.$emit('refreshUser')
                        this.getMembers(1)
                    })
                }
            })
        },
        getTime(time) {
            return Util.getDistanceTime(time)
        }
    },
    components: {
        CountTo
    }
}
</script>

<style lang="stylus" scoped>
    @import './Members'
</style>


