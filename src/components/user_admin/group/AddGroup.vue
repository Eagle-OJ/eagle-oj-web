<template>
    <div id="container">
        <h1>创建小组</h1>
        <Form :model="form" :label-width="80">
            <FormItem label="小组名称">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="小组密码">
                <Input v-model="form.password" placeholder="留空则不创建"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" >创建</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                password: '',
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    h1
        font-weight 500
        border-bottom 1px solid #e9eaec
        margin-bottom 10px
</style>


