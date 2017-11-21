<template>
    <div class="navigation">
        <Menu active-name="1" width="auto">
            <MenuGroup title="个人资料">
                <MenuItem name="1">
                    <Icon type="document-text"></Icon>
                    文章管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="chatbubbles"></Icon>
                    评论管理
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="统计分析">
                <MenuItem name="3">
                    <Icon type="heart"></Icon>
                    用户留存
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="heart-broken"></Icon>
                    流失用户
                </MenuItem>
            </MenuGroup>
        </Menu>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>

</style>


