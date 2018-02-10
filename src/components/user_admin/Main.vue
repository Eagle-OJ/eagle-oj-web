<template>
    <div>
        <v-nav></v-nav>
        <div id="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/index/Navigation'

export default {
    components: {
        'v-nav': Navigation,
    }
}
</script>

<style lang="stylus" scoped>

</style>


