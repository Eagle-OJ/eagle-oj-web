<template>
    <div class="description">
        <div class="form">
            <div class="each-line">
                <label for="title">标题</label>
                <div id="title">
                    <Input v-model="form.title"/>
                </div>
            </div>
            <div class="each-line">
                <label for="description">题目描述</label>
                <Tooltip content="最多1000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="description"></div>
            </div>
            
            <div class="each-line">
                <label for="input_format">输入规范</label>
                <Tooltip content="最多1000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="input_format"></div>
            </div>
            
            <div class="each-line">
                <label for="output_format">输出规范</label>
                <Tooltip content="最多1000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="output_format"></div>
            </div>
            
            <div class="each-line">
                <label for="constraint">题目约束</label>
                <Tooltip content="最多1000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="constraint"></div>
            </div>
            
            <div class="each-line">
                <label for="samples">结果样例</label>
                <Tooltip content="最多1000字">
                    <Icon type="help-circled"></Icon>
                </Tooltip>
                <div id="samples">
                    <template v-for="(item, index) in form.samples">
                        <div class="line">
                            <div class="input">      
                                <Input v-model="item.input" placeholder="输入"></Input>           
                            </div>
                            <div class="space"></div>
                            <div class="output">
                                <Input v-model="item.output" placeholder="结果"></Input>           
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
                <label for="difficulty">难度</label>
                <div id="difficulty">
                    <RadioGroup id="difficulty" v-model="form.difficulty">
                        <Radio label="easy">简单</Radio>
                        <Radio label="medium">中等</Radio>
                        <Radio label="hard">困难</Radio>
                        <Radio label="expert">专家</Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="each-line">
                <label for="tags">标签</label>
                <div id="tags">
                    <Select v-model="form.tags" multiple style="width:400px">
                        <Option value="item.value" key="item.value">123</Option>
                        <Option value="item.value" key="item.value">123</Option>
                    </Select>
                </div>
            </div>

            <div class="each-line submit">
                <Button type="success" @click="createProblem">保存题目</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        let config = {
            theme: 'snow',
            modules: {
                toolbar: [ 
                    ['bold', 'italic', 'underline'],
                    ['blockquote', 'code-block'],
                    ['formula'],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ],
                formula: true
            }
        }
        this.editor.description = new Quill(document.getElementById('description'), config)
        this.editor.input_format = new Quill(document.getElementById('input_format'), config)
        this.editor.output_format = new Quill(document.getElementById('output_format'), config)
        this.editor.constraint = new Quill(document.getElementById('constraint'), config)
    },
    data() {
        return {
            editor: {
                description: null,
                input_format: null,
                output_format: null,
                constraint: null
            },
            form: {
                title: '',
                samples: [],
                difficulty: 'easy',
                tags: []
            }
        }
    },
    methods: {
        createProblem() {
            console.log(this.editor.description.getContents())
        },
        addSample() {
            let obj = {
                input: '',
                output: ''
            }
            this.form.samples.push(obj)
        },
        deleteSample(index) {
            console.log(index)
            let newArray = []
            for(let i=0; i<this.form.samples.length; i++) {
                if (i !== index) {
                    newArray.push(this.form.samples[i])
                }
            }
            console.log(newArray)
            this.form.samples = newArray
        }
    }
}
</script>

<style lang="stylus" scoped>
    .description
        .form
            .each-line
                margin-bottom 15px
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


