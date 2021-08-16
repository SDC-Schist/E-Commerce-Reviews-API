var express = require('express');
const db = require('../db/queries')



var app = express();
const port = 3000


app.use(express.json());
app.get('/reviews', db.getReviews)
app.get('/characteristics', db.getCharacteristics)


app.get('/characteristicsReviews', db.getCharacteristicsReviews)
app.get('/reviews_photos', db.getReviewsPhotos)




app.listen(port, ()=>{
  console.log(`Listening on Port:${port}`)
})
