const KEY = Cypress.env('RAPID_API_KEY')  // FIXME: key should not be stored in the repository
const getClosestAsteroids = Cypress.env('GET_CLOSEST_ASTEROIDS_API')

describe('Request the list of closest asteroids', () => {
  before(() => {
    cy.request({
      method: 'GET', 
      url: `${getClosestAsteroids}?api_key=${KEY}`,
      failOnStatusCode: false
    }).then(resp => {
      cy.wrap(resp).as('a') 
    })
  })
  context('separate checks for the responce', () => {
    it('should get the list of all asteroids', function () {
      expect(this.a.status).to.eq(200)
      expect(this.a.body.near_earth_objects).not.null
      console.log(
        this.a.body.near_earth_objects[
          Object.keys(this.a.body.near_earth_objects)[0]
        ]
      ) // show the list of asteroids in the browser console
    })
    it('asteroids amount should be equal to the element count', function () {
      expect(
        this.a.body.near_earth_objects[
          Object.keys(this.a.body.near_earth_objects)[0]
        ].length
      ).to.eq(this.a.body.element_count)
    })
    it('should do not have hazardous asteroid', function () {
      this.a.body.near_earth_objects[
        Object.keys(this.a.body.near_earth_objects)[0]
      ].forEach(asteroid => {
        expect(asteroid.is_potentially_hazardous_asteroid).to.eq(false)
      })
    })
    it('should do not have extra dangerous asteroid', function () {
      this.a.body.near_earth_objects[
        Object.keys(this.a.body.near_earth_objects)[0]
      ].forEach(asteroid => {
        expect(asteroid.estimated_diameter.kilometers.estimated_diameter_max).to.be.lessThan(1)
      })
    })
  })
})
