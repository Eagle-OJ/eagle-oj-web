<template>
    <div class="profile">
        <div class="avatar">
            <img src="/static/avatar.jpg"/>
            <label for="avatarUpload">
                <Icon type="upload"></Icon> 上传头像
            </label>
            <input id="avatarUpload" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="showAvatarUpload" style="position:absolute; clip:rect(0 0 0 0);"/>
        </div>

        <div class="divder" style="border-bottom: 1px solid #e9eaec; margin: 10px 0"></div>

        <div class="edit">
            <Form ref="edit" :model="user" :label-width="80" :rules="validate">
                <FormItem label="昵称" prop="nickname">
                    <Input v-model="user.nickname"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="user.email"></Input>
                </FormItem>
                <FormItem label="签名">
                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="user.motto"></Input>
                </FormItem>
                
                <FormItem label="性别">
                    <RadioGroup v-model="user.sex">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                        <Radio label="secret">保密</Radio>
                    </RadioGroup>
                </FormItem>
                
                <FormItem>
                    <Button type="primary" @click="saveEdit">保存</Button>
                </FormItem>
            </Form>
        </div>
        <Modal v-model="avatar.isShow" title="头像上传" @on-ok="uploadAvatar" ok-text="上传">
            <vueCropper
                ref="cropper"
                :img="avatar.data"
                :outputSize="0.5"
                :info="true"
                :autoCrop="true"
                style="height: 300px; width: 100%"
                :fixedBox="true"
                :autoCropWidth="150"
                :autoCropHeight="150"
            ></vueCropper>
        </Modal>
    </div>
</template>

<script>
import vueCropper from 'vue-cropper'
export default {
    data() {
        return {
            avatar: {
                data: '',
                isShow: false,
                fixedNumber: [1,1]
            },
            user: {
                nickname: '',
                email: '',
                motto: '',
                sex: 'secret',
            },
            validate: {
                nickname: [
                    { required: true, message: '请输入昵称' },
                    { type: 'string', max: 20, message: '最大不要超出20个字', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '非法邮箱格式'}
                ],
            }
        }
    },
    methods: {
        showAvatarUpload(e) {
            this.avatar.isShow = true
            //上传图片
			// this.option.img
			let file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			let reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
                }
                this.avatar.data = data
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
        },
        uploadAvatar() {
            this.$refs.cropper.getCropBlob((data) => {
            // do something
            console.log(data)  
            })
        },
        saveEdit() {
            this.$refs['edit'].validate((valid) => {
				if (valid) {
					this.$Message.success('修改成功');
				} else {
					this.$Message.error('请按照规则填写');
				}
			})
        }
    },
    components: {
        vueCropper
    }
}
</script>

<style lang="stylus" scoped>
    .profile
        .avatar
            height 100px
            line-height 100px
            img
                width 100px
                height 100px
                border-radius 50px
                margin-right 20px
                float left
            label
                cursor pointer
                color #495060
                background-color transparent
                border-color #dddee1
                line-height 1.5
                border 1px solid #dddee1
                border-radius 3px
                padding 10px 15px
                font-size 14px
                transition all .3s
                &:hover
                    color #2b85e4
                    border-color #2b85e4
        .edit
            max-width 500px
</style>

