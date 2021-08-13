const dbConfig = require('../config/config.js');

console.log(dbConfig)

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: dbConfig.password,
  port: 5432,
})

const getReviews = (request, response) => {
  pool.query('SELECT * FROM reviews WHERE product_id=1;', (error, results) => {
    if (error) {
      throw error
    }
    console.log(request.data)
    response.status(200).json(results.rows)
  })
}

const getCharacteristics = (request, response) => {
  pool.query('SELECT * FROM characteristics WHERE product_id=1;', (error, results) => {
    if (error) {
      throw error
    }
    console.log(request.data)
    response.status(200).json(results.rows)
  })
}

const getCharacteristicsReviews = (request, response) => {
  pool.query('SELECT * FROM characteristic_reviews WHERE review_id=1;', (error, results) => {
    if (error) {
      throw error
    }
    console.log(request.data)
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getReviews,
  getCharacteristics,
  getCharacteristicsReviews
}