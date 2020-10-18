import faker from 'faker'

const getRandomDate = () => {
  return Cypress.moment(faker.date.past(5)).format() // faker generates past date and Cypress.moment() formats it in the needed way
}

export default getRandomDate