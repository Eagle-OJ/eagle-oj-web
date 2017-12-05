<template>
    <div id="container">
        xx
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
    // methods: {
    //     waitForLogin() {
    //         this.$Spin.show({
    //             render: (h) => {
    //                 return h('div', [
    //                     h('Icon', {
    //                         'class': 'loading-icon',
    //                         props: {
    //                             type: 'load-c',
    //                             size: 18
    //                         }
    //                     }),
    //                     h('div', '登入中')
    //                 ])
    //             }
    //         });

    //         setTimeout(() => {
    //             if(this.$store.state.userInfo.isLogin) {
    //                 this.$router.push('/dashboard')
    //             } else {
    //                 this.$router.push('/login')
    //             }
    //             this.$Spin.hide();
    //         }, 1000);
    //     }
    // }
}
</script>

<style lang="stylus">
    .loading-icon
        animation: ani-demo-spin 1s linear infinite;
</style>


