const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const osc = require('osc');


server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
module.exports = server;