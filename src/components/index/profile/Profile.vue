<template>
    <div id="container">
        <div class="user-info">
            <span style="margin-left: 30px">狗蛋<Icon type="female" style="margin-left: 25px;color: hotpink"></Icon></span><br>
            <span style="font-size: 17px">简介：我可是超级无敌大帅哥</span>
            <div class="user-detail">
                <Row>
                    <Col span="12">
                        <Icon type="arrow-graph-up-right" style="color:red"></Icon> 积分:2300
                    </Col>
                    <Col span="12">
                        <Icon type="trophy" style="color:darkorange"></Icon> 排名:2000名
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Icon type="android-done" style="color:green"></Icon> 通过率:56%
                    </Col>
                    <Col span="12">
                        <Icon type="clock" style="color: #2d8cf0;"></Icon> 比赛次数:20次
                    </Col>
                </Row>
            </div>
        </div>
        <img class="avatar" src="/static/touxiang.jpg">
        <div class="other-thing">
            <div class="title"><span >个人成就</span></div>
            <div class="achieve">
                <span>
                    <Icon type="edit" style="font-size: 15px;margin-right: 8px;"></Icon>完成题目
                </span>
                <span style="margin-left: 90px">
                    <Badge count="20/600" class-name="demo-badge-alone"></Badge>
                </span>
            </div>
            <div class="charts">
                charts
            </div>
        </div>
        <div class="submissions">
            <div class="title"><span >最近提交</span></div>
            <div>
                <table cellpadding="0" cellspacing="0">
                    <tr v-for="i in 9">
                        <td width="300px">A+B problem</td>
                        <td width="200px">
                            2017-01-01
                        </td>
                        <td width="200px">
                            <Tag  color="green"  style="margin-right: 20px">java</Tag>
                            <Tag  color="red" >Fail</Tag>
                        </td>
                    </tr>
                    <tr>
                        <td width="300px">A+B problem</td>
                        <td width="200px">
                            2017-01-01
                        </td>
                        <td width="200px">
                            <Tag  color="green" style="margin-right: 20px">java</Tag>
                            <Tag  color="blue">Accpet</Tag>
                        </td>
                    </tr>
                </table>
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
    #container
        position relative
        padding-top 65px
        .user-info
            width 100%
            font-size 24px
            text-align center
            padding-top 70px
            border-radius 15px
            position relative
            .user-detail
                position absolute
                width 300px
                right 20px
                bottom 0
                font-size 18px
                text-align left 
        .user-info:hover
            box-shadow: 7px 8px 40px 0px rgba(0, 0, 0, 0.3)
        .avatar
            position absolute
            border black 2px solid
            width 130px
            height 130px
            border-radius 50%
            left 50%
            margin-left -65px
            top 0
            transition transform .9s
            &:hover
                transform:rotate(360deg);
        .other-thing
            border-radius 10px
            margin-top 30px
            width 280px
            float left
            .achieve
                height 34px
                letter-spacing 2px
                border-bottom 1px #ddd  solid
                padding 5px 3px 3px 10px
                font-size 15px
                font-weight 600
                span
                    margin-left 5px
            .charts
                height 265px
                width 100%
                background red
                margin-top 10px
        .title
            border-bottom 1px #ddd  solid
            padding 3px 3px 3px 10px
            background #EEEEEE
            width 100%
            font-size 15px
            font-weight 600
        .submissions
            width 660px
            float right
            margin-top 30px
            border-radius 15px
            font-size 16px
            padding-bottom 20px
            table
                margin-left 10px
                td
                    border-bottom  1px solid #ddd
                    height 34px
        .submissions, .user-info, .other-thing
            border solid #ddd 1px
            overflow hidden
</style>


