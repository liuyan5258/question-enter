import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource' 
import Home from './components/home.vue'
import Success from './components/success.vue'
import Fail from './components/fail.vue'

//注册插件 
Vue.use(VueResource) 
Vue.use(VueRouter) 

Vue.http.options.emulateJSON = true
Vue.http.headers.Origin = 'http://www.163.com'

const router = new VueRouter() 
// 路由map 
router.map({ 
  '/home': { 
    component: Home
  },
  '/success': {
  	component: Success
  },
  '/fail': {
  	component: Fail
  }
}) 
router.redirect({ 
  '*': '/home' 
}) 
router.start(App, '#app')
