const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb'); //Client Stubs:
const { doGreet, doGreetManyTimes, doLongGreet, doManyLongGreet, dostoreRedisKey } = require('./apis');
const path = require('path');

function main() {
  const tls = false;
  let creds;
  if (tls) {
    const rootCert = fs.readFileSync(path.join(__dirname, '../../ssl/ca.crt'))
    creds = grpc.ChannelCredentials.createSsl(rootCert);
  } else {
    creds = grpc.ChannelCredentials.createInsecure();
  }



  for (let i = 0; i < 100000; i++) {

    const client = new GreetServiceClient('43.205.139.186:5051', creds);

    //...client
    // doGreet(client);
    dostoreRedisKey(client);
  }
  // dostoreRedisKey(client);
  // doGreetManyTimes(client);
  // doLongGreet(client);
  // doManyLongGreet(client);
  // client.close();
}

main();
