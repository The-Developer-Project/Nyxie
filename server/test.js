
module.exports = async (req, res) => {

    module.exports.expectedMethod = 'GET';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Data submitted successfully!' }));
  };
  