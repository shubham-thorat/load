const logger = require('gk-logger')();
const pb = require('../proto/greet_pb')
const RedisClient = require('./redis/redisClient');
const helper = require('./helper');
const fs = require('node:fs')

class Count {
  static request_count = 0;
  static setInitial() {
    this.request_count = 0;
  }
  static increment() {
    this.request_count = this.request_count + 1
    return this.request_count
  }
  static getCount() {
    return this.request_count
  }
}


exports.greet = (call, callback) => {
  logger.info('Greet was invoked');
  const res = new pb.GreetResponse()
    .setResult(`Hello ${call.request.getFirstName()}`)
  callback(null, res);
}

exports.greetManyTimes = (call, _) => {
  logger.info('greetManyTimes was invoked');
  const res = new pb.GreetResponse();

  for (let i = 0; i < 10; i++) {
    res.setResult(`Hello ${call.request.getFirstName()} - number ${i}`);
    call.write(res);
  }
  call.end();
}

exports.longGreet = (call, callback) => {
  logger.info('longGreet was invoked');
  let greet = '';

  call.on('data', (chunk) => {
    logger.info(`Data received ${chunk}`)
    greet += chunk;
  });

  call.on('end', () => {
    logger.info(`Data received at end ${greet}`)
    const res = new pb.GreetResponse().setResult(greet);
    callback(null, res);
  })

}


exports.manyLongGreet = (call, calback) => {

  call.on('data', (req) => {
    logger.info(`Request received ${req}`);
    const res = new pb.GreetResponse().setResult(`Hello ${req.getFirstName()}`)

    logger.info(`Sending response ${res}`);
    call.write(res);
  })

  call.on('end', () => call.end());
}

let times = []

const calculate = () => {
  const startTime = Date.now();
  console.log("startTime", startTime)
  const r1 = helper.calculatePercentile(times, 99);
  const per_50 = helper.calculateMean(times);
  const r2 = helper.calculatePercentile(times, 50);
  const endTime = Date.now();
  console.log("endtime", endTime)

  logger.info(JSON.stringify({
    "99th Percentile": `${r1.result}ms`,
    "50 Percentile": `${r2.result}ms`,
    "min time required for request": `${r1.min_value}ms`,
    "max time required for request": `${r1.max_value}ms`,
    "average": `${per_50.toFixed(3)}ms`,
    "proccessing time": `${(endTime - startTime)}ms`,
  }))


  console.log({
    "99th Percentile": `${r1.result}ms`,
    "50 Percentile": `${r2.result}ms`,
    "min time required for request": `${r1.min_value}ms`,
    "max time required for request": `${r1.max_value}ms`,
    "average": `${per_50.toFixed(3)}ms`,
    "proccessing time": `${(endTime - startTime)}ms`,
  })
}
let prev_file = ''
exports.storeRedisData = (call, callback) => {
  const startTime = Date.now();
  call.on('data', (req) => {
    RedisClient.setKey(req.getKey(), req.getValue()).then(response => {
      const file_name = req.getFilename() ?? 'output_server.log'
      let res;
      if (response) {
        res = new pb.RedisResponse()
          .setStatus(200)
          .setMessage('Redis Success');
      } else {
        res = new pb.RedisResponse()
          .setStatus(500)
          .setMessage('Redis Success Failed');
      }
      const endTime = Date.now();
      const timeRequired = endTime - startTime;
      Count.increment()
      let path = `./output/logs/${file_name}`

      const request_count = Count.getCount()
      const data = `${request_count} ${timeRequired.toString()}\n`
      if (prev_file !== file_name) {

        console.log("1 Process Ended reinital request count", prev_file)
        console.log("request_count", getCount())
        Count.setInitial()
      }

      fs.appendFile(path, data, (err) => {
        if (err) {
          console.log("Error occurred while appending data to file : ", path, err)
        }
        logger.info(JSON.stringify({
          "count": request_count,
        }))
        call.write(res);
      })

    }).catch(error => {
      const res = new pb.RedisResponse()
        .setStatus(500)
        .setMessage(`Redis Success Failed Error - ${error}`);
      call.write(res)
    })
  })

  call.on('end', () => {
    call.end();
  });
}


//input load
//output metrices (for both client & server)