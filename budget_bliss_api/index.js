
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())


app.use('/api', routes);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
