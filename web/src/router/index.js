import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import adminRouter from './admin'

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes:[movieRouter,cinemaRouter,adminRouter,
    {
      path : '/*',
      redirect : '/movie'
    }]
})


