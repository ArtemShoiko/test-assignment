import faker from 'faker'

const getRandomPhone = () => {
  return `+38097${faker.random.number(1000000, 9999999)}`  // faker generates random number in a given range
}

export default getRandomPhone