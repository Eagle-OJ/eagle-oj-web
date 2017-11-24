<template>
    <div class="moderator">
        <Row :gutter="10">
            <Col span="4" class="left"><h2>维护名单</h2></Col>
            <Col span="20" class="right">
                <Alert>输入邮箱将其添加到题目维护者中，他也将拥有修改题目的权限</Alert>
                <div class="input">
                    <Input v-model="input">
                        <Button slot="append" icon="plus"></Button>
                    </Input>
                </div>
                <ul>
                    <li>
                        <Avatar src="/static/avatar.jpg" size="large" class="avatar" />
                        <router-link to="/profile/1">Smith</router-link>
                        <Button type="ghost" icon="trash-b" class="delete">删除</Button>
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            list: {

            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .moderator
        .left
            h2
                font-weight 500
        .right
            .input
                margin-bottom 10px
            ul
                li
                    height 50px
                    border-bottom 1px solid #ccc
                    padding 5px 0
                    .avatar
                        margin-right 10px
                        margin-top -6px
                    a
                        color #495060
                        font-size 20px
                        display inline-block
                        line-height 40px
                    .delete
                        float right 
                        margin-top 4px
</style>


