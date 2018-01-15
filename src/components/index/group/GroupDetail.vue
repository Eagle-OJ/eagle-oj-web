<template>
    <div id="container">
        <Row :gutter="20">
            <Col span="14" class="left">
                <Card class="description" v-if="description != null">
                    <p slot="title">小组介绍</p>
                    <div class="content">
                        <p><span class="title">小组名称:</span>{{description.name}}</p>
                        <p><span class="title">创建时间:</span>{{getTime(description.create_time)}}</p>
                        <p><span class="title">组长:</span><router-link :to="{path: '/profile/'+description.owner}">{{description.nickname}}</router-link></p>
                    </div>
                </Card>
                <Input v-if="isIn" v-model="realName" class="real_name" :maxlength="20">
                    <span slot="prepend">组内名称</span>
                    <Button slot="append" icon="checkmark" @click="updateRealName"></Button>
                </Input>
                <div class="join">
                    <Button key="join" v-if="!isIn" class="button" type="success" size="large" @click="joinGroup">加入小组</Button>
                    <Button key="quit" v-else class="button" type="error" size="large" @click="quitGroup">退出小组</Button>
                </div>
            </Col>
            <Col span="10" class="right">
                <Card>
                    <p slot="title">组员信息</p>
                    <ul class="members">
                        <li v-for="item in members">
                            <img :src="$getAvatar(item.avatar)">
                            <router-link :to="{path: '/profile/'+item.uid}" title="查看个人资料">{{item.nickname}}</router-link>
                        </li>
                    </ul>
                    <Page :current="1" :total="total" :page-size="pageSize" simple style="text-align: center"></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Format from 'date-fns/format'
import cn from 'date-fns/locale/zh_cn'
export default {
    created() {
        this.getGroup()
        this.judgeIsIn()
        this.getMembers(1)
    },
    data() {
        return {
            description: null,
            members: [],
            pageSize: 10,
            total: 0,
            isIn: false,
            password: null,
            realName: ''
        }
    },
    methods: {
        getGroup() {
            this.$http.get('/group/'+this.getGid).then(res => {
                this.description = res.data
            })
        },
        getMembers(page) {
            this.$http.get('/group/'+this.getGid+'/members', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.members = res.data.data
                this.total = res.data.total
            })
        },
        judgeIsIn() {
            if(this.$store.state.userInfo.isLogin) {
                this.$http.get('/group/'+this.getGid+'/user/'+this.getUid).then(res => {
                    this.isIn = true
                    this.realName = res.data.real_name
                }).catch(res => {
                    this.isIn = false
                })
            }
        },
        updateRealName() {
            if(this.realName.length ==0 || this.realName.length >20) {
                this.$Message.warning('组内姓名不符合要求')
                return
            }
            this.$http.put('/group/'+this.getGid+'/user/'+this.getUid, {real_name: this.realName}).then(res => {
                this.$Message.success(res.message)
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        joinGroup() {
            if (! this.$store.state.userInfo.isLogin) {
                this.$Message.warning('请先登入')
                return
            }

            if (this.description.password) {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                maxlength: 6,
                                type: 'password',
                                placeholder: '请输入密码'
                            },
                            on: {
                                input: (val) => {
                                    this.password = val;
                                }
                            },
                            
                        })
                    },
                    onOk: () => {
                        this.doJoinGroup()
                    },
                })
            } else {
                this.doJoinGroup()
            }
        },
        doJoinGroup() {
            this.$http.post('/group/'+this.getGid+'/enter', {
                password: this.password
            }).then(res => {
                this.$Message.success(res.message)
                this.isIn = true
                this.getMembers(1)
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        quitGroup() {
            this.$http.delete('/group/'+this.getGid+'/user/'+this.$store.state.userInfo.uid).then(res => {
                this.isIn = false
                this.getMembers(1)
                this.$Message.success('退出成功')
            }).catch(res => {
                this.$Message.error('退出失败')
            })
        },
        getTime(time) {
            return Format(new Date(time), 'YYYY-MM-DD', {
                locale: cn
            })
        }
    },
    computed: {
        getGid() {
            return this.$route.params.gid
        },
        getUid() {
            return this.$store.state.userInfo.uid
        }
    },
    watch: {
        'getGid': function() {
            this.getGroup()
            this.getMembers(1)
            this.judgeIsIn()
        },
        '$store.state.userInfo.isLogin': function () {
            this.judgeIsIn()
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import 'GroupDetail.styl'
</style>


