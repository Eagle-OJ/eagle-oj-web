<template>
    <div class="submission">
        <p class="refresh">
            <Button @click="getSubmissions(1)" type="primary" icon="refresh" shape="circle">刷新</Button>
        </p>
        <Table @on-sort-change="changeSort" :loading="loading" :columns="column" :data="data"></Table>
        <div style="text-align:center; margin-top:10px">
            <Page :current="1" :total="total" :page-size="pageSize" @on-change="getSubmissions" simple></Page>
        </div>
    </div>
</template>

<script>
import ProblemResult from '@/components/common/ProblemResult'
import Util from '@/util'
export default {
    props: ['cid', 'pid'],
    created() {
        this.getSubmissions(1)
    },
    data() {
        return {
            column: [
                {
                    title: '编程语言',
                    render: (h, params) => {
                        return h('div', {}, this.$getLang(params.row.lang))
                    },
                    filters: [
                        {
                            label: this.$getLang('JAVA8'),
                            value: 'JAVA8'
                        },
                        {
                            label: this.$getLang('CPP'),
                            value: 'CPP'
                        },
                        {
                            label: this.$getLang('C'),
                            value: 'C'
                        },
                        {
                            label: this.$getLang('PYTHON27'),
                            value: 'PYTHON27'
                        },
                        {
                            label: this.$getLang('PYTHON35'),
                            value: 'PYTHON35'
                        }
                    ],
                    filterMultiple: false,
                    filterRemote: (a) => {
                        if (a.length > 0) {
                            this.query.lang = a[0]
                        } else {
                            this.query.lang = null
                        }
                        
                    },
                },
                {
                    title: '时间',
                    render: (h, params) => {
                        return h('div', {}, params.row.time+' S')
                    }
                },
                {
                    title: '内存',
                    render: (h, params) => {
                        return h('div', {}, params.row.memory+ ' MB')
                    }
                },
                {
                    title: '结果',
                    render: (h, params) => {
                        return h(ProblemResult, {
                            props: {
                                result: params.row.status
                            }
                        })
                    },
                    filters: [
                        {
                            label: this.convertProblemStatus('AC'),
                            value: 'AC'
                        },
                        {
                            label: this.convertProblemStatus('WA'),
                            value: 'WA'
                        },
                        {
                            label: this.convertProblemStatus('RTE'),
                            value: 'RTE'
                        },
                        {
                            label: this.convertProblemStatus('TLE'),
                            value: 'TLE'
                        },
                        {
                            label: this.convertProblemStatus('CE'),
                            value: 'CE'
                        }
                    ],
                    filterMultiple: false,
                    filterRemote: (a) => {
                        if (a.length > 0) {
                            this.query.result = a[0]
                        } else {
                            this.query.result = null
                        }
                    },
                },
                {
                    title: '提交时间',
                    key: 'submit_time',
                    render: (h, params) => {
                        return h('div', {}, this.parseTime(params.row.submit_time))
                    },
                    sortable: 'custom'
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                size: 'small',
                                type: 'ghost'
                            },
                            on: {
                                click: () => {
                                    this.seeCode(params.row.url)
                                }
                            },
                        }, '查看源码')
                    }
                }
            ],
            data: [],
            pageSize: 5,
            total: 0,
            loading: false,
            query: {
                lang: null,
                result: null,
                sort: null
            }
        }
    },
    methods: {
        getSubmissions(page) {
            this.loading = true
            this.$http.get('/submissions', {
                params: {
                    cid: this.cid,
                    pid: this.pid,
                    lang: this.query.lang,
                    result: this.query.result,
                    sort: this.query.sort,
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        parseTime(time) {
            return Util.getDistanceTime(time)
        },
        seeCode(url) {
            if(this.$store.state.setting.is_open_storage && url) {
                window.open(this.$getUrl(url))
            } else {
                this.$Message.warning('此代码没有储存，无法查看')
            }
        },
        changeSort(sort) {
            this.query.sort = sort.key+'.'+sort.order
        },
        convertProblemStatus(text) {
            return Util.convertProblemStatus(text)
        }
    },
    watch: {
        '$route': function() {
            this.getSubmissions(1)
        },
        query: {
            handler: function() {
                this.getSubmissions(1)
            },
            deep: true
        }
    }
}
</script>

<style lang="stylus" scoped>
    .submission
        position relative
        .refresh
            text-align right
            margin-bottom 10px
</style>


