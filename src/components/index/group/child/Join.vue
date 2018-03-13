<template>
    <div class="join">
        <template v-if="group.password">
            <div class="info">输入密码加入小组</div>
            <Input v-model="password" class="input" placeholder="小组密码"></Input>
        </template>
        <Button type="success" @click="join">加入小组</Button>
    </div>
</template>

<script>
export default {
    props: ['group', 'gid'],
    data() {
        return {
            password: '',
        }
    },
    methods: {
        join() {
            if(this.group.password) {
                if(this.password.length == 0) {
                    this.$Message.error('请输入密码')
                    return
                }
            }

            this.$http.post('/group/'+this.gid+'/enter', {
                password: this.password
            }).then(res => {
                this.$Message.success('小组加入成功')
                this.$router.push('?action=contests')
                this.$emit('refreshUser')
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .join
        text-align center
        padding 15px
        .info
            font-size 20px
            margin-bottom 10px
        .input
            width 150px
</style>



