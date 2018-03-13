<template>
    <div id="container">
        <Table stripe :columns="columns" :data="data"></Table>
        <Page @on-change="getMembers" :total="total" :page-size="pageSize" simple style="margin-top: 20px; text-align:center"></Page>
    </div>
</template>

<script>
import Util from '@/util'
export default {
    props: ['gid'],
    created() {
        this.getMembers(1)
    },
    data() {
        return {
            pageSize: 10,
            total: 0,
            columns: [
                {
                    title: '组内名称',
                    render: (h, params) => {
                        return h('router-link', {
                            props: {
                                to: '/profile/'+params.row.uid
                            }
                        }, params.row.group_name)
                    }
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
                },
                {
                    title: '加入时间',
                    render: (h, params) => {
                        return h('div', {}, this.getTime(params.row.join_time))
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.deleteMember(params.index)
                                }
                            }
                        }, '踢出')
                    }
                }
            ],
            data: []
        }
    },
    methods: {
        getMembers(page) {
            this.$http.get('/group/'+this.gid+'/members', {
                params: {
                    page: page,
                    page_size: this.pageSize,
                }
            }).then(res => {
                this.total = res.data.total
                this.data = res.data.data
            })
        },
        deleteMember(index) {
            let name = this.data[index].group_name
            let uid = this.data[index].uid
            this.$Modal.confirm({
                title: '踢出用户',
                content: '<p>确认踢出<b>'+name+'</b>?</p>',
                onOk: () => {
                    this.$http.delete('/group/'+this.gid+'/user/'+uid).then(res => {
                        this.$Message.success('踢出成功')
                        this.getMembers(1)
                    }).catch(res => {
                        this.$Message.error(res.message)
                    })
                },
            });
        },
        getTime(time) {
            return Util.getFormatTime(time, 'YYYY-MM-DD')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


