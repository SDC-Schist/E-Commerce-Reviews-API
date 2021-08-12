var express = require('express');
const db = require('../db/queries')



var app = express();
const port = 3000


app.use(express.json());
app.get('/reviews', db.getReviews)

app.get('/characteristics', db.getCharacteristics)
app.get('/characteristicsReviewsReviews', db.getCharacteristicsReviews)


app.listen(port, ()=>{
  console.log(`Listening on Port:${port}`)
})
