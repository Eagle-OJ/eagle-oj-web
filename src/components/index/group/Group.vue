<template>
    <div id="container" class="group">
        <div class="title">
            <span>加入的小组</span>
            <Button type="info" class="button" icon="plus" @click="()=>{this.modal=true}">邀请码加入</Button>
        </div>
        <div class="groups">
            <div class="none" v-if="data.length == 0">你还没有归属</div>
            <Row v-else :gutter="8">
                <Col span="6" class="each" v-for="item in data" :key="item.gid">
                    <Card>
                        <p slot="title">
                            {{item.name}}
                        </p>
                        <router-link :to="{path: '/group/'+item.gid}" slot="extra">
                            <Icon type="forward"></Icon>
                            进入
                        </router-link>
                        <ul>
                            <li>
                                <span class="li-title">组内名称：</span>{{item.group_name}}
                            </li>
                            <li>
                                <span class="li-title">加入时间：</span>{{getTime(item.join_time)}}
                            </li>
                            <li class="datas">
                                <div class="data">
                                    <span class="number" style="color: #19be6b">{{item.ac_times}}</span>
                                    <span class="info">AC次数</span>
                                </div>
                                <div class="data">
                                    <span class="number" style="color: #2b85e4">{{item.finished_problems}}</span>
                                    <span class="info">解题数</span>
                                </div>
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>
            <Page v-if="data.length > 0" :total="total" :page-size="pageSize" simple style="text-align: center; margin-top: 10px" @on-change="getData"></Page>
        </div>
        <Modal v-model="modal">
            <p slot="header">加入小组</p>
            <p>
                <Input v-model="secret" placeholder="小组邀请码"></Input>
            </p>
            <p slot="footer">
                <Button type="success" @click="join()">加入小组</Button>
            </p>
        </Modal>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    created() {
        this.getData(1)
    },
    data() {
        return {
            data: [],
            total: 0,
            pageSize: 4,
            modal: false,
            secret: ''
        }
    },
    methods: {
        getData(page) {
            this.$http.get('/user/joined_groups', {
                params: {
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
            })
        },
        getTime(time) {
            return Util.getDistanceTime(time)
        },
        join() {
            if(this.secret.length == 0) {
                this.$Message.warning('邀请码不得为空')
                return
            }

            let str = this.secret.split('-')
            let gid = str[0]
            if(str.length < 2) {
                this.$Message.error('非法邀请码')
                return
            }
            str.splice(0, 1)
            let tempSecret = ''
            for(let i=0; i<str.length; i++) {
                tempSecret = tempSecret+str[i]+'-'
            }
            tempSecret = tempSecret.substring(0, tempSecret.length-1)
            this.$http.post('/group/'+gid+'/enter', {
                password: tempSecret
            }).then(res => {
                this.$Message.success('小组加入成功')
                this.getData(1)
                this.secret = ''
                this.modal = false
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import 'Group.styl'
</style>


