<template>
  <div class="form-step2">
    <div class="form-question-title" :class="{ 'red' : borderClass == 'expertAlias'}">
      <label>问吧标题</label>
      <textarea rows="3" v-model="expertAlias" name="expertAlias" @input="isValidAlias" placeholder="请输入20-40字的问吧标题例如：我是专栏作家xx，关于哲学、社会学和时事热点的问题，问我吧！" autocomplete="off"></textarea>
    </div>
    <div class="type-option">
      <label>问吧类别</label>
      <select name="classification" v-model="classification" class="question-type">
        <option v-for="item in items" :value="item.id" >
          {{item.name}}
        </option>
      </select>
    </div>
    <h3 class="form-certificate">给小编留言（选填）</h3>
    <div class="form-board" :class="{ 'red' : borderClass == 'specialistMessage'}">
      <textarea rows="3" name="specialistMessage" v-model="specialistMessage" @input="isMessage" placeholder="详细介绍自己擅长的话题，以及可以作答的时间，能够帮助你更快地通过审核。内容不超过800字。" autocomplete="off"></textarea>
    </div>
    <h3 class="form-certificate">问吧封面（选填）</h3>
    <div class="cover" :style="coverStyle" @click.stop="uploadCover">
      <input type="file" accept="image/*" id="ios-header-pic" @change="iosUpload"/>
      <span class="close" v-if="isClosed" @click.stop="closed"></span>
    </div>
    <button class="f-step js-submit-btn" :style="{background: _isValid ? '#df3031' : '#b0b0b0'}" @click.prevent="conmit">提交</button>
  </div>
