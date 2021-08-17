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
  response VARCHAR (1000),
  helpfulness INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE test2 (
  id INT NOT NULL
)



INSERT INTO reviews (product_id,rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
VALUES (1,4,)


INSERT INTO test (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
  VALUES (15, 5, 1629156753091, "reeeeeee", "eeeeeeeeeeee", true , false, "babyfartmcgeezax", "ree@ree.com", 0);