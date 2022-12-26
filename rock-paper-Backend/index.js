const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// require('./config/db');
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes'));

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
