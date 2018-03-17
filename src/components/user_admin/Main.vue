<template>
    <div>
        <v-nav></v-nav>
        <div id="container">
            <Card shadow>
                <router-view/>
            </Card>
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


