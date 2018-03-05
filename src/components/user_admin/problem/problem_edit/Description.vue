<template>
    <div class="description">
                <div class="form">
            <div class="each-line">
                <label for="title">标题</label>
                <Tooltip content="最多100字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="title">
                    <Input v-model="form.title" :maxlength="100" required></Input>
                </div>
            </div>

            <div class="each-line">
                <label for="description">题目描述</label>
                <Tooltip content="最多10000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="description" class="editor"></div>
            </div>
            
            <div class="each-line">
                <label for="input_format">输入规范</label>
                <Tooltip content="最多10000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="input_format" class="editor"></div>
            </div>
            
            <div class="each-line">
                <label for="output_format">输出规范</label>
                <Tooltip content="最多10000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="output_format" class="editor"></div>
            </div>
            
            <div class="each-line">
                <label for="samples">结果样例</label>
                <Tooltip content="至少添加一组">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="samples">
                    <template v-for="(item, index) in form.samples">
                        <div class="line">
                            <div class="input">      
                                <Input v-model="item.input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入"></Input>           
                            </div>
                            <div class="space"></div>
                            <div class="output">
                                <Input v-model="item.output" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="结果"></Input>           
                            </div>
                            <div class="trash">
                                <Icon type="trash-b" @click.native="deleteSample(index)" />
                            </div>
                        </div>
                    </template>
                    <p>
                        <Button size="small" @click="addSample">添加一组</Button>
                    </p>
                </div>
            </div>

            <div class="each-line">
                <label for="difficult">难度</label>
                <div id="difficult">
                    <RadioGroup id="difficult" v-model="form.difficult">
                        <Radio :label="0">简单</Radio>
                        <Radio :label="1">中等</Radio>
                        <Radio :label="2">困难</Radio>
                        <Radio :label="3">专家</Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="each-line">
                <label for="tags">标签</label>
                <div id="tags">
                    <Select v-model="form.tags" multiple style="width:400px" filterable>
                        <template v-for="item in tags">
                            <Option :value="item.tid">{{item.name}}</Option>
                        </template>
                    </Select>
                </div>
            </div>

            <div class="each-line submit">
                <Button type="success" @click="updateProblem" :disabled="! isEditable" :loading="loading">保存题目</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['pid', 'problem', 'isEditable'],
    created() {
        this.getTags()
    },
    mounted() {
        let config = {
            theme: 'snow',
            modules: {
                toolbar: [ 
                    ['bold', 'italic', 'underline'],
                    ['blockquote', 'code-block'],
                    ['formula', 'image'],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ],
                history: {       
                    delay: 2500,
                    userOnly: true
                },
                formula: true
            }
        }
        this.editor.description = new Quill(document.getElementById('description'), config)
        this.editor.input_format = new Quill(document.getElementById('input_format'), config)
        this.editor.output_format = new Quill(document.getElementById('output_format'), config)
        this.setProblem()
    },
    data() {
        return {
            loading: false,
            editor: {
                description: null,
                input_format: null,
                output_format: null,
            },
            form: {
                title: '',
                samples: [],
                difficult: 0,
                tags: []
            },
            tags: []
        }
    },
    methods: {
        updateProblem () {
            if (this.form.title.length == 0) {
                this.$Message.warning('标题不得为空')
                return
            }

            if(this.editor.description.getLength() <5) {
                this.$Message.warning('描述长度不符合要求')
                return
            }

            if(this.editor.input_format.getLength() <2) {
                this.$Message.warning('输入规范长度不符合要求')
                return
            }

            if(this.editor.output_format.getLength() <2) {
                this.$Message.warning('输出规范长度不符合要求')
                return
            }

            if(this.form.samples.length == 0) {
                this.$Message.warning('至少要有一组样例')
                return
            }

            if(this.form.tags.length == 0) {
                this.$Message.warning('至少要有个标签')
                return
            }

            let data = {
                title: this.form.title,
                description: this.editor.description.getContents(),
                input_format: this.editor.input_format.getContents(),
                output_format: this.editor.output_format.getContents(),
                samples: this.form.samples,
                difficult: this.form.difficult,
                tags: this.form.tags
            }
            this.loading = true
            this.$http.put('/problem/'+this.pid, data).then(res => {
                this.$Message.success(res.message)
                this.loading = false
            }).catch(res => {
                this.loading = false
            })
        },
        addSample() {
            let obj = {
                input: '',
                output: ''
            }
            this.form.samples.push(obj)
        },
        deleteSample(index) {
            let newArray = []
            for(let i=0; i<this.form.samples.length; i++) {
                if (i !== index) {
                    newArray.push(this.form.samples[i])
                }
            }
            this.form.samples = newArray
        },
        getTags() {
            this.$http.get('/tags').then(res => {
                this.tags = res.data
            })
        },
        setProblem() {
            let problem = this.problem
            this.form.title = problem.title
            this.form.samples = problem.samples
            this.form.difficult = problem.difficult
            this.editor.description.setContents(problem.description)
            this.editor.input_format.setContents(problem.input_format)
            this.editor.output_format.setContents(problem.output_format)
            this.getProblemTags()
        },
        getProblemTags() {
            let pid = this.pid
            this.$http.get('/problem/'+pid+'/tags').then(res => {
                let temp = []
                for(let i=0; i<res.data.length; i++) {
                    temp.push(res.data[i].tid)
                }
                this.form.tags = temp
            }).catch(res => {
                this.$Message.error(res.message)
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
    .description
        .form
            .each-line
                margin-bottom 15px
                .editor
                    height 150px
                label
                    font-size 16px
                    margin-right 5px
                i
                    font-size 16px
                &.submit
                    text-align right
                #samples
                    .line
                        display: flex
                        margin-bottom 5px
                        .input
                            flex 20
                        .output
                            flex 20
                        .trash
                            flex 2
                            text-align center
                            i
                                font-size 25px
                                line-height 32px
                                cursor pointer
                        .space
                            flex 1
</style>


