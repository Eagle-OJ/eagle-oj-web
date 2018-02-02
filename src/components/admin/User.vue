<template>
    <div class="user">
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" simple @on-change="getData" style="margin-top: 10px;text-align: center"></Page>
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
            total: 0,
            pageSize: 10,
            data: [],
            columns: [
                {
                    title: '名称',
                    key: 'nickname'
                },
                {
                    title: '注册时间',
                    render: (h, params) => {
                        return this.getTime(params.row.register_time)
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                on: {
                                    click: () => {
                                        this.$router.push('/profile/'+params.row.uid)
                                    }
                                }
                            }, '浏览')
                        ])
                    }
                }
            ],
        }
    },
    methods: {
        getData(page) {
            this.$http.get('/users', {
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
            return Util.getFormatTime(time, 'YYYY-MM-DD')
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
