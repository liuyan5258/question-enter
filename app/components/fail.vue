<template> 
  <div class="register-fail">
    <img src="http://t.c.m.163.com/newsapp/question-enter-error.png" alt="申请失败">
    <p class="fail">申请失败</p>
    <p class="sorry">抱歉，您的申请没有通过</p>
    <div class="again" v-link="'/home'">重新申请</div>
  </div>
</template> 

<style lang="sass">
  .register-fail {
    width: 7.5rem;
    padding-top: 1.5rem;
    text-align: center;
  }
  .register-fail p {
    color: #333;
  }
  .register-fail img {
    width: 2.6rem;
    height: 1.4rem;
    max-width: 100%;
  }
  .register-fail .fail {
    padding: .4rem 0 .22rem;
    font-size: .36rem;
  }
  .register-fail .sorry {
    font-size: .28rem;
  }
  .register-fail .again {
    width: 5.5rem;
    height: .9rem;
    margin: .73rem auto 0;
    line-height: .9rem;
    background: #df3031;
    border-radius: .04rem;
    color: #fff;
    font-size: .36rem;
    box-shadow: 0 .05rem 0 0 rgba(223, 223, 223, 1);
  }
</style>