"use strict"

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, function(err, db){ //This is where the connection to the DB Starts.

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Get into the database, get the "tweets" document, take everything there and make it into an array and spit it out.
  function getTweets(callback){
    db.collection("tweets").find().toArray(callback);
  }

  getTweets(function(err, tweets) {
    console.log(tweets);
    for(let tweet of tweets){
      console.log(tweet)
    }
    db.close()
  });
})
