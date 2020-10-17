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
    getPatients()  {
      return new Promise((resolve) => {
          MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) {
              console.log(`MONGO CONNECTION ERROR: ${err}`)  
              throw err
            } else {
              const db = client.db(dbName);
              const collection = db.collection(dbCollection)
              const patients = collection
                .find({ birthdate: { $exists: true } })
                // .find({ birthdate: '2020-05-31' })  //  
                .toArray()
              resolve(patients)
              client.close()
            }
          });
        }) // end of return Promise
      }
  })  // end of task

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
}
