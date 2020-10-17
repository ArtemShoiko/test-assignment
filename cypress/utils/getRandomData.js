import faker from 'faker'
import getRandomPhone from './getRandomPhone'
import getRandomDate from './getRandomDate'

const getRandomData = () => {
  return {
    system_status: "id.system_status.active",
    name: {
       given: faker.name.firstName(),
       family: faker.name.lastName()
    },
    birthdate: Cypress
      .moment(
        faker.date.past()
      )
      .format('YYYY-MM-DD'), // faker generates past date and Cypress.moment() formats it in the needed way
    phone_numbers: [
       {
          system_status: "id.system_status.active",
          use: "mobile",
          is_primary: true,
          value: getRandomPhone(),
          record_change_details: {
             created_date: getRandomDate(),
             updated_date: getRandomDate()
          }
       },
       {
          system_status: "id.system_status.active",
          use: "work",
          is_primary: false,
          value: getRandomPhone(),
          record_change_details: {
             created_date: getRandomDate(),
             updated_date: getRandomDate()
          }
       }
    ]
  }  
}

export default getRandomData
