<template>
    <div class="description">
        <Form ref="form" :model="form" :rules="validate" :label-width="80">
            <FormItem label="比赛名称" prop="name">
                <Input v-model="form.name" :maxlength="50"></Input>
            </FormItem>
            <FormItem label="标语" prop="slogan">
                <Input v-model="form.slogan" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="100"></Input>
            </FormItem>
            <FormItem label="详细描述" prop="description">
                <Input v-model="form.description" type="textarea" :maxlength="500" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="是否公开">
                <i-switch v-model="form.isShare" size="large">
                    <span slot="open">公开</span>
                    <span slot="close">私密</span>
                </i-switch>
            </FormItem>
            <FormItem label="密码" prop="password" v-if="! form.isShare">
                <Input v-model="form.password" placeholder="密码不得超出6位" :maxlength="6"></Input>
            </FormItem>
            <FormItem label="比赛模式">
                <RadioGroup v-model="form.contestType">
                    <Radio label="0">普通</Radio>
                    <Radio label="1">ACM</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="时间模式">
                <RadioGroup v-model="form.timeType">
                    <Radio label="0">普通</Radio>
                    <Radio label="1">限时</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="限时设置" v-if="form.timeType==1">
                <TimePicker v-model="form.totalTime" :steps="[1, 15, 60]" placeholder="选择时长" style="width: 200px"></TimePicker>
            </FormItem>
            <FormItem label="有效时间">
                <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" style="width: 300px" :options="disabledDate" v-model="form.timeRange"></DatePicker>
            </FormItem>
            <FormItem>
                <Button style="float: right" type="primary" :loading="loading" @click="handleSubmit">更新比赛</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    props: ['cid'],
    created() {
        this.getContest()
    },
    data() {
        return {
            loading: false,
            form: {
                name: '',
                slogan: '',
                description: '',
                isShare: true,
                password: '',
                timeRange: null,
                totalTime: null,
                contestType: 0,
                timeType: 0
            },
            disabledDate: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            validate: {
                name: [
                    { required: true, message: '比赛名称不得为空'}
                ],
                slogan: [
                    { required: true, message: '请输入标语'},
                    { type: 'string', max: 100, message: '不要超出100字'}
                ],
                description: [
                    { required: true, message: '请输入描述'},
                    { type: 'string', max: 500, message: '不要超出500字'}
                ],
                password: [
                    { type: 'string', max: 6, message: '不要超出6位'}
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let password = null
                    if (! this.form.isShare) {
                        if (this.form.password.length == 0) {
                            this.$Message.warning('密码不得为空')
                            return
                        }
                        password = this.form.password
                    }
                    
                    let totalTime = null
                    if (this.form.timeType == 1) {
                        totalTime = Date.parse(this.form.totalTime)
                    }
                    let startTime = Date.parse(this.form.timeRange[0])
                    let endTime = Date.parse(this.form.timeRange[1])

                    let contestType = this.form.contestType
                    let timeType = this.form.timeType
                    let type = null
                    if (contestType == 0) {
                        if (timeType == 0) {
                            type = 0
                        } else {
                            type = 1
                        }
                    } else {
                        if (timeType == 0) {
                            type = 2
                        } else {
                            type = 3
                        }
                    }

                    let data = {
                        name: this.form.name,
                        slogan: this.form.slogan,
                        description: this.form.description,
                        password: password,
                        type: type,
                        total_time: totalTime,
                        start_time: startTime,
                        end_time: endTime
                    }
                    this.loading = true
                    this.$http.put('/user/contest/'+this.cid, data).then(res => {
                        this.$Message.success(res.message)
                    }).catch(res => {
                        this.$Message.error(res.message)
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    this.$Message.error('请按照要求填写');
                }
            })
        },
        getContest() {
            this.$http.get('/user/contest/'+this.cid).then(res => {
                res = res.data
                this.form.name = res.name
                this.form.slogan = res.slogan
                this.form.description = res.description
                if(res.password == undefined) {
                    this.form.isShare = true
                } else {
                    this.form.isShare = false
                    this.form.password = res.password
                }

                if (res.type == 0) {
                    this.form.contestType = 0
                    this.form.timeType = 0
                } else if (res.type == 1) {
                    this.form.contestType = 0
                    this.form.timeType = 1
                    this.form.totalTime = new Date(res.total_time)
                } else if (res.type == 2) {
                    this.form.contestType = 1
                    this.form.timeType = 0
                } else {
                    this.form.contestType = 1
                    this.form.timeType = 1
                    this.form.totalTime = new Date(res.total_time)
                }

                let startTime = new Date(res.start_time)
                let endTime = new Date(res.end_time)
                this.form.timeRange = [startTime, endTime]
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


