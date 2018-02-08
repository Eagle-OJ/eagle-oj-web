<template>
    <div class="main">
        <Menu class="top" mode="horizontal" theme="dark">
            <div class="layout-logo">管 理 中 心</div>
            <router-link to="/">
                <Button class="back" type="primary">返回首页</Button>
            </router-link>
        </Menu>

        <div class="layout-content">
            <Row>
                <Col span="5">
                    <Menu width="auto" @on-select="goTo" :active-name="getActiveName">
                        <MenuGroup title="网站">
                            <MenuItem name="overview">
                                <Icon type="monitor"></Icon>
                                网站概览
                            </MenuItem>
                            <MenuItem name="announcement">
                                <Icon type="android-notifications-none"></Icon>
                                公告管理
                            </MenuItem>
                            <MenuItem name="setting" v-if="isRoot">
                                <Icon type="android-settings"></Icon>
                                系统设置
                            </MenuItem>
                            <MenuItem name="judger" v-if="isRoot">
                                <Icon type="code-working"></Icon>
                                判卷机管理
                            </MenuItem>
                            <MenuItem name="cache" v-if="false && isRoot">
                                <Icon type="wrench"></Icon>
                                缓存管理
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="内容管理">
                            <MenuItem name="tag">
                                <Icon type="pricetags"></Icon>
                                标签管理
                            </MenuItem>
                            <MenuItem name="auditing">
                                <Icon type="ios-checkmark-outline"></Icon>
                                题目审核
                            </MenuItem>
                            <MenuItem name="problem">
                                <Icon type="heart"></Icon>
                                题目管理
                            </MenuItem>
                            <MenuItem name="user">
                                <Icon type="android-person"></Icon>
                                用户管理
                            </MenuItem>
                            <MenuItem name="contest">
                                <Icon type="compose"></Icon>
                                比赛管理
                            </MenuItem>
                            <MenuItem name="group">
                                <Icon type="ios-people"></Icon>
                                小组管理
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Col>
                <Col span="19">
                    <div class="layout-content-main">        
                        <router-view/>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.checkRole()
    },
    methods: {
        goTo(name) {
            if(name == 'overview') {
                this.$router.push('/admin')
            } else {
                this.$router.push('/admin/'+name)
            }
        },
        checkRole() {
            if(this.$store.state.userInfo.role < 8) {
                this.$Message.warning('你无权访问管理后台')
                this.$router.push('/dashboard')
            }
        }
    },
    computed: {
        isRoot() {
            return this.$store.state.userInfo.role == 9
        },
        getActiveName() {
            let path = this.$route.path
            if (path === '/admin') {
                return 'overview'
            } else {
                return path.replace('/admin/', '')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.main
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    .top
        .layout-logo
            width: 100px
            height: 30px
            background: #5b6270
            border-radius: 3px
            float: left
            position: relative
            top: 15px
            left: 20px
            line-height 30px
            text-align center
            font-size 15px
            color #fff
        .back
            float right 
            position: relative
            top: 15px
            right: 20px
    .layout-content
        min-height: 200px
        margin: 15px
        overflow: hidden
        background: #fff
        border-radius: 4px
        .layout-content-main
            padding: 10px
    .layout-copy
        text-align: center
        padding: 10px 0 20px
        color: #9ea7b4
</style>


