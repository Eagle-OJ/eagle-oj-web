<template>
    <Card id="container" class="helper">
        <h1>Eagle-OJ 帮助手册</h1>
        <div class="each" id="compiler">
            <h2 class="title">编辑器说明</h2>
            <div class="content">
                <p>C (GCC 5.4)</p>
                <p>C++ (G++ 5.4)</p>
                <p>Python 2.6</p>
                <p>Python 3.5</p>
                <p>Java8 (OpenJDK 8)</p>
            </div>
        </div>
        <div class="each" id="contest-mode">
            <h2 class="title">比赛模式详解</h2>
            <div class="content">
                <ul>
                    <li><b>OI模式</b> 按照测试点得分来计算，即通过几个测试点可以获得几分</li>
                    <li><b>ACM模式</b> 参照ACM比赛标准，有一个测试点未通过就算做错，做错罚时<i>20分钟</i></li>
                    <li><b>不限时</b> 开始比赛后没有时间限制-直到该比赛结束</li>
                    <li><b>限时</b> 在选手加入比赛为计时开始时间，选手的比赛时间到即代表该选手比赛结束</li>
                </ul>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
    .helper
        h1
            margin-bottom 10px
            font-weight 500
        .each
            margin-bottom 10px
            .title
                font-weight 500
                margin-bottom 5px
                border-left 5px solid #5cadff
                padding-left 5px
            .content
                padding-left 10px
</style>

