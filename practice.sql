CREATE TABLE test (
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
  response VARCHAR (1000) DEFAULT NULL,
  helpfulness INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO test (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)

  VALUES (15, 5, 1629156753091, 'reeeeeeeee', 'eeeeeeeee', true , false, 'babyfartmcgeezax', 'ree@ree.com', 0);



CREATE TABLE test2 (
  id INT NOT NULL
)



INSERT INTO reviews (product_id,rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
VALUES (1,4,)


INSERT INTO testchar (characteristic_id, review_id, value) VALUES (27, 'reee.com') RETURNING review_id;

UPDATE test set helpfulness = helpfulness + 1 WHERE id = 1;




SELECT json_build_object (
  'false', CAST((SELECT COUNT(recommend) FROM reviews WHERE product_id=1 AND recommend=false) AS text),
  'true', CAST((SELECT COUNT(recommend) FROM reviews WHERE product_id=1 AND recommend=true) AS text)
  )  AS recommended FROM reviews WHERE product_id=1 LIMIT 1;