import AppHelpers from '../../../src/utils/app-helpers'

describe('AppHelpers Utils', () => {
  it('should create a guid', () => {
    expect(AppHelpers.createGuid().length).to.be.equal(36)
  })
  it('should get a random int', () => {
    let int1 = AppHelpers.getRandomInt(5, 10)
    expect(int1).to.be.lessThan(11)
    expect(int1).to.be.greaterThan(4)
  })
  it('should create some fake image data', (done) => {
    AppHelpers.populateImageData().then(imageData => {
      expect(imageData.length).to.be.greaterThan(0)
      done()
    })
  })
})
