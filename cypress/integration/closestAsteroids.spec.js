const KEY = Cypress.env('RAPID_API_KEY')
const getClosestAsteroids = Cypress.env('GET_CLOSEST_ASTEROIDS_API')
const elementCount = 10  // placeholder for the server response ("element_count")

describe('Request the list of closest asteroids', () => {
  before(() => {
    cy.request({
      method: 'GET', 
      url: getClosestAsteroids,
      headers: {
        "X-RapidAPI-Key": KEY 
      },
      failOnStatusCode: false
    }).then(resp => {
      console.log(resp)
      cy.wrap(resp).as('a') 
    })
  })
  context('separate checks for the responce', () => {
    it('should get the list of all asteroids', function () {
      expect(this.a).not.null 
      expect(this.a.status).to.eq(200)
    })
    it('should equal to the element count', function () {
      expect(this.a.status).to.eq(elementCount)
    })
    it('should do not have hazardous asteroid', function () {
      expect(this.a.is_potentially_hazardous_asteroid).to.eq(false)
    })
    it('should do not have extra dangerous asteroid', function () {
      expect(this.a.estimated_diameter_max).to.be.lessThan(1)
    })
  })
})
