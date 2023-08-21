const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl');
const logger = require('gk-logger')();
const { GreetServiceService } = require('../proto/greet_grpc_pb');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const addr = process.env.BASE_URL || 'localhost:5051';

function cleanup(server) {
  logger.info('Server cleanup method is calling');
  if (server) {
    logger.info('Server Shutting down forcefully....');
    server.forceShutdown();
  }
}

process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  total_time = 0;
  process.exit(0);
});


function main() {
  const server = new grpc.Server({
    "grpc.max_concurrent_streams": 100000,
    'grpc-node.max_session_memory': 1000
  });
  server.addService(GreetServiceService, serviceImpl);



  const tls = false;
  let creds;
  if (tls) {
    const rootCert = fs.readFileSync(path.join(__dirname, '../../ssl/ca.crt'));
    const rootChain = fs.readFileSync(path.join(__dirname, '../../ssl/server.crt'));
    const privateKey = fs.readFileSync(path.join(__dirname, '../../ssl/server.pem')); //private key

    creds = grpc.ServerCredentials.createSsl(rootCert, [{
      cert_chain: rootChain,
      private_key: privateKey
    }])
  } else {
    creds = grpc.ServerCredentials.createInsecure()
  }
  console.log(addr)
  server.bindAsync(addr, creds, (err, _) => {
    console.log('first')

    if (err) {
      console.log("error", err)
      return cleanup(server);
    }
    if (!fs.existsSync('./output')) {
      console.log('hello')
      fs.mkdirSync('./output');
      console.log('Output Folder created')
    }
    server.start();
  });

  // logger.info(`Server start on running ${addr}`)
  console.log(`Server start on running ${addr}`)
}

main();