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
        <v-footer></v-footer>
    </div>
</template>

<script>
import TopNavigation from '@/components/index/Navigation'
import LeftNavigation from '@/components/user/Navigation'
import Footer from '@/components/index/Footer'
export default {
    components: {
        'v-top-nav': TopNavigation,
        'v-left-nav': LeftNavigation,
        'v-footer': Footer
    }
}
</script>

<style lang="stylus" scoped>

</style>


