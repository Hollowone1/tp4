CREATE TABLE favorite_beers (
  beer_id INT NOT NULL,
  favorite_date DATE NOT NULL,
  PRIMARY KEY (beer_id),
  FOREIGN KEY (beer_id) REFERENCES beers(id)
);