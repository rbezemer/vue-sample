/**
 * Interface to get Server Side data
 **/
import Vue from 'vue'

const TIMEOUT = 5000

export default {
  /**
   * Gets a list of all cameras available
   * timeout - the number of ms untill the web request timeouts
   **/
  getAllCameras (timeout) {
    if (!timeout) {
      timeout = TIMEOUT
    }
    return new Promise((resolve, reject) => {
      Vue.http.get('/cameras', {'timeout': timeout}).then((response) => {
        let body = response.body
        resolve(body)
      }, error => {
        reject(error)
      })
    })
  },
  /**
   * Gets the camera details for a specific camera
   * id - the id of the camera requested
   * timeout - the number of ms untill the web request timeouts
   **/
  getCamera (id, timeout) {
    if (!timeout) {
      timeout = TIMEOUT
    }
    return Vue.http.get('/camera/' + id, {timeout: timeout})
  }
}
