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
  var product_id = request.query.product_id
  if(!product_id) {
    response.status(400).send('No Product ID specified')
  } else {

    var params = request.query
    console.log(params)

    var sortObj = {
      "newest":"date DESC ",
      "helpful":"helpfulness DESC ",
      "relevant": "helpfulness DESC, recommend DESC "

    }
    var page = request.query.page || 1;
    var count = request.query.count || 5
    var sort = sortObj[request.query.sort] || 'date DESC '

    const query =  `SELECT ARRAY( SELECT json_build_object (
      'review_id', reviews.id,
      'rating', reviews.rating,
      'summary', reviews.summary,
      'recommend', reviews.recommend,
      'response', reviews.response,
      'body', reviews.body,
      'date', to_timestamp(reviews.date/1000),
      'reviewer_name', reviews.reviewer_name,
      'helpfulness', reviews.helpfulness,
      'photos', ARRAY ( SELECT json_build_object (
        'url', reviews_photos.url
      ) FROM reviews_photos WHERE reviews_photos.review_id = reviews.id
    )) FROM reviews Where reviews.product_id=${product_id}  ORDER BY reviews.${sort} Limit ${count}) AS results ;`
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows[0])
      var obj = {
          "product": product_id,
          "page": page,
          "count": count,
          "results": results.rows[0].results
      }
      results.rows[0].product=15
      response.status(200).json(obj)
    })
}
}


const getCharacteristics = (request, response) => {

  params = request.query
  console.log(params)
  product_id = request.query.product_id

var ratingQuery = `SELECT rating, json_build_object (
  reviews.rating, CAST(COUNT (reviews.rating) AS text)
 ) AS ratings FROM reviews WHERE product_id=${product_id}  GROUP BY product_id,rating ;`

 var convertRatings = (input) => {
  var ratings = {}

    for(var obj of input) {
      ratings[obj.rating] = obj.ratings[obj.rating]
    }

    return ratings
}

 var recommendQuery = `SELECT json_build_object (
  'false', CAST((SELECT COUNT(recommend) FROM reviews WHERE product_id=${product_id} AND recommend=false) AS text),
  'true', CAST((SELECT COUNT(recommend) FROM reviews WHERE product_id=1${product_id} AND recommend=true) AS text)
  )  AS recommended FROM reviews WHERE product_id=${product_id} LIMIT 1;`


  var charQuery = `SELECT characteristics.id, characteristics.name, AVG(characteristic_reviews.value) FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id=characteristic_reviews.characteristic_id WHERE characteristics.product_id=${product_id} GROUP BY characteristics.id;`




  var convertChar = (results) => {
    var chars = {}

    for(var obj of results) {
      chars[obj.name] = {
      'id': obj.id,
      'value': obj.avg
      }
    }

    return chars
  }

  var characteristicsObj = {
    'product_id': product_id
  }


  pool.query(ratingQuery)
  .then(results =>  characteristicsObj.ratings = convertRatings(results.rows))
  .then(()=> pool.query(recommendQuery))
  .then(results => characteristicsObj.recommended = results.rows[0].recommended)
  .then(()=> pool.query(charQuery))
  .then(results => characteristicsObj.characteristics = convertChar(results.rows))
  .then(()=> response.status(200).json(characteristicsObj))

}

const getCharacteristicsReviews = (request, response) => {
  var charQuery = `SELECT characteristics.id, characteristics.name, AVG(characteristic_reviews.value) FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id=characteristic_reviews.characteristic_id WHERE characteristics.product_id=15 GROUP BY characteristics.id;`

  var output = {}
  var convertChar = (results) => {
    var chars = {}

    for(var obj of results) {
      chars[obj.name] = {
      'id': obj.id,
      'value': obj.avg
      }
    }

    return chars
  }

  pool.query(query)
  .then(results => response.status(200).json(convertChar(results.rows)))
  .catch(error => console.log(error));
}

