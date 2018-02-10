<template>
    <div>
        <v-top-nav></v-top-nav>
        <div id="container">
            <Row :gutter="10">
                <Col span="5">
                    <v-left-nav></v-left-nav>
                </Col>
                <Col span="19">
                    <router-view/>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import TopNavigation from '@/components/index/Navigation'
import LeftNavigation from '@/components/user/Navigation'
export default {
    components: {
        'v-top-nav': TopNavigation,
        'v-left-nav': LeftNavigation,
    }
}
</script>

<style lang="stylus" scoped>

</style>


