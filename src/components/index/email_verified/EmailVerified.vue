<template>
    <div>
        
    </div>
</template>

<script>
export default {
    created() {
        this.verify()
    },
    methods: {
        verify() {
            let code = this.getCode
            this.$http.post('/user/mail/verify', {code: code}).then(res => {
                this.$Message.success(res.message)
                this.$router.push('/user/security')
                this.$store.dispatch('getUserInfo')
            }).catch(res => {
                this.$router.push('/user/security')
            })
        }
    },
    computed: {
        getCode() {
            return this.$route.query.code
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


