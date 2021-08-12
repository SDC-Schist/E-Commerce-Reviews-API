var pgp = require('pg-promise')()
var db = pgp('postgres://denofhay:password@localhost:5432/sdc')

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })





// import { Sequelize, Model, DataTypes } from 'sequelize'

// const user = "postgres"
// const host = 'localhost'
// const database = 'sdc'
// const password = 'password'
// const port = '5432

// const sequelize = new Sequelize(database, user, password, {
//   host,
//   port,
//   dialect: 'postgres',
//   logging: false
// })

// // const credentials = {
// //   user: "postgres",
// //   host: "localhost",
// //   database: "sdc",
// //   password: "password",
// //   port: 5432,
// // };

// export default sq