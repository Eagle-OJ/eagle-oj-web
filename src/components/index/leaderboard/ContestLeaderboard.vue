<template>
    <div id="container">
        <div class="tool">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '排名'
                },
                {
                    title: '昵称'
                }
            ],
            data: []
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


