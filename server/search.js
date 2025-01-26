const { searchProduct } = require('../DBWrapper.js');
const { parse } = require('url');
const { apiKey } = require('../config.json');

module.exports = async (req, res) => {

    module.exports.expectedMethod = 'GET';
    const { query } = parse(req.url, true);
    try {
      if (query.k == apiKey) {
        let r = searchProduct(query.s);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(r));
    }
    } catch (error) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end('{"false":"false"}');
    }
  };