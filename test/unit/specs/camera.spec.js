import Vue from 'vue'
import Camera from '@/components/Camera.vue'

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData: propsData }).$mount()
  vm.loadingTries = 8
  // vm.reload()
  return vm.$el
}

describe('Camera.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Camera)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.contain('     Total Data: 0kb | Total Images: 0 | Largest Image: 0kb') // querySelector('.camera-component').
  })
  it('sets the correct default data', () => {
    const defaultData = Camera.data()
    // expect(defaultData.cameraData).to.be.an('array').that.is.empty
    expect(defaultData.chartData).to.be.equal(null)
    expect(defaultData.loading).to.be.equal(false)
    expect(defaultData.error).to.be.equal(false)
    expect(defaultData.loadingTries).to.be.equal(0)
    expect(defaultData.totalData).to.be.equal(0)
    expect(defaultData.totalImages).to.be.equal(0)
    expect(defaultData.largestImage).to.be.equal(0)
  })
  it('properly parses the camera data', (done) => {
    let element = getRenderedText(Camera, {
      cameraId: 'test-data-good'
    })

    setTimeout(function () {
      expect(element.textContent)
      .to.contain('Total Data: 100kb | Total Images: 4 | Largest Image: 40kb')
      done()
    }, 5000)
  }).timeout(10000)
  it('properly parses the failed camera data', (done) => {
    let element = getRenderedText(Camera, {
      cameraId: 'test-data-bad'
    })
    setTimeout(function () {
      expect(element.querySelector('.error-area').textContent)
      .to.contain('Error loading camera : Oh no! Internal Server Error!')
      done()
    }, 5000)
  }).timeout(10000)
})
