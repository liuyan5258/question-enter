<template>
  <div class="form-body first-step">
    <iframe id="iframe" style="display: none !important;"></iframe>
    <div class="form-header">
      <label>设置头像</label>
      <!-- <img id="header" src="http://t.c.m.163.com/newsapp/default_header.png" alt="" @click="onPhoto"> -->
      <input v-model="model.header" v-form-ctrl required name="header" :style="{background: model.header ? 'url(' + model.header + ')' : 'url(http://t.c.m.163.com/newsapp/default_header.png)', backgroundSize: 'cover'}" @click="onPhoto" v-on:blur="onBlur"/>
      <form action="http://upfile.m.163.com/nos/upload/pub" id="iosupload" target="iosupload" enctype="multipart/form-data" method="POST" style="display:none;">
        <input type="file" accept="image/*" name="abc" id="inputFile">
      </form>
    </div>
    <div :class="{invalidText: isUsername}">
      <label>申请人姓名</label>
      <input v-model="model.username" v-form-ctrl required name="username" placeholder="不超过10个字" autocomplete="off" v-on:blur="onBlur" type="username" />
    </div>
    <div :class="{invalidText: isProfession}">
      <label>申请人职业</label>
      <input v-model="model.profession" v-form-ctrl required name="profession" max="20" placeholder="请填写20字以内的职业名称" autocomplete="off" v-on:blur="onBlur" />
    </div>
    <div :class="{invalidText: isContact}">
      <label>联系方式</label>
      <input v-model="model.contact" v-form-ctrl required name="contact" placeholder="手机号码或邮箱地址均可" autocomplete="off" type="contact" v-on:blur="onBlur"/>
    </div>
    <div class="form-intro" :class="{invalidText: isIntro}">
      <label>个人介绍</label>
      <textarea rows="7" v-model="model.intro" v-form-ctrl name="intro" required min="2" max="200" placeholder="请输入不超过200字的个人介绍" autocomplete="off" v-on:blur="onBlur"></textarea>
    </div>
    <button class="next-step" type="submit" :style="{background: myform.$valid ? '#df3031' : '#b0b0b0'}">下一步</button> 
  </div>
</template>
<script>
export default {
  props: ['myform'],
  data () {
    return {
      model: {
        header: ''
      },
      isUsername: false,
      isProfession: false,
      isContact: false,
      isIntro: false
    }
  },
  computed: {
    
  },
  methods: {     
    onBlur: function () {
      var that = this.$parent
      if(!that.isfocus) {
        // 输入框的错误状态  
        this.isUsername = !this.myform.username.$error.required && !this.myform.username.$valid
        this.isProfession = !this.myform.profession.$error.required && !this.myform.profession.$valid
        this.isContact = !this.myform.contact.$error.required && !this.myform.contact.$valid
        this.isIntro = !this.myform.intro.$error.required && !this.myform.intro.$valid

        // 顶部错误提示
        if (!this.myform.header.$error.required) {
          that.isfocus = true
          that.errorMsg = '请上传头像'
        } 
        if (!this.myform.username.$error.required && !this.myform.username.$valid) {
          that.isfocus = true
          that.errorMsg = '请输入10个字以内中文或英文的用户名'
        } 
        if (!this.myform.intro.$error.required && this.myform.intro.$error.min) {
          that.isfocus = true
          that.errorMsg = '个人介绍字数太少'
        }
        if ((!this.myform.profession.$error.required && this.myform.profession.$error.max) || (!this.myform.intro.$error.required && this.myform.intro.$error.max)) {
          that.isfocus = true
          that.errorMsg = '字数超过限制'
        }
        if (!this.myform.contact.$error.required && !this.myform.contact.$valid) {
          that.isfocus = true
          that.errorMsg = '请填写正确的手机号或邮箱'
        }
      }
      
      // 3秒后隐藏错误提示
      setTimeout((function(){
        that.isfocus = false
      }).bind(this),3000)
    },
    onPhoto: function () {
      var isAndroid = navigator.userAgent.match(/android/ig)
      var isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig)
      var iframe = this.$el.querySelector('#iframe')
      var img = this.$el.querySelector('#header')
      
      var inputFile = this.$el.querySelector('#inputFile')
      var iosupload = this.$el.querySelector('#iosupload')

      // Android下获取相册图片
      if(isAndroid) {
        var that = this
        iframe.src = 'uploadimage://album/100_100'
        window.__newsapp_upload_image_done = function (r) {
          that.model.header = r
        }
      }else {
        inputFile.onchange = function () {
          var file = this.files[0]
          if (file && /image\/\w+/.test(file.type) ) {
            iosupload.submit()
          }
        }
        inputFile.click()
      }
    }
  }
}
</script> 
<style lang="sass">
  .first-step {
    label {
      width: 2.15rem;
    }
    .form-header {
      height: 1.7rem;
      &::after {
        content: '';
        position: absolute;
        right: .27rem;
        top: .72rem;
        width: .15rem;
        height: .27rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURTIyMkxpcTIyMjIyMjIyMjIyMjIyMjIyMjIyMiUXGMQAAAAJdFJOU4AAG3k9MHJXET1g3BoAAAB6SURBVBgZXZBLFsAgCAOTWrX3P3EJWMG68c3wU8B5sRxMoAp0HAI8BSjRdonxIcS8285w5g2MKAlOsdjFY6UfSzQTm1dGcojCHLDfaH4cH5osfLLfr78nW93KV9QfHLwx4mUDihdUvKKxYdmw9pvbs3kTra8H6wJnRb71uAJXAAkoNgAAAABJRU5ErkJggg==) no-repeat;
        background-size: cover;
      }
      label {
        width: 4.53rem;
        line-height: 1.7rem;
      }
      img {
        margin-top: .25rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 1.2rem;
      }
      input {
        margin-top: .25rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 1.2rem;
        text-indent: -99999rem;
        // background: url(http://t.c.m.163.com/newsapp/default_header.png);
        background-size: cover;
      }
    }
    .form-intro {
      height: 3.8rem;
      textarea {
        height: 3.55rem;
      }
    }
  }
</style>