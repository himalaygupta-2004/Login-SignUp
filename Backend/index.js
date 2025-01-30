const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/authRouter');
require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());
app.get('/home', (req, res) => {
  res.send('Working Successfully');
});
app.use('/auth', AuthRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}/home`);
});
