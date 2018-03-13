<template>
    <div class="contests">
        <p style="text-align: right; margin-bottom: 10px">
            <router-link :to="{path: '/user_admin/contest/add?group='+gid}">
                <Button type="ghost">创建小组赛</Button>
            </router-link>
        </p>
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" @on-change="getData" simple :page-size="pageSize" style="text-align: center; margin-top: 10px"></Page>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    props: ['gid'],
    created() {
        this.getData(1)
    },
    data() {
        return {
            columns: [
                {
                    title: '比赛名称',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/contest/'+params.row.cid
                            }
                        }, params.row.name)
                    }
                },
                {
                    title: '模式',
                    render: (h, params) => {
                        return h('div', [
                            h('Tag', {
                                props: {
                                    color: 'green'
                                }
                            }, this.getContestType(params.row.type)),
                            h('Tag', {
                                style: {
                                    marginRight: '5px'
                                },
                                props: {
                                    color: 'blue'
                                }
                            }, this.getTimeType(params.row.type, params.row.total_time)),
                        ])
                    }
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        let status  = params.row.status
                        let text = ''
                        if (status == 0) {
                            text = '编辑中'
                        } else if (status == 1) {
                            text = '启用中'
                        } else {
                            text = '已关闭'
                        }
                        return h('div', {}, text)
                    },
                    width: 100
                },
                {
                    title: '创建时间',
                    render: (h, params) => {
                        return h('div', {}, this.getTime(params.row.create_time))
                    }
                },
                {
                    title: '操作',
                    key: 'handle',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'ghost',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.$router.push('/user_admin/contest/'+params.row.cid+'/edit')
                                }
                            }
                        }, '管理')
                    },
                    width: 100
                }
            ],
            data: [],
            total: 0,
            pageSize: 10
        }
    },
    methods: {
        getData(page) {
            this.$http.get('/group/'+this.gid+'/contests', {
                params: {
                    page: page,
                    page_size: this.pageSize,
                    is_valid: false
                }
            }).then(res => {
                this.total = res.data.total
                this.data = res.data.data
            })
        },
        getTimeType(type, totalTime) {
            return Util.getContestTimeType(type, totalTime)
        },
        getContestType(type) {
            return Util.getContestType(type)
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD HH:MM')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


