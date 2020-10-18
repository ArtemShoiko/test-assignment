import getDateYearsAgo from '../utils/getDateYearsAgo'

describe('DB data test', () => {

    before(() => {
      for (let i = 0; i < 10; i++) {
        cy.addRandomData()  // create 10 patients with the same structure. But with random data
      }
    })
    it('should get primary phone numbers of all patients (only phones)', () => {
      cy.task('getPrimaryPhones').then((result) => {   
        result.forEach(phone => {
          console.log(phone.phone_numbers[0].value) // show phone numbers in the browser console
        })
      })
    })
    it('should get all patients with age >= 50 years (form today)', () => {
      cy.task('getPatientsAboveAge', 50).then((result) => {   
        console.log(result) // show users older then 50 years in the browser console
      })
    })
    it('should get all patients, that have “updated_date” of primary phone number > 1 year', function () {
      cy.task('getPatientsWithUpdatedDateAbove', getDateYearsAgo(1)).then((result) => {   
        console.log(result) // show users with updated date > 1 years ago as array in the browser console
      })
    })
})