const getReviewsPhotos = (request, response) => {
  pool.query('SELECT * FROM reviews_photos WHERE review_id=5;', (error, results) => {
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
  getCharacteristicsReviews,
  getReviewsPhotos
}

/*


ALTER







%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
ratings
product_id

SELECT json_build_object (
   reviews.rating, COUNT (reviews.rating)
  ) AS ratings FROM reviews WHERE product_id=15 GROUP BY product_id,rating ;


recommend
  SELECT json_build_object (
    'false', CAST((SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND recommend=false) AS text),
    'true', CAST((SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND recommend=true) AS text)
    )  AS recommended FROM reviews WHERE product_id=15 LIMIT 1;

    SELECT




%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SELECT json_build_object (
  'product_id', reviews.product_id,
  'ratings', (json_object_agg(json_build_object (
   reviews.rating, COUNT (reviews.rating)
  ) FROM reviews WHERE product_id=15 GROUP BY product_id,rating)),

  'recommended', json_build_object (
    'false', (SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND      recommend=false),
    'true', (SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND recommend=true)
    )) FROM reviews WHERE product_id=15 LIMIT 1;






SELECT json_object_agg (json_build_object (
   reviews.rating, COUNT (reviews.rating)
  ) FROM reviews WHERE product_id=15 GROUP BY product_id,rating)




SELECT json_build_object (

  'product_id', reviews.product_id,

  'ratings', json_build_object (
    '1',  (SELECT COUNT(rating) FROM reviews WHERE product_id=15 AND rating=1),
    '2', (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=2),
    '3',  (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=3),
    '4',  (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=4),
    '5',  (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=5)
    ),

  'recommended', json_build_object (
    'false', (SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND      recommend=false),
    'true', (SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND recommend=true)
    ),

    'characteristics', (ARRAY (
      SELECT json_build_object (
      'id', characteristics.id,
      'value', characteristics.value
      ) AS reee FROM characteristics WHERE characteristics.product_id=15
    )
  )
) FROM reviews WHERE product_id=15 LIMIT 1;



SELECT characteristics.id, characteristics.name, AVG(characteristic_reviews.value) FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id=characteristic_reviews.characteristic_id WHERE characteristics.product_id=15 GROUP BY characteristics.id;


SELECT DISTINCT characteristics.name json_object_agg(
  characteristics.name, json_build_object (
      'id', characteristics.id,
      'value', characteristic_reviews.value
  )
 )FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id=characteristic_reviews.characteristic_id WHERE characteristics.product_id=15 GROUP BY characteristics.name ;







SELECT Array ( characteristics.name,json_build_object (

'id',characteristics.id,
'value', AVG(characteristic_reviews.value) ))

FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id=characteristic_reviews.characteristic_id WHERE characteristics.product_id=15 GROUP BY characteristics.id;






json_object_agg

json_object_agg

WITH tmp AS (
    SELECT
        name,
        json_agg(sto.name) as training_options
    FROM
        safety_training_options as sto
    GROUP BY
        sto.option_type
)
SELECT json_object_agg(option_type, training_options) FROM tmp


SELECT json_build_object (
    characteristics.name, json_build_object (
      'id', characteristics.id,
      'value', characteristic_reviews.value)
  ) FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id=characteristic_reviews.characteristic_id WHERE characteristics.product_id=15; GROUP BY characteristics.id;

---------------------------------------------------------------------
WORKING
SELECT json_build_object (
  'product_id', reviews.product_id,
  'ratings', json_build_object (
    '1',  (SELECT COUNT(rating) FROM reviews WHERE product_id=15 AND rating=1),
    '2', (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=2),
    '3',  (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=3),
    '4',  (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=4),
    '5',  (SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=5)
    ),

  'recommended', json_build_object (
    'false', (SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND      recommend=false),
    'true', (SELECT COUNT(recommend) FROM reviews WHERE product_id=15 AND recommend=true)
    )) FROM reviews WHERE product_id=15 LIMIT 1;

-----------------------------------------------------------
SELECT json_build_object (

   reviews.rating, COUNT (reviews.rating)
  ) FROM reviews WHERE product_id=15 GROUP BY product_id,rating;


SELECT jsonb_object_agg (
  'product_id', reviews.product_id,
   'rating', COUNT (reviews.rating)
  ) AS ree FROM reviews WHERE product_id=15 GROUP BY product_id,rating;




CREATE INDEX review_id_index ON reviews_photos (review_id);



json_build_object (
  'product_id', SELECT COUNT( rating) FROM reviews WHERE product_id=15 AND rating=1

  ) AS ree;

SELECT COUNT(DISTINCT rating) FROM reviews WHERE rating=0;



SELECT * FROM reviews INNER JOIN characteristics ON reviews.product_id=characteristics.product_id WHERE reviews.product_id=15 GROUP BY reviews.id;

    */