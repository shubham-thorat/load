const logger = require('gk-logger')();
const { GreetRequest, RedisRequest } = require('../proto/greet_pb'); //Service Descriptors

exports.doGreet = (client) => {
  logger.info('doGreet is invoked');

  const req = new GreetRequest().setFirstName('Shubham');

  client.greet(req, (err, res) => {
    if (err) {
      return console.log(err)
    }

    logger.info(`Response Greet: ${res.getResult()}`);
  })
}

exports.doGreetManyTimes = (client) => {
  const key = '';
  const req = new GreetRequest().setFirstName('Shubham');

  logger.info('dostoreRedisKey client was called');

  const call = client.greetManyTimes(req);

  call.on('data', (res) => {
    console.log(`Greet Many times ${res.getResult()}`)
  })
}

exports.doLongGreet = (client) => {
  const names = ['shubham', 'shubham1', 'shubham2'];
  logger.info("doLongGreet was called");

  const call = client.longGreet((err, res) => {
    logger.info("doLongGreet requst is made");
    if (err) {
      logger.error(JSON.stringify({
        "error": err,
        "method": 'doLongGreet'
      }))
      return console.log(err)
    }
    logger.info(JSON.stringify({
      msg: 'success doLongGreet',
      value: res.getResult()
    }))
  })


  names.map((name) => {
    return new GreetRequest().setFirstName(name);
  }).forEach(req => call.write(req));

  call.end();
}


exports.doManyLongGreet = (client) => {
  const names = ['shubham', 'shubham1', 'shubham2'];
  logger.info("doLongGreet was called");

  const call = client.manyLongGreet();

  call.on('data', (res) => {
    logger.info(`Result doManyLongGreet - ${res.getResult()}`)
  })

  names.map((name) => {
    return new GreetRequest().setFirstName(name);
  }).forEach(req => call.write(req));

  call.end();
}


exports.dostoreRedisKey = (client) => {
  const call = client.storeRedisData();

  call.on('data', (res) => {

    logger.info(JSON.stringify({
      status: res.getStatus(),
      message: res.getMessage()
    }))
  })

  const data = [
    {
      "type": "Bi-directional Stream",
      "rid": 1,
      "key": "first",
      "value": "first_value"
    },
    {
      "type": "Bi-directional Stream",
      "rid": 2,
      "key": "second",
      "value": "second_value"
    },
    {
      "type": "Bi-directional Stream",
      "rid": 3,
      "key": "third",
      "value": "third_value"
    }
  ];


  data.map(item => {
    return new RedisRequest()
      .setType(item.type)
      .setRid(item.rid)
      .setKey(item.key)
      .setValue(item.value)
  }).forEach(req => call.write(req))

  call.end();

}