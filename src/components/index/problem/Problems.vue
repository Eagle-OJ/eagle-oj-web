<template>
    <div id="container">
        <Row :gutter="10">
            <Col span="16">
                <Card shadow class="left">
                    <Row class="header">
                        <Col span="10">
                            <Input v-model="problems.query" placeholder="搜索关键词" @on-enter="doQuery"></Input>
                        </Col>
                        <Col span="2">
                            <Button shape="circle" icon="android-refresh" type="primary" @click="clearQuery">清除</Button>
                        </Col>
                    </Row>
                    <div class="problems">
                        <Table :loading="loading" :columns="problems.columns" :data="problems.data" @on-sort-change="changeSort"></Table>
                        <div class="page">
                            <Page :total="problems.total" :page-size="problems.pageSize" size="small" show-total @on-change="getProblems"></Page>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col span="8" class="right">
                <div class="random">
                    <Button icon="shuffle" long type="info" @click="randomDoProblem()">随机做题</Button>
                </div>
                <Card shadow class="tags">
                    <p slot="title">
                        <Icon type="pricetags"></Icon>
                        标签
                    </p>
                    <div @click="changeTag(null)" :class="['ivu-tag', 'ivu-tag-blue', {'ivu-tag-checked': getTag==null}]">
                        <span :class="['ivu-tag-text', {'ivu-tag-color-white': getTag==null}]">不限</span>
                    </div>
                    <div v-for="item in tags" @click="changeTag(item.name)" :class="['ivu-tag', 'ivu-tag-blue', {'ivu-tag-checked': getTag==item.name}]">
                        <span :class="['ivu-tag-text', {'ivu-tag-color-white': getTag==item.name}]">{{item.name}}</span>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Difficult from '@/components/common/Difficult'
import ProblemLogStatus from '@/components/common/ProblemLogStatus'
import Util from '@/util'
export default {
    mounted() {
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
                        title: '#',
                        key: 'pid',
                        width: 60,
                        sortable: 'custom',
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            return h(ProblemLogStatus, {
                                props: {
                                    status: params.row.status
                                }
                            })
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
                        width: 80,
                        sortable: 'custom',
                    },
                    {
                        title: '通过率',
                        key: 'ac_rate',
                        render: (h, params) => {
                            return h('div', {}, this.getACRate(params.row.ac_times, params.row.submit_times))
                        },
                        width: 100,
                        sortable: 'custom',
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
                        filters: [
                            {
                                label: '简单',
                                value: 0
                            },
                            {
                                label: '中等',
                                value: 1
                            },
                            {
                                label: '困难',
                                value: 2
                            },
                            {
                                label: '专家',
                                value: 3
                            }
                        ],
                        filterMultiple: false,
                        filterRemote: (a) => {
                            this.$router.push({
                                path: '/problems',
                                query: {
                                    difficult: a[0],
                                    tag: this.getTag,
                                    query: this.problems.query,
                                    sort: this.getSort
                                }
                            })
                        },
                        width: 100
                    },
                ],
                data: [],        
                total: 0,
                pageSize: 10,
                query: '',
            },
        }
    },
    methods: {
        getProblems(page) {
            this.loading = true
            this.$http.get('/problems/shared', {
                params: {
                    page: page,
                    page_size: this.problems.pageSize,
                    difficult: this.getDifficult,
                    tag: this.getTag,
                    query: this.getQuery,
                    sort: this.getSort
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
        getACRate(ac, submit) {
            return Util.getACRate(ac, submit)
        },
        isSelectedTag(tag) {
            return tag == this.getTag
        },
        doQuery() {
            this.$router.push({
                path: '/problems',
                query: {
                    difficult: this.getDifficult,
                    tag: this.getTag,
                    query: this.problems.query,
                    sort: this.getSort
                }
            })
        },
        changeSort(data) {
            let sort = data.key+'.'+data.order
            this.$router.push({
                path: '/problems',
                query: {
                    difficult: this.getDifficult,
                    tag: this.getTag,
                    query: this.problems.query,
                    sort: sort
                }
            })
        },
        changeTag(name) {
            this.$router.push({path: '/problems', query: {
                difficult: this.getDifficult,
                tag: name,
                query: this.getQuery,
                sort: this.getSort
            }})
        },
        clearQuery() {
            this.problems.query = ''
            this.$router.push({
                path: '/problems', 
                query: {
                    difficult: this.getDifficult, 
                    tag: this.getTag,
                    query: null,
                    sort: this.getSort,
                }
            })
        },
        randomDoProblem() {
            this.$http.get('/problem/random').then(res => {
                this.$Message.success('祝你好运')
                this.$router.push('/problem/'+res.data)
            })
        },
    },
    components: {
        Difficult,
        ProblemLogStatus
    },
    computed: {
        getDifficult() {
            let difficult = this.$route.query.difficult
            return difficult == undefined? -1: difficult
        },
        getTag() {
            let tag = this.$route.query.tag
            return tag == undefined? null: tag
        },
        getQuery() {
            let query = this.$route.query.query
            if(query != undefined) {
                this.problems.query = query
            }
            return query == undefined? null: query
        },
        getSort() {
            let sort = this.$route.query.sort
            return sort == undefined? null: sort
        }
    },
    watch: {
        '$route': function() {
            this.getProblems(1)
        },
    }
}
</script>


<style lang="stylus" scoped>
    @import 'problems.styl'
</style>


