import faker from 'faker'

const getRandomDate = () => {
  return Cypress.moment(faker.date.past()).format() // faker generates past date and Cypress.moment() formats it in the needed way
}

export default getRandomDate