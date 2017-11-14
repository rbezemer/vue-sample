// import Vue from 'vue'
import * as types from '../mutation-types'
let CameraApi = require('../../api/cameras')

// initial state
const state = {
  all: [],
  error: false,
  loading: false
}

// getters
const getters = {
  allCameras: state => state.all,
  allCamerasLoading: state => state.loading,
  allCamerasError: state => state.error
}

// actions
const actions = {

  getAllCameras ({ commit }) {
    commit(types.LOADING, true)
    // Vue.http.get('/cameras', {timeout: 5000})
    CameraApi.default.getAllCameras().then(cameras => {
      commit(types.RECEIVE_CAMERAS, { cameras })
      commit(types.LOADING, false)
      commit(types.ERROR, false)
    }, error => {
      commit(types.ERROR, error.body.statusText)
      commit(types.LOADING, false)
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_CAMERAS] (state, { cameras }) {
    state.all = cameras
  },
  [types.LOADING] (state, { isLoading }) {
    state.loading = isLoading
  },
  [types.ERROR] (state, { error }) {
    state.error = error
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
