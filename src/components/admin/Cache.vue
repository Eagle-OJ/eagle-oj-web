<template>
    <div class="cache">
        <div class="each">
            <div class="info">
                <p>清除用户缓存后，所有用户再次访问时会重新读取一次数据库。</p>
                <p></p>
            </div>
            <div class="tool">
                <Button type="ghost" @click="refresh('user')">刷新用户缓存</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        refresh(type) {
            this.$http.put('/setting/cache', {
                params: {
                    type: type
                }
            }).then(res => {
                this.$Message.success(res.message)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


