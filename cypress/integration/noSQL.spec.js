describe('DB data test', () => {
    let date50YearsAgo = new Date();
    date50YearsAgo.setFullYear( date50YearsAgo.getFullYear() - 50 ); // create date needed for search

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
      cy.task('getPatients').then((result) => {   
        let users = []
        result.forEach(patient => {
          if (new Date(patient.birthdate) < date50YearsAgo) { // find users older then 50 years
            users.push(patient)
          }
        })
        users.forEach(user => {
          console.log(user) // show users older then 50 years in the browser console
        })
      })
    })
    // it('should get all patients, that have “updated_date” of primary phone number > 1 year', function () {
    // })
})
