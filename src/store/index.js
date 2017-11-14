import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cameras from './modules/cameras'
import camera from './modules/camera'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    camera,
    cameras
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
