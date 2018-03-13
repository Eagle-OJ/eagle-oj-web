<template>
    <div id="container">
        <Row :gutter="10">
            <Col span="16" class="left">
                <Row class="header">
                    <Col span="10">
                        <Input v-model="problems.query" placeholder="搜索关键词" @on-enter="doQuery"></Input>
                    </Col>
                    <Col span="2">
                        <Button shape="circle" icon="android-refresh" type="primary" @click="clearQuery">清除</Button>
                    </Col>
                    <Col span="12" class="sort">
                        <div class="difficulty">
                            <Dropdown trigger="click" style="margin-left: 20px" @on-click="changeDifficult">
                                <a href="javascript:void(0)">
                                    难度
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="-1">不限</DropdownItem>
                                    <DropdownItem name="0">简单</DropdownItem>
                                    <DropdownItem name="1">中等</DropdownItem>
                                    <DropdownItem name="2">困难</DropdownItem>
                                    <DropdownItem name="3">专家</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
                <div class="problems">
                    <Table :loading="loading" :columns="problems.columns" :data="problems.data"></Table>
                    <div class="page">
                        <Page :total="problems.total" :page-size="problems.pageSize" size="small" show-total @on-change="getProblems"></Page>
                    </div>
                </div>
            </Col>
            <Col span="8" class="right">
                <div class="random">
                    <Button icon="shuffle" long type="ghost" @click="randomDoProblem()">随机做题</Button>
                </div>
                <Card class="tags">
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        标签云
                    </p>
                    <router-link class="tag" :exact="true" active-class="active"
                    :to="{path: '/problems', query: {difficult: getDifficult}}">
                        <span class="text">不限</span>
                    </router-link>
                    <router-link class="tag" v-for="item in tags" :key="item.tid" :exact="true" active-class="active"
                    :to="{path: '/problems', query: {difficult: getDifficult, tag: item.name}}">
                        <span class="text">{{item.name}}</span>
                        <span class="number">{{item.used}}</span>
                    </router-link>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Difficult from '@/components/common/Difficult'
export default {
    created() {
        this.getProblems(1)
        this.getTags()
    },
    data() {
        return {
            loading: false,
            tags: [],
            problems: {
                columns: [
                    {
                        title: '状态',
                        render: (h, params) => {
                            if(params.row.status == undefined) {

                            } else if (params.row.status == 'AC') {
                                return h('Icon', {
                                    props: {
                                        type: 'checkmark',
                                        color: '#19be6b'
                                    }
                                })
                            } else {
                                return h('Icon', {
                                    props: {
                                        type: 'minus-round',
                                        color: '#ff9900'
                                    }
                                })
                            }
                            
                        },
                        width: 60
                    },
                    {
                        title: '标题',
                        render: (h, params) => {
                            return h('router-link', {
                                props: {
                                    to: '/problem/'+params.row.pid
                                }
                            }, params.row.title)
                        }
                    },
                    {
                        title: '提交',
                        key: 'submit_times',
                        width: 60
                    },
                    {
                        title: '通过率',
                        render: (h, params) => {
                            let data = ''
                            if (params.row.submit_times == 0) {
                                data = '0.00%'
                            } else {
                                data = ((params.row.ac_times / params.row.submit_times)*100).toFixed(2)+'%'
                            }
                            return h('div', {}, data)
                        },
                        width: 100
                    },
                    {
                        title: '难度',
                        render: (h, params) => {
                            return h(Difficult, {
                                props: {
                                    difficult: params.row.difficult
                                }
                            })
                        },
                        width: 100
                    },
                ],
                data: [],        
                total: 0,
                pageSize: 10,
                uid: -1,
                query: ''
            },
        }
    },
    methods: {
        getProblems(page) {
            if (this.$store.state.userInfo.isLogin) {
                this.problems.uid = this.$store.state.userInfo.uid
            }
            this.loading = true
            this.$http.get('/problems/opened', {
                params: {
                    page: page,
                    page_size: this.problems.pageSize,
                    difficult: this.getDifficult,
                    tag: this.getTag,
                    uid: this.problems.uid,
                    query: this.getQuery
                }
            }).then(res => {
                this.problems.data = res.data.data
                this.problems.total = res.data.total
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        getTags() {
            this.$http.get('/tags').then(res => {
                this.tags = res.data
            })
        },
        doQuery() {
            this.$router.push({
                path: '/problems',
                query: {
                    difficult: this.getDifficult,
                    tag: this.getTag,
                    query: this.problems.query
                }
            })
        },
        changeDifficult(item) {
            this.$router.push({path: '/problems', query: {
                difficult: item,
                tag: this.getTag
            }})
        },
        changeTag(name) {
            this.$router.push({path: '/problems', query: {
                difficult: this.getDifficult,
                tag: name
            }})
        },
        randomDoProblem() {
            this.$http.get('/problem/random').then(res => {
                this.$Message.success('祝你好运')
                this.$router.push('/problem/'+res.data)
            })
        },
        clearQuery() {
            this.problems.query = ''
            this.$router.push({path: '/problems', query: {difficult: this.getDifficult, tag: this.getTag}})
        }
    },
    components: {
        Difficult
    },
    computed: {
        getDifficult() {
            let difficult = this.$route.query.difficult
            if (difficult == undefined) {
                return -1
            } else {
                return difficult
            }
        },
        getTag() {
            let tag = this.$route.query.tag
            if (tag == undefined) {
                return 'null'
            } else {
                return tag
            }
        },
        getQuery() {
            let query = this.$route.query.query
            if(query != undefined) {
                this.problems.query = query
            }
            return query == undefined? 'null': query
        }
    },
    watch: {
        '$store.state.userInfo.isLogin': function() {
            this.getProblems(1)
        },
        'getTag': function() {
            this.getProblems(1)
        },
        'getDifficult': function() {
            this.getProblems(1)
        },
        'getQuery': function() {
            this.getProblems(1)
        }
    }
}
</script>


<style lang="stylus" scoped>
    @import 'problem.styl'
</style>


