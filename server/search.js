const { searchProduct } = require('../DBWrapper.js');
const { parse } = require('url');

module.exports = async (req, res) => {

    module.exports.expectedMethod = 'GET';
    const { query } = parse(req.url, true);
    try {
      let r = searchProduct(query.s);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(r));  
    } catch (error) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end('{"false":"false"}');
    }
  };