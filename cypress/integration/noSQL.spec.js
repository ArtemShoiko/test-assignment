describe('DB data test', () => {

    before(() => {
      for (let i = 0; i < 10; i++) {
        cy.addRandomData()
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
      cy.task('getPatientsAbove', 50).then((result) => {   
        console.log(result) // show users older then 50 years in the browser console
      })
    })
    it('should get all patients, that have “updated_date” of primary phone number > 1 year', function () {
      
    })
})
