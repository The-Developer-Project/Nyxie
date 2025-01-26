const { parse } = require('url');
const { apiKey } = require('../config.json');
const { getUserByRobloxId, getProductById, getDiscordIdByProductID } = require('../DBWrapper.js');
const fs = require('fs');

module.exports = async (req, res) => {

    module.exports.expectedMethod = 'PUT';
    console.log("test");
    const { query } = parse(req.url, true);
    try {
      if (query.k == apiKey) {
        let rawdata = fs.readFileSync('tickets.json'); 
        let tickets = JSON.parse(rawdata).tickets;
        let product = getProductById(query.c);
        let user = getUserByRobloxId(query.i);
        let box = getDiscordIdByProductID(query.c);
        if (user.success && product.success && box.success) {
          tickets.push(
            {
              "user": user.discord_id,
              "seller": box.id,
              "item": product.name,
              "description": product.description
            }
          );
          let data = JSON.stringify({"tickets": tickets});
          fs.writeFileSync('tickets.json', data);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end('true');  
        }
        else {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.end('forbidden');
        }
      }
      else {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('forbidden');
      }
    } catch (error) {
        console.log(error);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('error');
    }
  };