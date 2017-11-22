<template>
    <div class="description">
        <Row :gutter="5" class="content">
            <Col span="18" class="left">
                <div>
                    <h2>描述</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit aut est a maxime, id magnam quisquam obcaecati asperiores sit illum quis harum eius laboriosam temporibus dignissimos deleniti aperiam inventore?</p>
                </div>
                <div>
                    <h2>输入规范</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit aut est a maxime, id magnam quisquam obcaecati asperiores sit illum quis harum eius laboriosam temporibus dignissimos deleniti aperiam inventore?</p>
                </div>
                <div>
                    <h2>输出规范</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit aut est a maxime, id magnam quisquam obcaecati asperiores sit illum quis harum eius laboriosam temporibus dignissimos deleniti aperiam inventore?</p>
                </div>
                <div>
                    <h2>约束</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit aut est a maxime, id magnam quisquam obcaecati asperiores sit illum quis harum eius laboriosam temporibus dignissimos deleniti aperiam inventore?</p>
                </div>
                <div class="samples">
                    <h2>样例</h2>
                    <p>
                        <div v-for="i in 3" :key="i">
<pre>input
output</pre>
                        </div>
                    </p>
                </div>
            </Col>
            <Col span="6" class="right">
                <div class="contributor">
                    <span>出题人：</span>
                    <router-link to="#">EagleOJ</router-link>
                </div>
                <Card class="chart">
                    <div>
                        <canvas ref="myChart" width="300" height="450"></canvas>
                    </div>
                </Card>
            </Col>
        </Row>

        <Row class="editor">
            <div class="toolbar">
                <Select v-model="currentLanguage" style="width:150px;margin-right:10px">
                    <Option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Tooltip content="使用以前代码" placement="top">
                    <Button type="ghost" icon="android-time">回退</Button>
                </Tooltip>
            </div>
            <div id="editor-container">

            </div>
            <div class="submit">
                <Button type="ghost" shape="circle" icon="play" style="margin-right:5px" @click="runTest" :loading="submit.isSubmit">测试运行</Button>
                <Button type="primary" shape="circle" icon="upload" @click="submitCode(false)" :loading="submit.isSubmit">提交代码</Button>
            </div>
        </Row>

        <div class="status" v-if="submit.showStatus">
            <Spin v-if="submit.isSubmit" fix style="font-size: 15px">
                <Icon type="load-c" size=18 class="icon-loading"></Icon>
                <div>{{submit.msg}}</div>
            </Spin>
        </div>

        <Modal class="test_case" v-model="test_case.isOpen" ok-text="运行" title="进行测试运行" @on-ok="submitCode(true)">
            <Alert>至少添加一组测试数据，输入字符串无可不填</Alert>
            <div class="body">
                <div class="line" v-for="(item,index) of test_case.data">
                    <div class="input">      
                        <Input v-model="item.input" placeholder="输入字符串"></Input>           
                    </div>
                    <div class="space"></div>
                    <div class="output">
                        <Input v-model="item.output" placeholder="期望结果"></Input>           
                    </div>
                    <div class="trash">
                        <Icon type="trash-b" @click.native="deleteTestCase(index)" />
                    </div>
                </div>
            </div>
            <p>
                <Button size="small" @click="addTestCase">添加一组</Button>
            </p>
        </Modal>

    </div>
</template>

<script>
import Chart from 'chart.js'

export default {
    mounted() {
        let config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [1, 2, 3, 4, 5],
                    backgroundColor: [
                         '#4bc0c0',
                         '#ff6384',
                         '#ffcd56',
                         '#36a2eb',
                         '#ff9f40',
                    ],
                }],
                labels: [
                    "Accepted",
                    "Wrong Answer",
                    "Runtime Error",
                    "TLE",
                    "Other"
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                    }
                },
                title: {
                    display: true,
                    text: '提 交 记 录'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
            }
        }
        let myChart = new Chart(this.$refs.myChart, config)

       let editor = ace.edit('editor-container')
       editor.setTheme("ace/theme/github");
       editor.setShowPrintMargin(false)
       editor.getSession().setMode("ace/mode/python");
       document.getElementById('editor-container').style.fontSize='14px';
    },
    data() {
        return {
            currentLanguage: '',
            languageList: [
                {
                    label: 'Java1.8',
                    value: '1'
                },
                {
                    label: 'Java1.8',
                    value: '1'
                },
                {
                    label: 'Java1.8',
                    value: '1'
                },
                {
                    label: 'Java1.8',
                    value: '1'
                }
            ],
            test_case: {
                isOpen: false,
                data: []
            },
            submit: {
                showStatus: false,
                code: '',
                msg: '加载中',
                isSubmit: false
            }
        }
    },
    methods: {
        runTest() {
            this.test_case.isOpen = true
        },
        submitCode(isTestMode) {
            this.submit.isSubmit = true
            this.submit.showStatus = true
            if (isTestMode) {
                console.log('test mode')
            } else {
                console.log('submit')
            }
            setTimeout(()=> {
                this.submit.isSubmit = false
            }, 1000)
        },
        addTestCase() {
            let obj = {
                input: '',
                output: ''
            }
            this.test_case.data.push(obj)
        },
        deleteTestCase(index) {
            let newArray = []
            for (let i=0; i<this.test_case.data.length; i++) {
                if (i != index) {
                    newArray.push(this.test_case.data[i])
                }
            }
            this.test_case.data = newArray
        }
    }
}
</script>


<style lang="stylus" scoped>
    .content
        border-bottom 1px solid #e9eaec
        margin-bottom 10px
        .left
            div
                margin-bottom: 10px
                p
                    font-size: 15px
                &.samples
                    pre
                        background #f4faff
                        margin 5px 0
                        padding 5px
        .right
            .contributor
                padding 5px
                margin-bottom 5px
                font-size 14px
                span
                    color #80848f
                a
                    color #495060
                    &:hover
                        color #5cadff
    .editor
        .toolbar
            margin-bottom 5px
        #editor-container
            border 1px solid #dddee1
            border-radius 1px
            width 100%
            height 300px
        .submit
            margin-top 10px
            text-align right
    .test_case
        .body
            margin-bottom 5px
            .line
                display: flex
                margin-bottom 5px
                .input
                    flex 10
                .output
                    flex 10
                .trash
                    flex 2
                    text-align center
                    i
                        font-size 25px
                        line-height 32px
                        cursor pointer
                .space
                    flex 1
    .status
        margin-top 15px
        min-height 200px
        border 1px solid #dddee1
        position relative
        .icon-loading
            animation: ani-icon-loading 1s linear infinite;
        @keyframes ani-icon-loading
            from 
                transform: rotate(0deg)
            50%
                transform: rotate(180deg)
            to
                transform: rotate(360deg)
</style>

