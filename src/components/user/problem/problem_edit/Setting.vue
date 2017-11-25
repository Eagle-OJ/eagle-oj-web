<template>
    <div class="setting">
        <Row :gutter="10">
            <Col span="4" class="left"><h2>编程语言</h2></Col>
            <Col span="20" class="right">
                <Alert>暂时不支持限定内存和耗时</Alert>
                <CheckboxGroup v-model="languages">
                    <Checkbox label="JAVA8"></Checkbox>
                    <Checkbox label="Python27"></Checkbox>
                    <Checkbox label="C"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            languages: [] 
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


