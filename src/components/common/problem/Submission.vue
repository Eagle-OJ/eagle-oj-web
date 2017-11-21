<template>
    <div class="submission">
        <Table :columns="column" :data="data"></Table>
        <div style="text-align:center; margin-top:10px">
            <Page :current="2" :total="50" simple></Page>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            column: [
                {
                    title: '提交时间',
                    key: 'submit_time'
                },
                {
                    title: '编程语言',
                    key: 'program_language'
                },
                {
                    title: '结果',
                    key: 'result'
                }
            ],
            data: [
                {
                    submit_time: '2017年9月1日',
                    program_language: 'java',
                    result: 'Accept'
                },
                {
                    submit_time: '2017年9月1日',
                    program_language: 'java',
                    result: 'Accept'
                }
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


