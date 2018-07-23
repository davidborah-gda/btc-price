
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 8400;

server.use(cors());
server.use(express.static('build'));

server.get('/pricing/', (request, response) => {
  const url = `https://api.coindesk.com/v1/bpi/currentprice.json`;
  axios.get(url)
    .then((priceRequest) => {
      response.json(priceRequest.data);
    })
    .catch((err) => {
      response.status(500).json({
        msg: 'Somthing went horribly awry',
        error: err,
      });
    });
});

server.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});