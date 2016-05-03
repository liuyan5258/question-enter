<template>
  <div class="form-body two-step">
    <iframe id="iframe" style="display: none !important;"></iframe>
    <div class="form-question-title" :class="{invalidText: isTitle}">
      <label>问吧标题</label>
      <textarea rows="3" v-model="model.title" v-form-ctrl name="title" required min="20" max="40" placeholder="请输入20-40字的问吧标题
例如：我是专栏作家xx，关于哲学、社会学和时事热点的问题，问我吧！" autocomplete="off" v-on:blur="onBlur"></textarea>
    </div>
    <div class="type-option">
      <label>问吧类别</label>
      <select v-model="model.selected">
        <option selected>人文历史1</option>
        <option>人文历史2</option>
        <option>人文历史3</option>
      </select>
    </div>
    <h3 class="form-certificate">给小编留言（选填）</h3>
    <div class="form-board" :class="{invalidText: isBoardText}">
      <textarea rows="3" v-model="model.boardText" v-form-ctrl name="boardText" required max="800" placeholder="详细介绍自己擅长的话题，以及可以作答的时间，能够帮助你更快地通过审核。内容不超过800字。" autocomplete="off" v-on:blur="onBlur"></textarea>
    </div>
    <h3 class="form-certificate">问吧封面（选填）</h3>
    <div class="cover">
      <img class="defalut-icon" src="http://t.c.m.163.com/newsapp/default_header.png" alt="" @click="onPhoto">
      <form action="http://upfile.m.163.com/nos/upload/pub" id="iosupload" target="iosupload" enctype="multipart/form-data" method="POST" style="display:none;">
          <input type="file" accept="image/*" name="abc" id="inputFile">
      </form>
    </div>
    <button class="next-step" type="submit" :style="{background: myform.$valid ? '#df3031' : '#b0b0b0'}">提交申请</button> 
  </div>
</template>
<script>
export default {
  props: ['myform'],
  data () {
    return {
      model: {},
      isTitle: false,
      isBoardText: false
    }
  },
  computed: {
    
  },
  methods: {     
    onBlur: function () {
      var that = this.$parent
      if(!that.isfocus) {
        // 输入框的错误状态  
        this.isTitle = !this.myform.title.$error.required && !this.myform.title.$valid
        this.isBoardText = !this.myform.boardText.$error.required && !this.myform.boardText.$valid

        // 顶部错误提示
        if (!this.myform.title.$error.required && this.myform.title.$error.min) {
          that.isfocus = true
          that.errorMsg = '问吧标题字数太少'
        }
        if ((!this.myform.title.$error.required && this.myform.title.$error.max) || (!this.myform.boardText.$error.required && this.myform.boardText.$error.max)) {
          that.isfocus = true
          that.errorMsg = '字数超过限制'
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
        iframe.src = 'uploadimage://album/100_100'
        window.__newsapp_upload_image_done = function (r) {
          img.src = r
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
  .two-step {
    label {
      width: 1.8rem;
    }
    .form-question-title {
      height: 2rem;
      textarea {
        width: 4.5rem;
        height: 1.75rem;
      }
    }
    .type-option {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: .27rem;
        top: .36rem;
        width: .15rem;
        height: .27rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURTIyMkxpcTIyMjIyMjIyMjIyMjIyMjIyMjIyMiUXGMQAAAAJdFJOU4AAG3k9MHJXET1g3BoAAAB6SURBVBgZXZBLFsAgCAOTWrX3P3EJWMG68c3wU8B5sRxMoAp0HAI8BSjRdonxIcS8285w5g2MKAlOsdjFY6UfSzQTm1dGcojCHLDfaH4cH5osfLLfr78nW93KV9QfHLwx4mUDihdUvKKxYdmw9pvbs3kTra8H6wJnRb71uAJXAAkoNgAAAABJRU5ErkJggg==) no-repeat;
        background-size: cover;
      }
    }
    select {
      font-size: .28rem;
      color: #181818;
    }
    .form-certificate {
      padding: .1rem 0 .18rem;
      font-size: .26rem;
      font-weight: normal;
      color: #999;
    }
    .form-board {
      height: 1.4rem;
      textarea {
        padding-left: .3rem;
        padding-right: .3rem;
        width: 6.28rem;
        height: 1.15rem;
      }
    }
    .cover {
      height: 3.2rem;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: center;
      justify-content: center;
      img {
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 1.3rem;
      }
    }
  }
</style>