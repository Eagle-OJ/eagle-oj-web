<template>
    <div id="container">
        <Form ref="form" :model="form" :rules="validate" :label-width="80">
            <FormItem label="比赛名称" prop="name">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="标语" prop="slogan">
                <Input v-model="form.slogan" type="textarea"></Input>
            </FormItem>
            <FormItem label="描述" prop="description">
                <Input v-model="form.description" type="textarea"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="form.password" placeholder="为空则无密码"></Input>
            </FormItem>
            <FormItem label="比赛模式" prop="contest_type">
                <RadioGroup v-model="form.contest_type">
                    <Radio label="0">ACM</Radio>
                    <Radio label="1">普通</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="时间模式" prop="time_type">
                <RadioGroup v-model="form.time_type">
                    <Radio label="0">限时</Radio>
                    <Radio label="1">正常</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="有效时间" prop="valid_time">
                <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem>
                <Button style="float: right" type="primary" @click="handleSubmit">创建比赛</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                slogan: '',
                description: '',
                start_time: 0,
                end_time: 0,
                total_time: 0,
                password: '',
                type: 0,
                contest_type: 0,
                time_type: 0
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
                    { required: true, message: '请输入描述'}
                ],
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


