
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 7042;

server.use(cors());
server.use(express.static('build'));

server.get('/comic/:number', (request, response) => {
  const { number } = request.params;
  const url = `https://xkcd.com/${number}/info.0.json`;
  axios.get(url)
    .then((comicResponse) => {
      response.json(comicResponse.data);
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