<template>
    <div>
        <v-top-nav></v-top-nav>
        <div id="container">
            <router-view/>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Navigation from '@/components/index/Navigation'
import Footer from '@/components/index/Footer'

export default {
    components: {
        'v-nav': TopNavigation,
        'v-footer': Footer
    }
}
</script>

<style lang="stylus" scoped>

</style>


