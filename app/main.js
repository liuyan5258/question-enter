import Vue from 'vue'
// window.Vue = Vue
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource' 
import AjaxFormComponent from './assets/js/validator.js'
import Home from './components/home.vue'

//注册插件 
Vue.use(VueResource) 
Vue.use(VueRouter) 
Vue.use(AjaxFormComponent)

Vue.http.options.emulateJSON = true
Vue.http.headers.Origin = 'http://www.163.com'

const router = new VueRouter() 
// 路由map 
router.map({ 
  '/Home': { 
    component: Home
  } 
}) 
router.redirect({ 
  '*': '/Home' 
}) 
router.start(App, '#app')
