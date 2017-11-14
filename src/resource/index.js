import Vue from 'vue'
import VueResource from 'vue-resource'
import AppHelpers from '../utils/app-helpers'

Vue.use(VueResource)

Vue.http.interceptors.unshift((request, next) => {
  /* let route = routes.find((item) => {
    return (request.method === item.method && request.url === item.url)
  }) */

  if (request.method === 'GET') {
    let fragments = request.url.split('/')
    if (fragments[1] === 'camera') {
      // simulate random failure
      if ((Math.random() > 0.5)) {
        next(request.respondWith({status: 500, statusText: 'Oh no! Internal Server Error!'}))
      }
      if (fragments[2] === 'test-data-good') {
        next(
          request.respondWith(
            {id: 1,
              images: [
                {id: 1, filesize: 10},
                {id: 2, filesize: 20},
                {id: 3, filesize: 30},
                {id: 4, filesize: 40}
              ]},
            {status: 200}
          )
        )
        return
      } else if (fragments[2] === 'test-data-bad') {
        next(request.respondWith({status: 500, statusText: 'Oh no! Internal Server Error!'}))
        return
      }
      AppHelpers.populateImageData().then((images) => {
        let cameraData = {
          id: fragments[2],
          images: images
        }
        next(
          request.respondWith(
            cameraData,
            {status: 200}
          )
        )
      })
    } else if (fragments[1] === 'cameras') {
      let numCameras = AppHelpers.getRandomInt(3, 20)
      let cameras = []
      for (var i = 0; i < numCameras; i++) {
        cameras.push({ 'id': AppHelpers.createGuid() })
      }
      next(
        request.respondWith(
          cameras,
          {status: 200}
        )
      )
    } else {
      next(request.respondWith({status: 404, statusText: 'Oh no! Not found!'}))
    }
  } else {
    next(request.respondWith({status: 404, statusText: 'Oh no! Not found!'}))
  }
})
