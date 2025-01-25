const https = require('https');
const path = require('path');
const fs = require('fs');
const { parse } = require('url');
const { port } = require('./config.json');

console.log("Loading endpoints");

const functionsPath = path.join(__dirname, 'server');
const functionFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith('.js'));
const endpointFunctions = {};

for (const file of functionFiles) {
  const filePath = path.join(functionsPath, file);
  const endpoint = `/${path.basename(file, '.js')}`;
  const func = require(filePath);
  endpointFunctions[endpoint] = func;
  console.log(`Loaded endpoint /${path.basename(file, '.js')}`);
}

var httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
};

const server = https.createServer(httpsServerOptions, async (req, res) => {
  const parsedUrl = parse(req.url);
  const endpoint = parsedUrl.pathname;

  if (endpointFunctions[endpoint]) {
    const func = endpointFunctions[endpoint];

    if (func.expectedMethod && func.expectedMethod !== req.method) {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Method ${req.method} Not Allowed for this endpoint. Expected: ${func.expectedMethod}`);
      return;
    }

    await func(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
