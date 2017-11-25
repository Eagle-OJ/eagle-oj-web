<template>
    <div class="main">
        <Menu class="top" mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <router-link to="/">
                <Button class="back" type="primary">返回首页</Button>
            </router-link>
        </Menu>

        <div class="layout-content">
            <Row>
                <Col span="5">
                    <Menu active-name="1-2" width="auto">
                        <MenuGroup title="首页">
                            <MenuItem name="3">
                                <Icon type="heart"></Icon>
                                网站概览
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="内容管理">
                            <MenuItem name="3">
                                <Icon type="heart"></Icon>
                                成员管理
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="heart"></Icon>
                                比赛管理
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="heart-broken"></Icon>
                                小组管理
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="系统设置">
                            <MenuItem name="3">
                                <Icon type="heart"></Icon>
                                判卷机管理
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
        <div class="layout-copy">
            2011-2016 &copy; Eagle-OJ
        </div>
    </div>
</template>

<script>
export default {
  
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
            padding: 10px;

    .layout-copy
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
</style>


