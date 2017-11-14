export default {
  createGuid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4()
  },
  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  populateImageData () {
    return new Promise((resolve, reject) => {
      let imageData = []
      let numImages = this.getRandomInt(1, 100)
      for (var i = 0; i < numImages; i++) {
        imageData.push({
          id: this.createGuid(),
          filesize: this.getRandomInt(1000, 100000),
          src: 'https://loremflickr.com/320/240'})
      }
      resolve(imageData)
    })
  }
}
