import AppHelpers from '../../../src/utils/app-helpers'

describe('AppHelpers Utils', () => {
  it('should create a guid', () => {
    expect(AppHelpers.createGuid().length).toBe(16)
  })
  it('should get a random int', () => {
    let int1 = AppHelpers.getRandomInt(5, 10)
    expect(int1).toBeLessThan(10)
    expect(int1).toBeGreaterThan(5)
  })
  it('should create some fake image data', (done) => {
    AppHelpers.populateImageData().then(imageData => {
      expect(imageData).not.toBeEmpty()
      done()
    })
  })
})
