<template>
    <div id="container">
        <div class="group">
            <div class="left">
                <div class="holder">
                    <p>
                        <Tooltip content="带有皇冠图标的为组长" placement="top">
                            <Icon type="help-circled" style="margin-right: 8px"></Icon>
                        </Tooltip>
                        组员信息
                    </p>

                    <div class="holder-info">
                        <img src="/static/captain.png" width="29px" height="18px" style="position:absolute;left: 3px;top:13px">
                        <img src="/static/touxiang.jpg" width="40px" height="40px" style="position:absolute;left: 40px;top:0px">
                        <a href="#" title="查看个人资料" style="position:absolute;left: 90px;top:13px">狗蛋狗蛋</a>
                    </div>
                </div>
                <div class="members">
                    <table cellpadding="0" cellspacing="0">
                        <tr v-for="i in 10">
                            <td>{{i}}</td>
                            <td><img src="/static/touxiang.jpg" width="30x" height="30px"></td>
                            <td><a href="#" title="查看个人资料">Keira Knightley</a></td>
                        </tr>
                    </table>
                    <Page :current="2" :total="50" simple style="text-align: right;margin-top: 10px"></Page>
                </div>
            </div>

            <div class="right">
                <div class="group">
                    <p>小组说明</p>
                    <img src="/static/touxiang.jpg" width="100px" height="100px">
                    <div class="group-info">
                        小组名称:<span class="group-name">大红鹰第一小组</span><br>
                        创建时间:<span class="group-time">2017-10-10</span><br>
                        组长:<span class="captain">狗蛋狗蛋</span>
                    </div>
                </div>
                <div class="no-name">
                    <button>加入小组<br><span style="font-size: 14px">join </span></button>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
    .group
        margin-top 40px
        .left
            float left
            width 30%
            .holder
                overflow hidden
                border-radius 10px
                border 1px solid #DDD
                font-size 17px
                box-shadow 3px 3px 30px 0px rgba(0,0,0,0.15)
                p
                    font-size 18px
                    background #f8f8f9
                    padding-left 14px
                    padding-top 5px
                .holder-info
                    height: 45px
                    position relative
                    a
                        color  #464c5b
                        &:hover
                            text-decoration underline
                            color #2d8cf0
            .members
                padding-left 10px
                margin-top 10px
                border 1px solid #ddd
                font-size 14px
                width 80%
                border-radius 10px
                padding-bottom 10px
                margin-left 7px
                td
                    padding-left 20px
                    border-bottom 1px #ddd solid
                    height 45px
                a
                    color  #464c5b
                a:hover
                    text-decoration underline
                    color #2d8cf0
        .right
            float right
            width 60%
            margin-left 100px
            .group
                padding 10px 0px 10px 8px
                margin-top 10px
                position relative
                border-left 2px #ddd solid
                border-bottom 2px #ddd solid
                border-top 1px #ddd solid
                border-right 1px #ddd solid
                box-shadow 3px -3px 20px 0px rgba(0,0,0,0.15)
                p
                    padding-left 10px
                    font-size 20px
                    font-weight bold
                    color  #464c5b
                    width 90px
                .group-info
                    margin-top 10px
                    font-size 17px
                    position absolute
                    top 28%
                    left 30%
                    line-height 30px
            .no-name
                margin-top 30px
                width 100%
                height 380px
                padding-left 40%
                padding-top 25%
                background url("/static/button_bg.jpg") no-repeat
                button
                    border-radius 10px
                    padding 10px
                    width 160px
                    font-size 17px
                    letter-spacing 2px
                    background #2ec866
                    border none
                    color white
                button:hover
                    background #090
                    cursor pointer
                button:focus
                    outline none
</style>


