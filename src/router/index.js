import Vue from 'vue'
import Router from 'vue-router'
import Camera from '@/components/Camera'
import CameraList from '@/components/CameraList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: CameraList
    },
    {
      path: '/camera/:cameraId',
      name: 'camera',
      component: Camera
    }
  ]
})
