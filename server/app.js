var express = require('express');
const db = require('../db/queries')



var app = express();
const port = 3000


app.use(express.json());
app.get('/reviews', db.getReviews)
app.get('/reviews/meta', db.getReviewsMeta)
app.post('/reviews', db.postReview)




app.listen(port, ()=>{
  console.log(`Listening on Port:${port}`)
})
