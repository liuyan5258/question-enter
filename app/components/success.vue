<template> 
  <div class="register-success">
    <img src="http://t.c.m.163.com/newsapp/question-success.png" alt="申请成功">
    <p class="success">提交申请成功</p>
    <p class="sorry">小编正在努力审核中</p>
    <div class="f-back">返回问吧</div>
  </div>
</template> 

<style lang="sass">
  .register-success{
    width: 7.5rem;
    padding-top: 1.5rem;
    text-align: center;
  }
  .register-success p{
    color: #333;
  }
  .register-success img {
    width: 2.5rem;
    height: 2.41rem;
    max-width: 100%;
  }
  .register-success .success {
    padding: .5rem 0 .2rem;
    color: #333;
    font-size: .36rem;
  }
  .register-success .wait {
    font-size: .28rem;
  }
  .register-success .f-back {
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