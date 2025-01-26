const { acceptVerification } = require('../DBWrapper.js');
const { parse } = require('url');
const fs = require('fs');
const { apiKey } = require('../config.json');

module.exports = async (req, res) => {

    module.exports.expectedMethod = 'PUT';
    const { query } = parse(req.url, true);
    try {
      if (query.k == apiKey) {
        await acceptVerification(query.c, query.i);  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('true');  
      }
    } catch (error) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end('false');
    }
  };