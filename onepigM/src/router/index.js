import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import indexM from '@/components/indexM'
import axios from 'axios'

Vue.use(Router)
Vue.prototype.$http = axios

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexM',
      component: indexM
    }
  ]
})