</template>
<script>
export default {
  props: ['myform'],
  data () {
    return {
      expertAlias: '',
      classification: 'entertainment',
      specialistMessage: '',
      expertPicurl: '',
      items: '',
      coverStyle: {
        backgroundImage: 'url(http://t.c.m.163.com/newsapp/default_header.png)',
        backgroundSize: '1.3rem'
      },
      isClosed: false,
      borderClass: ''
    }
  },
  ready() {
    this.getQtypeList()
  },
  computed: {
    _isValid() {
      if (this.expertAlias && this.classification && !this.$parent.isError) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {     
    isValidAlias() {
      let parent = this.$parent
      if (this.expertAlias == '') {
        parent.isError = true
        this.borderClass = 'expertAlias'
        parent.errorMsg = '问吧标题不能为空'
      } else if (this.expertAlias.length < 20) {
        parent.isError = true
        this.borderClass = 'expertAlias'
        parent.errorMsg = '问吧标题的长度不能少于20个字'
      } else if (this.expertAlias.length > 40) {
        parent.isError = true
        this.borderClass = 'expertAlias'
        parent.errorMsg = '问吧标题的长度不能大于40个字'
      } else {
        parent.isError = false
        this.borderClass = ''
      }
    },

    isMessage() {
      let parent = this.$parent
      if (this.specialistMessage.length > 800) {
        parent.isError = true
        this.borderClass = 'specialistMessage'
        parent.errorMsg = '留言的长度不能超过800字'
      } else {
        parent.isError = false
        this.borderClass = ''
      }
    },

    // 获取问吧类型列表
    getQtypeList() {
      this.$http.post('http://t.c.m.163.com/newstopic/list/classification.html').then((data) => {
        this.items = data.data.data
      })
    },

    uploadCover() {
      const isAndriod = navigator.userAgent.match(/android/ig)
      if (!!isAndriod) {
        const iframe = this.$parent.$el.querySelector('#iframe')
        const that = this
        iframe.src = 'uploadimage://album/100_100'
        window.__newsapp_upload_image_done = function(r) {
          that.expertPicurl = r
          that.coverStyle = {
            backgroundImage: `url(${r})`,
            backgroundSize: 'cover'
          }
          that.isClosed = true
        }
      } else {
        const iosTagger = this.$el.querySelector('#ios-header-pic')
        iosTagger.click()
      }
    },

    iosUpload() {
      const file = this.$el.querySelector('#ios-header-pic').files[0]
      const formData = new FormData()
      formData.append('expertPicurl', file)
      this.$http.post('http://upfile.m.163.com/nos/upload/pub', formData).then(function(data, status, request){
        this.expertPicurl = data.data.url
        this.coverStyle = {
          backgroundImage: `url(${data.data.url})`,
          backgroundSize: 'cover'
        }
        this.isClosed = true
      })
    },

    closed() {
      this.isClosed = false
      this.coverStyle = {
        backgroundImage: 'url(http://t.c.m.163.com/newsapp/default_header.png)',
        backgroundSize: '1.3rem'
      }
    },

    conmit() {
      if (this._isValid) {
        this.$parent.myform.expertAlias = this.expertAlias
        this.$parent.myform.classification = this.classification,
        this.$parent.myform.specialistMessage = this.specialistMessage,
        this.$parent.myform.expertPicurl = this.expertPicurl
        this.$http.post('http://t.c.m.163.com/wenba/admin/specialist/enterSpecialist.html', this.$parent.myform)
          .then(function(data, status, request) {
            if (data.data.code == 1) {
              console.log('操作成功')
              window.location.href = `${window.location.origin}${window.location.pathname}#!/success`
            } else {
              console.log('操作失败')
              window.location.href = `${window.location.origin}${window.location.pathname}#!/fail`
            }
          })
      }
    }
  }
}
</script> 
<style lang="sass">
  .form-step2  {
    label {
      width: 1.8rem;
    }
    .form-question-title {
      height: 2rem;
      textarea {
        width: 4.75rem;
      }
    }
    .type-option {
      position: relative;
    }
    .type-option::after {
      content: '';
      position: absolute;
      right: .27rem;
      top: .36rem;
      width: .15rem;
      height: .27rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURTIyMkxpcTIyMjIyMjIyMjIyMjIyMjIyMjIyMiUXGMQAAAAJdFJOU4AAG3k9MHJXET1g3BoAAAB6SURBVBgZXZBLFsAgCAOTWrX3P3EJWMG68c3wU8B5sRxMoAp0HAI8BSjRdonxIcS8285w5g2MKAlOsdjFY6UfSzQTm1dGcojCHLDfaH4cH5osfLLfr78nW93KV9QfHLwx4mUDihdUvKKxYdmw9pvbs3kTra8H6wJnRb71uAJXAAkoNgAAAABJRU5ErkJggg==) no-repeat;
      background-size: cover;
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
    }
    .cover {
      position: relative;
      height: 3.2rem;
      background-color: #f3f3f3;
      background-repeat: no-repeat;
      background-position: center;
    }
    .cover .close {
      position: absolute;
      right: -.15rem;top: -.15rem;
      width: .5rem;
      height: .5rem;
      border-radius: .5rem;
      background: #d63226 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUxpcf///////////////////////////////////////////////9z4L/oAAAANdFJOUwD13iQc1OczQy1UFcu7Dot4AAAAdklEQVQYGV3QSw7AIAgEUPBL1fuft0MsgnVjfBEcIZJCcU0hEk45WKk8aKaIoIYrOaBS1yrHQ46BDC/aKNbLUqAnt/XYce/C/KdS2xr3LbSvKOzTWV8ESfVvWggPT0aWE/VOB+cVVcsL5rcn8b0IRKYRR4pWg17tJQKf6O1cTQAAAABJRU5ErkJggg==) no-repeat;
      background-position: center;
      background-size: .19rem .19rem;
    }
    img {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 1.3rem;
    }
    form {
      display: none !important;
    }
    .form-question-title textarea {
      // width: 4.78rem;
      height: 1.75rem;
    }
    .form-board textarea {
      width: 6.4rem;
      padding:.3rem .25rem 0;
      height: 1.1rem;
    }
  }
</style>