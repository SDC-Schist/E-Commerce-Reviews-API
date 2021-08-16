id	product_id	rating	date	summary	body	recommend	reported	reviewer_name	reviewer_email	response	helpfulness



\COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/mnt/d/reviews.csv' DELIMITER ',' CSV HEADER;


CREATE TABLE reviews (
  id SERIAL,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR (200) NOT NULL,
  body VARCHAR (1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR (50) NOT NULL,
  reviewer_email VARCHAR (50) NOT NULL,
  response VARCHAR (1000),
  helpfulness INT NOT NULL,
  PRIMARY KEY (id)
);

SELECT last_value
FROM reviews_id_seq
ORDER BY last_value DESC
LIMIT 1
5774952
SELECT setval('reviews_id_seq', 5774952, true);




\COPY characteristics(id, product_id, name) FROM '/mnt/d/characteristics.csv'
DELIMITER ',' CSV HEADER;

SELECT last_value
FROM characteristics_id_seq
ORDER BY last_value DESC
LIMIT 1;

SELECT id
FROM characteristics
ORDER BY id DESC
LIMIT 1;

SELECT setval('characteristics_id_seq', 3347679, true);

CREATE TABLE characteristics (
  id SERIAL,
  product_id INT NOT NULL,
  name VARCHAR (15) NOT NULL,
  PRIMARY KEY (id)
);


================================================================================

\COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/mnt/d/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

SELECT last_value
FROM characteristics_reviews_id_seq
ORDER BY last_value DESC
LIMIT 1;

SELECT id
FROM characteristics_reviews
ORDER BY id DESC
LIMIT 1;
19327575

SELECT setval('characteristic_reviews_id_seq', 19327575, true);

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (characteristic_id)
   REFERENCES characteristics (id),
  FOREIGN KEY (review_id)
    REFERENCES reviews (id)
);

==================================================================================
\COPY reviews_photos(id, review_id, url) FROM '/mnt/d/reviews_photos.csv' DELIMITER ',' CSV HEADER;

SELECT last_value
FROM characteristics_reviews_id_seq
ORDER BY last_value DESC
LIMIT 1;

SELECT id
FROM reviews_photos
ORDER BY id DESC
LIMIT 1;

SELECT setval('reviews_photos_id_seq', 2742540, true);








CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR (1000) NOT NULL,
  FOREIGN KEY (review_id)
    REFERENCES reviews (id)
);



let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  url: String,//{type: String, unique: true}
  forks: Number,
  ownerurl: String

});
