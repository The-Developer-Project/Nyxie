function serve() {
    console.log("initializing server");
    require('child_process').fork('server.js');
}
module.exports = {serve};