<template>
    <div id="container">
        
    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    created() {
        if(Cookie.get('token')) {
            this.$router.push('/dashboard')
        } else {
            this.$router.push('/login')
        }
    },
}
</script>

<style lang="stylus">
    .loading-icon
        animation: ani-demo-spin 1s linear infinite;
</style>


