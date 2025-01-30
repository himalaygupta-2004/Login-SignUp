const mongoose = require('mongoose');

const mongo_url = process.env.MONGODB_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log('MongoDb connection Successful');
  })
  .catch((error) => {
    console.log(`Connection Unsuccessful !!`);
  });
