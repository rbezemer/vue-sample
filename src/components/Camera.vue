
<template>
  <div class="camera-component">
    <i v-if="loading" class="fa fa-cog fa-spin fa-3x fa-fw" aria-hidden="true"></i>
    <div class="error-area" v-if="error">
      <i class="fa fa-bug fa-3x error" aria-hidden="true"></i>
      <div>Error loading camera : {{error}}</div>
      <button v-on:click="reload">Retry</button>
    </div>
    <h4><router-link :to="{ name: 'camera', params: { cameraId: cameraData.id }}" >Camera: {{cameraData.id}}</router-link></h4>
    <camera-chart v-if="!error || !loading" :chart-data="chartData"></camera-chart>
    <div class="image-stats"> Total Data: {{totalData}}kb | Total Images: {{totalImages}} | Largest Image: {{largestImage}}kb</div>
  </div>
</template>
<script>
import CameraChart from './CameraChart'
let CameraApi = require('../api/cameras')

export default {
  components: {
    CameraChart
  },
  data () {
    return {
      cameraData: {},
      chartData: null,
      loading: false,
      error: false,
      loadingTries: 0,
      totalData: 0,
      totalImages: 0,
      largestImage: 0
    }
  },
  props: ['cameraId'],
  created () {
    this.reload()
  },
  methods: {
    /**
     * This will repopulate the camera data from the server
     **/
    reload () {
      this.loading = true
      this.error = false
      let cameraId = this.cameraId
      if (this.$route && this.$route.params.cameraId) {
        cameraId = this.$route.params.cameraId
      }
      CameraApi.default.getCamera(cameraId).then(camera => {
        this.cameraData = camera.body
        this.chartData = {
          labels: camera.body.images.map(a => ''),
          datasets: [{
            label: 'File Size (kb)',
            backgroundColor: 'rgba(0, 0, 1, 0.5)',
            borderColor: 'rgba(0, 0, 1, 1)',
            yAxisId: 'Size(kb)',
            xAxisId: 'Camera',
            data: camera.body.images.map(a => a.filesize)
          }]
        }

        this.cameraData.images.forEach(image => {
          this.totalData = this.totalData + image.filesize
          this.totalImages = this.totalImages + 1
          this.largestImage = (this.largestImage < image.filesize) ? image.filesize : this.largestImage
        })

        this.$emit('camera-loaded', this.cameraData)
        this.loading = false
      }, error => {
        this.loadingTries = this.loadingTries + 1
        if (this.loadingTries > 5) {
          this.loading = false
          this.error = error.body.statusText
        } else {
          setTimeout(this.reload.bind(this), 1000)
        }
      })
    }
  }
}
</script>
<style>
  .error{
    color:red
  }
  camera-chart{
    text-align: center;

  }
  .image-stats{
    font-size: 0.7rem;
  }

</style>
