const getDateYearsAgo = (years) => {
  // let dateYearsAgo = new Date()
  // dateYearsAgo.setFullYear( dateYearsAgo.getFullYear() - years )
  // return Cypress.moment(dateYearsAgo).format()
  let dateYearsAgo = new Date()
  dateYearsAgo.setFullYear( dateYearsAgo.getFullYear() - years )
  return dateYearsAgo
}

export default getDateYearsAgo
