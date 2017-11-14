// import Vue from 'vue'
import * as types from '../mutation-types'
let CameraApi = require('../../api/cameras')

// initial state
const state = {
  camera: {},
  chartData: [],
  error: false,
  loading: false
}

// getters
const getters = {
  camera: state => state.camera,
  cameraLoading: state => state.loading,
  cameraError: state => state.error,
  cameraChartData: state => state.chartData
}

// actions
const actions = {
  getCamera ({ commit }, cameraId) {
    commit(types.LOADING, true)
    commit(types.ERROR, false)
    // Vue.http.get('/cameras', {timeout: 5000})
    CameraApi.default.getCamera(cameraId).then(camera => {
      let cameraData = camera.body
      commit(types.RECEIVE_CAMERA, { cameraData })
      let chartData = {
        datasets: [{
          label: 'File Size (kb)',
          // backgroundColor: 'green',
          data: cameraData.images.map(a => a.filesize)
        }]
      }
      commit(types.RECEIVE_CAMERA_CHARTS, {chartData})
      commit(types.LOADING, false)
    }, error => {
      commit(types.ERROR, error.body.statusText)
      commit(types.LOADING, false)
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_CAMERA] (state, { cameraData }) {
    state.camera[cameraData.id] = cameraData
  },
  [types.RECEIVE_CAMERA_CHARTS] (state, { chartData }) {
    state.chartData = chartData
  },
  [types.LOADING] (state, isLoading) {
    state.loading = isLoading
  },
  [types.ERROR] (state, error) {
    state.error = error
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
