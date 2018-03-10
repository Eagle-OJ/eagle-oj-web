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
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


