/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const MongoClient = require('mongodb').MongoClient;

let dbName = 'cinema'
let dbCollection = 'movies'
const getDateYearsAgo = (years) => {
  let dateYearsAgo = new Date()
  dateYearsAgo.setFullYear( dateYearsAgo.getFullYear() - years )
  return dateYearsAgo
}

module.exports = (on, config) => {
  on('task', {
    insertData (data) {
      return new Promise((resolve) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`)  
            throw err
          } else {
            const db = client.db(dbName);
            const result = db.collection(dbCollection).insertOne(data)   
            resolve(result)
            client.close()
          }
        });
      }); // end of return Promise
    }
  }), // end of task

  on('task', {
    getPrimaryPhones()  {
      return new Promise((resolve) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`)  
            throw err
          } else {
            const db = client.db(dbName);
            const collection = db.collection(dbCollection)
            const items = collection
              .find({ 
                'phone_numbers.is_primary': true
              })
              .project({ phone_numbers: { $elemMatch: { is_primary: true} }, _id: 0 })
              .toArray()
            resolve(items)
            client.close()
          }
        });
      }) // end of return Promise
    }
  })  // end of task

  on('task', {
    getPatientsAboveAge(age)  {
      let patientBirthdate = getDateYearsAgo(age)

      return new Promise((resolve) => {
          MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) {
              console.log(`MONGO CONNECTION ERROR: ${err}`)  
              throw err
            } else {
              const db = client.db(dbName);
              const collection = db.collection(dbCollection)
              const patients = collection
                .aggregate(
                  [
                      {
                          $addFields: {
                              formattedDate: { // An extra field "formattedDate" is added in each document which can be compared later through pipeline using $match
                                  $dateFromString: {
                                      dateString: "$birthdate"
                                  }
                              }
                          }
                      },
                      {
                          $match: {
                              formattedDate: {
                                  $lte: patientBirthdate 
                              }
                          }
                      }
                  ]
                )
                .project({ formattedDate: 0 })
                .toArray()
              resolve(patients)
              client.close()
            }
          });
        }) // end of return Promise
      }
  })  // end of task

  on('task', {
    getPatientsWithUpdatedDateAbove (date) {
      return new Promise((resolve) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`)  
            throw err
          } else {
            const db = client.db(dbName);
            const collection = db.collection(dbCollection)
            const items = collection
              .aggregate(
                [
                    {
                        $project: {
                          phone_numbers: {
                                $filter: {
                                    input: "$phone_numbers",
                                    as: "phone",
                                    cond: { $eq : ["$$phone.is_primary", true] }
                                }
                            },
                          system_status: 1,
                          name: 1,
                          birthdate: 1
                        }
                    },
                    {
                      $match: {
                          "phone_numbers.record_change_details.updated_date": {
                              $lt: date
                          }
                      }
                    }
                ]
              )           
              .toArray()
            resolve(items)
            client.close()
          }
        });
      }); // end of return Promise
    }
  }) // end of task
}
