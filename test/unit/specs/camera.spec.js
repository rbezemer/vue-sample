import Vue from 'vue'
import Camera from '@/components/Camera.vue'

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData: propsData }).$mount()
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
    expect(defaultData.cameraData).toBeEmpty()
    expect(defaultData.chartData).toBeNull()
    expect(defaultData.loading).toBeFalse()
    expect(defaultData.error).toBeFalse()
    expect(defaultData.loadingTries).toBe(0)
    expect(defaultData.totalData).toBe(0)
    expect(defaultData.totalImages).toBe(0)
    expect(defaultData.largestImage).toBe(0)
  })
  it('properly parses the camera data', () => {
    expect(getRenderedText(Camera, {
      cameraId: 'test-data-good'
    }).querySelector('.error-area').textContent)
    .to.contain('     Total Data: 100kb | Total Images: 4 | Largest Image: 40kb')
  })
  it('properly parses the failed camera data', () => {
    expect(getRenderedText(Camera, {
      cameraId: 'test-data-bad'
    }).querySelector('.error-area').textContent)
    .toBe('Error loading camera : Oh no! Internal Server Error!')
  })
})
