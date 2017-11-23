<template>
    <div>
        <router-link to="/problem/add">
            <Button icon="plus" type="ghost">添加题目</Button>
        </router-link>
        <Table style="margin-top: 10px" :columns="column" :data="data"></Table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            column: [
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '操作',
                    key: 'handle'
                }
            ],
            data: [
                {
                    title: 'A+B problem',
                    status: '123',
                    handle: 'xx'
                }
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


