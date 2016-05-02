<template> 
  <div class="m-body-wrap">
    <iframe id="iframe" style="display: none !important;"></iframe>
    <form v-form name="myform" @submit.prevent="onSubmit">
      <div class="form-title">基本信息（必填）</div>
      <div v-if="isfocus" transition="warn">
        <span class="tip-icon"></span>
        <span>{{errorMsg}}</span>
      </div>
      <div class="form-body first-step">
        <div class="form-header">
          <label>设置头像</label>
          <img id="header" src="http://t.c.m.163.com/newsapp/default_header.png" alt="">
          <!-- <form action="http://upfile.m.163.com/nos/upload/pub" id="iosupload" target="iosupload" enctype="multipart/form-data" method="POST" style="display:none;">
              <input type="file" accept="image/*" name="abc" id="inputFile">
          </form> -->
        </div>
        <div :class="{invalidText: !myform.username.$error.required && !myform.username.$valid}">
          <label>申请人姓名</label>
          <input v-model="model.username" v-form-ctrl required name="username" placeholder="不超过10个字" autocomplete="off" v-on:blur="onBlur" type="username" />
        </div>
        <div :class="{invalidText: !myform.profession.$error.required && !myform.profession.$valid}">
          <label>申请人职业</label>
          <input v-model="model.profession" v-form-ctrl required name="profession" max="20" placeholder="请填写20字以内的职业名称" autocomplete="off" v-on:blur="onBlur" />
        </div>
        <div :class="{invalidText: !myform.contact.$error.required && !myform.contact.$valid}">
          <label>联系方式</label>
          <input v-model="model.contact" v-form-ctrl required name="contact" placeholder="手机号码或邮箱地址均可" autocomplete="off" type="contact" v-on:blur="onBlur"/>
        </div>
        <div class="form-textarea" :class="{invalidText: !myform.intro.$error.required && !myform.intro.$valid}">
          <label>个人介绍</label>
          <textarea rows="7" v-model="model.intro" v-form-ctrl name="intro" required min="2" max="200" placeholder="请输入不超过200字的个人介绍" autocomplete="off" v-on:blur="onBlur"></textarea>
        </div>
        <button class="next-step" type="submit" :style="{background: myform.$valid ? '#df3031' : '#b0b0b0'}">下一步</button> 
      </div>
    </form>
    <pre>{{ myform | json}}</pre>
  </div>
</template> 

<script>
export default {
  data () {
    return {
      myform: {},
      model: {},
      isfocus: false,
      errorMsg: ''
    }
  },
  computed: {
    
  },
  methods: {     
    onSubmit: function () {
      console.log(this.myform.$valid);
    },
    onBlur: function () {
      if(!this.isfocus) {
        if (!this.myform.username.$error.required && !this.myform.username.$valid) {
          this.isfocus = true
          this.errorMsg = '请输入10个字以内中文或英文的用户名'
        } 
        if (!this.myform.intro.$error.required && this.myform.intro.$error.min) {
          this.isfocus = true
          this.errorMsg = '个人介绍字数太少'
        }
        if ((!this.myform.profession.$error.required && this.myform.profession.$error.max) || (!this.myform.intro.$error.required && this.myform.intro.$error.max)) {
          this.isfocus = true
          this.errorMsg = '字数超过限制'
        }
        if (!this.myform.contact.$error.required && !this.myform.contact.$valid) {
          this.isfocus = true
          this.errorMsg = '请填写正确的手机号或邮箱'
        }
      }
      // 3秒后隐藏错误提示
      setTimeout((function(){
        this.isfocus = false
      }).bind(this),3000)
    }
  }
}
</script> 

<style lang="sass">
  @import '../assets/css/base.css';
  
  .m-body-wrap {
    width: 7.5rem;
    .form-title {
      margin: .45rem 0 .2rem .3rem;
      font-size: .26rem;
      color: #999;
    }
  }
  .form-body {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    width: 6.92rem;
    &>div {
      margin-bottom: .2rem;
      width: 6.88rem;
      height: 1rem;
      line-height: 1rem;
      background: #f3f3f3;
      border: .02rem solid #fff;
    }
    label {
      display: inline-block;
      float: left;
      padding-left: .3rem;
      width: 2.15rem;
      height: 1rem;
      font-size: .28rem;
      color: #606060;
    }
    input,textarea {
      font-size: .28rem;
      color: #606060;
      background: #f3f3f3;
    }
    input {
      width: 4.43rem;
      height: 1rem;
      line-height: 1rem;
    }
    textarea {
      overflow-x: hidden;
      padding-top: .25rem;
      width: 4.43rem;
      height: 3.55rem;
      line-height: .46rem;
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
    }
    .form-textarea {
      height: 3.8rem;
    }
    .invalidText {
      border: .02rem solid rgba(255,117,33,.3);
    }
    .next-step {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: .36rem;
      color: white;
      border-radius: .04rem;
      background: #b0b0b0;
      box-shadow: 0 .05rem 0 0 rgba(223, 223, 223, .004);
    }
    .form-board {
      font-size: .26rem;
      color: #999;
      background: none;
    }
  }
  .warn-transition {
    position: fixed;
    left: .3rem;
    top: 0;
    z-index: 9999;
    transition: all .3s ease;
    width: 6.92rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border-radius: .04rem;
    color: #fff;
    background: #ff7521;
  }
  .warn-enter, .warn-leave {
    height: 0;
    opacity: 0;
  }
  .tip-icon {
    display: inline-block;
    width: .36rem;
    height: .36rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUxpcf///////////////////////////////////////////////////////////////////6Sl3sMAAAARdFJOUwBTJi5tZh4DQ3diCk4QNLvvSE/8ygAAARxJREFUOBGNlFmigyAMRS+TYdS6/802VK0B7HvwBeFkIAOAWGVVLvByai1CLLZkYshmSURpMTlEQ+Ly3GobtRCTjlZ3FOVBBG2z0AKSU6lT42NSTkiT9SNSJd5+KXI/GKbc5TGrZztVqvJxp2+bgNu2zQmddD6oeZfa971xrm11aKJQhO8hRMP3scnZCGk2UsIV/8fgCFEoWM/wT58jhLxCVZf30kNMMApuuYm6Y6gJElgcwjfxB8xQq4UU0Mb9sdRBxNC/lh6g15O7PvBtgDjwLgUYIU7B+kefHC/gZHZl6V7Gx1qWqQLPtQo1TTcU+Gg6ni+Rz+K9lyN+tS9mBgFTI4WZ4Zwbc87YxIfBiZ34emo1+k+syh7Wr+/wDcKqCnaWIuVqAAAAAElFTkSuQmCC) no-repeat;
    background-size: cover;
  }
</style>