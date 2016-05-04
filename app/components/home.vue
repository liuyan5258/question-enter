<template> 
  <div class="m-body-wrap">
    <form v-form name="myform" @submit.prevent="onSubmit">
      <div class="form-title">基本信息（必填）</div>
      <div v-if="isfocus" transition="warn">
        <span class="tip-icon"></span>
        <span>{{ errorMsg }}</span>
      </div>
      <onestep v-if="step == 1" :myform="myform"></onestep>
      <twostep v-if="step == 2" :myform="myform"></twostep>
    </form>
    <pre>{{ myform | json }}</pre>
  </div>
</template> 

<script>
import onestep from './oneStep.vue'
import twostep from './twoStep.vue'
export default {
  data () {
    return {
      myform: {},
      step: 1,
      isfocus: false,
      errorMsg: ''
    }
  },
  components: { 
    onestep,
    twostep
  },
  methods: {
    onSubmit() {
      if (this.myform.$valid) {
        this.step = 2
      }
      console.log(this.myform.$valid);
    }
  }
}
</script> 

<style lang="sass">
  @import '../assets/css/base.css';
  
  .m-body-wrap {
    width: 7.5rem;
    .form-title {
      padding: .45rem 0 .2rem .3rem;
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
      border: 1px solid #fff;
    }
    label {
      display: inline-block;
      float: left;
      padding-left: .3rem;
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
      width: 4.2rem;
      // height: 1rem;
      // line-height: 1rem;
    }
    textarea {
      overflow-x: hidden;
      padding-top: .25rem;
      width: 4.43rem;
      line-height: .46rem;
    }
    .invalidText {
      border-color: rgba(255,117,33,.3);
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
    display: inline-block;
    width: .36rem;
    height: .36rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUxpcf///////////////////////////////////////////////////////////////////6Sl3sMAAAARdFJOUwBTJi5tZh4DQ3diCk4QNLvvSE/8ygAAARxJREFUOBGNlFmigyAMRS+TYdS6/802VK0B7HvwBeFkIAOAWGVVLvByai1CLLZkYshmSURpMTlEQ+Ly3GobtRCTjlZ3FOVBBG2z0AKSU6lT42NSTkiT9SNSJd5+KXI/GKbc5TGrZztVqvJxp2+bgNu2zQmddD6oeZfa971xrm11aKJQhO8hRMP3scnZCGk2UsIV/8fgCFEoWM/wT58jhLxCVZf30kNMMApuuYm6Y6gJElgcwjfxB8xQq4UU0Mb9sdRBxNC/lh6g15O7PvBtgDjwLgUYIU7B+kefHC/gZHZl6V7Gx1qWqQLPtQo1TTcU+Gg6ni+Rz+K9lyN+tS9mBgFTI4WZ4Zwbc87YxIfBiZ34emo1+k+syh7Wr+/wDcKqCnaWIuVqAAAAAElFTkSuQmCC) no-repeat;
    background-size: cover;
  }
</style>