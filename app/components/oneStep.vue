<template>
  <div class="form-step1">
    <div class="form-header">
      <label>设置头像</label>
      <input type="file" accept="image/*" id="ios-header-pic" @change="iosUpload"/>
      <img src="http://t.c.m.163.com/newsapp/default_header.png" class="headerPic" @click="uploadPhoto"/>
    </div>
    <div :class="{ 'red' : borderClass == 'specialistName'}">
      <label>申请人姓名</label>
      <input type="text" v-model="specialistName" @input="isValidName" placeholder="不超过10个字" name="specialistName" autocomplete="off"/>
    </div>
    <div :class="{ 'red' : borderClass == 'specialistTitle'}">
      <label>申请人职业</label>
      <input type="text" v-model="specialistTitle" @input="isValidTitle" placeholder="请填写20字以内的职业名称" name="specialistTitle" autocomplete="off"/>
    </div>
    <div :class="{ 'red' : borderClass == 'specialistContact'}">
      <label>联系方式</label>
      <input type="text" v-model="specialistContact" @input="isValidContact" placeholder="手机号码或邮箱地址均可" name="specialistContact" autocomplete="off"/>
    </div>
    <div class="form-textarea" :class="{ 'red' : borderClass == 'specialistDescription'}">
      <label>个人介绍</label>
      <textarea rows="7" v-model="specialistDescription" @input="isValidDesc" placeholder="请输入不超过200字的个人介绍" name="specialistDescription" id="introduce" autocomplete="off"></textarea>
    </div>
    <button class="f-step js-next-step" :style="{background: _isValid ? '#df3031' : '#b0b0b0'}" @click.prevent="nextStep">下一步</button> 
  </div>
</template>
<script>
export default {
  props: ['myform'],
  data () {
    return {
      specialistPicurl: '',
      specialistName: '',
      specialistTitle: '',
      specialistContact: '',
      specialistDescription: '',
      borderClass: ''
    }
  },
  computed: {
    // 整体检验，下一步是否可激活
    _isValid() {
      if (this.specialistPicurl && this.specialistName && this.specialistTitle && this.specialistContact && this.specialistDescription && !this.$parent.isError) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {  
    /**
     * isError : 顶部错误提示
     * borderClass : 边框错误提示
     * errorMsg : 错误信息
     */
    isValidName() {
      let parent = this.$parent
      if (this.specialistName == '') {
        parent.isError = true
        this.borderClass = 'specialistName'
        parent.errorMsg = '用户名不能为空'
      } else if (!/^[a-zA-Z]{1,10}|[\u4e00-\u9fa5]{1,10}$/.test( this.specialistName )) {
        parent.isError = true
        this.borderClass = 'specialistName'
        parent.errorMsg = '请输入10个字以内中文或英文的用户名'
      } else {
        parent.isError = false
        this.borderClass = ''
      }
    },

    isValidTitle() {
      let parent = this.$parent
      if (this.specialistTitle == '') {
        parent.isError = true
        this.borderClass = 'specialistTitle'
        parent.errorMsg = '职业不能为空'
      } else if (this.specialistTitle.length > 20) {
        parent.isError = true
        this.borderClass = 'specialistTitle'
        parent.errorMsg = '职业的长度不能超过20'
      } else {
        parent.isError = false
        this.borderClass = ''
      }
    },

    isValidContact() {
      const isContact = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test( this.specialistContact )
      let parent = this.$parent
      if (this.specialistContact == '') {
        parent.isError = true
        this.borderClass = 'specialistContact'
        parent.errorMsg = '联系方式不能为空'
      } else if (!isContact) {
        parent.isError = true
        this.borderClass = 'specialistContact'
        parent.errorMsg = '请填写正确的联系方式'
      } else {
        parent.isError = false
        this.borderClass = ''
      }
    },

    isValidDesc() {
      let parent = this.$parent
      if (this.specialistDescription == '') {
        parent.isError = true
        this.borderClass = 'specialistDescription'
        parent.errorMsg = '个人介绍不能为空'
      } else if (this.specialistDescription.length < 2) {
        parent.isError = true
        this.borderClass = 'specialistDescription'
        parent.errorMsg = '个人介绍的长度不能少于2个字'
      } else if (this.specialistDescription.length > 200) {
        parent.isError = true
        this.borderClass = 'specialistDescription'
        parent.errorMsg = '个人介绍的长度不能大于200个字'
      } else {
        parent.isError = false
        this.borderClass = ''
      }
    },

    // 上传头像
    uploadPhoto() {
      const isAndriod = navigator.userAgent.match(/android/ig)
      const that = this
      if (isAndriod) {
        const iframe = this.$parent.$el.querySelector('#iframe')
        iframe.src = 'uploadimage://album/100_100'
        window.__newsapp_upload_image_done = function(r) {
          that.specialistPicurl = r
          document.querySelector('.headerPic').src = r
        }
      } else {
        const iosTagger = this.$el.querySelector('#ios-header-pic')
        iosTagger.click()
      }
    },

    // ios上传头像
    iosUpload() {
      const file = this.$el.querySelector('#ios-header-pic').files[0]
      const formData = new FormData()
      formData.append('specialistPicurl', file)
      this.$http.post('http://upfile.m.163.com/nos/upload/pub', formData).then(function(data, status, request){
        this.specialistPicurl = data.data.url
        this.$el.querySelector('.headerPic').src = data.data.url
      })
    },

    nextStep() {
      if (this._isValid) {
        this.$parent.myform.specialistPicurl = this.specialistPicurl
        this.$parent.myform.specialistName = this.specialistName
        this.$parent.myform.specialistTitle = this.specialistTitle
        this.$parent.myform.specialistContact = this.specialistContact
        this.$parent.myform.specialistDescription = this.specialistDescription
        this.$parent.step = 2
      }
    }
  }
}
</script> 
<style lang="sass">
  .form-step1 label {
    width: 2.15rem;
  }
  .form-step1 > div:nth-child(2),
  .form-step1 > div:nth-child(3),
  .form-step1 > div:nth-child(4) {
    height: 1rem;
  }
</style>