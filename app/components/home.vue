<template> 
  <div class="m-body-wrap">
    <iframe id="iframe" style="display: none !important;"></iframe>
    <iframe id="loginIframe" style="display: none" name="login"></iframe>
    <form name="myform" class="form-body">
      <div class="form-title">基本信息（必填）</div>
      <div v-if="isError" transition="warn">
        <span class="tip-icon"></span>
        <span>{{ errorMsg }}</span>
      </div>
      <onestep v-if="step == 1" :myform="myform"></onestep>
      <twostep v-if="step == 2" :myform="myform"></twostep>
    </form>
  </div>
</template> 

<script>
import onestep from './oneStep.vue'
import twostep from './twoStep.vue'
export default {
  data () {
    return {
      myform: {
        specialistAccount: ''
      },
      step: 1,
      isError: false,
      errorMsg: ''
    }
  },
  methods: {
    getCookie(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
    },
    doVerifyCookie() {
      let S_INFO = this.getCookie('S_INFO')
      let P_INFO = this.getCookie('P_INFO') 
      S_INFO = S_INFO && S_INFO.split('|')
      P_INFO = P_INFO && P_INFO.split('|')
      return (S_INFO && (P_INFO[2]!='2'))
    }
  },
  ready() {
    // 获取账户通行证
    const iframe = document.querySelector('#loginIframe')
    const that = this
    window.__newsapp_userinfo_done = function(rs){
      if (rs) {
        that.myform.specialistAccount = rs.name
        if (! this.doVerifyCookie()) {
          iframe.src = 'login://'
        }
      } else {
        iframe.src = 'login://'
      }
    }
    window.onload = function(){
      setTimeout(function(){
        if (navigator.userAgent.match(/NewsApp/ig)) {
          iframe.src = 'userinfo://'
        }
      },500)
    }
  },
  components: { 
    onestep,
    twostep
  }
}
</script> 

<style lang="sass">
  @import '../assets/css/base.css';
  
  .form-title {
    padding: .45rem 0 .2rem 0;
    font-size: .26rem;
    color: #999;
  }
  #ios-header-pic {
    display: none;
  }
  .form-step1 > div,
  .form-step2 > div {
    margin-bottom: .2rem;
    width: 6.9rem;
    line-height: 1rem;
    background: #f3f3f3;
    border: 2px solid #fff;
  }
  .form-step1 > div.red,
  .form-step2 > div.red {
    border: 2px solid #ff7521;
  }
  .form-body {
    width: 6.92rem;
    label {
      display: inline-block;
      float: left;
      padding-left: .3rem;
      height: 1rem;
      font-size: .28rem;
      color: #606060;
    }
    input {
      width: 4.2rem;
      height: 1rem;
      font-size: .28rem;
      color: #606060;
    }
    textarea {
      overflow-x: hidden;
      padding-top: .25rem;
      height: 3.8rem;
      width: 4.43rem;
      line-height: .46rem;
      font-size: .28rem;
      color: #606060;
    }
    select {
      width: 4.6rem;
      font-size: .28rem;
      color: #181818;
    }
    .headerPic {
      width: 1.2rem;
      height: 1.2rem;
      margin-top: .25rem;
      border-radius: 1.2rem;
    }
    .form-header {
      position: relative;
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
    }
    .invalidText {
      border: .02rem solid rgba(255,117,33,.3);
    }
    .f-step {
      width: 100%;
      margin: .4rem 0 .3rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: .36rem;
      color: white;
      border-radius: .04rem;
      background: #b0b0b0;
      box-shadow: 0 .05rem 0 0 rgba(223, 223, 223, .004);
      &.red {
        background: #df3031;
      }
    }
  }
  .warn-transition {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 9999;
    transition: all .3s ease;
    width: 6.9rem;
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
    margin-right: .1rem;
    width: .38rem;
    height: .8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUxpcf///////////////////////////////////////////////////////////////////6Sl3sMAAAARdFJOUwBTJi5tZh4DQ3diCk4QNLvvSE/8ygAAARxJREFUOBGNlFmigyAMRS+TYdS6/802VK0B7HvwBeFkIAOAWGVVLvByai1CLLZkYshmSURpMTlEQ+Ly3GobtRCTjlZ3FOVBBG2z0AKSU6lT42NSTkiT9SNSJd5+KXI/GKbc5TGrZztVqvJxp2+bgNu2zQmddD6oeZfa971xrm11aKJQhO8hRMP3scnZCGk2UsIV/8fgCFEoWM/wT58jhLxCVZf30kNMMApuuYm6Y6gJElgcwjfxB8xQq4UU0Mb9sdRBxNC/lh6g15O7PvBtgDjwLgUYIU7B+kefHC/gZHZl6V7Gx1qWqQLPtQo1TTcU+Gg6ni+Rz+K9lyN+tS9mBgFTI4WZ4Zwbc87YxIfBiZ34emo1+k+syh7Wr+/wDcKqCnaWIuVqAAAAAElFTkSuQmCC) no-repeat left center;
    background-size: .36rem;
  }
</style>