<template>
<div>
  <i v-if="loadingError" class="fa fa-cog fa-spin fa-3x fa-fw" aria-hidden="true"></i>
  <div class="camera-list">
    <div class="camera-item" v-for="c in cameras">
      <camera :camera-id="c.id" @camera-loaded="cameraLoaded"></camera>
    </div>
  </div>
 </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Camera from './Camera'
export default{
  components: {
    Camera
  },
  computed: mapGetters({
    cameras: 'allCameras',
    loadingError: 'allCamerasError',
    loadingProgress: 'allCamerasLoading'
  }),

  created () {
    this.$store.dispatch('getAllCameras')
  },
  methods: {
    cameraLoaded (cameraData) {
      console.log('camera loaded')
    }
  }
}
</script>
<style scoped>
.camera-list{
  padding: 0;
  margin: 0;
  list-style: none;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  justify-content: space-around;
  width:100%;
}
.camera-item{
  padding: 5px;
  width: 400px;
  height: 450px;
  margin-top: 10px;
}
</style>
