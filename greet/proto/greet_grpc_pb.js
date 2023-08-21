// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var greet_pb = require('./greet_pb.js');

function serialize_Greet_GreetRequest(arg) {
  if (!(arg instanceof greet_pb.GreetRequest)) {
    throw new Error('Expected argument of type Greet.GreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Greet_GreetRequest(buffer_arg) {
  return greet_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Greet_GreetResponse(arg) {
  if (!(arg instanceof greet_pb.GreetResponse)) {
    throw new Error('Expected argument of type Greet.GreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Greet_GreetResponse(buffer_arg) {
  return greet_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Greet_RedisRequest(arg) {
  if (!(arg instanceof greet_pb.RedisRequest)) {
    throw new Error('Expected argument of type Greet.RedisRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Greet_RedisRequest(buffer_arg) {
  return greet_pb.RedisRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Greet_RedisResponse(arg) {
  if (!(arg instanceof greet_pb.RedisResponse)) {
    throw new Error('Expected argument of type Greet.RedisResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Greet_RedisResponse(buffer_arg) {
  return greet_pb.RedisResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetServiceService = exports.GreetServiceService = {
  greet: {
    path: '/Greet.GreetService/Greet',
    requestStream: false,
    responseStream: false,
    requestType: greet_pb.GreetRequest,
    responseType: greet_pb.GreetResponse,
    requestSerialize: serialize_Greet_GreetRequest,
    requestDeserialize: deserialize_Greet_GreetRequest,
    responseSerialize: serialize_Greet_GreetResponse,
    responseDeserialize: deserialize_Greet_GreetResponse,
  },
  greetManyTimes: {
    path: '/Greet.GreetService/GreetManyTimes',
    requestStream: false,
    responseStream: true,
    requestType: greet_pb.GreetRequest,
    responseType: greet_pb.GreetResponse,
    requestSerialize: serialize_Greet_GreetRequest,
    requestDeserialize: deserialize_Greet_GreetRequest,
    responseSerialize: serialize_Greet_GreetResponse,
    responseDeserialize: deserialize_Greet_GreetResponse,
  },
  // server streaming
longGreet: {
    path: '/Greet.GreetService/LongGreet',
    requestStream: true,
    responseStream: false,
    requestType: greet_pb.GreetRequest,
    responseType: greet_pb.GreetResponse,
    requestSerialize: serialize_Greet_GreetRequest,
    requestDeserialize: deserialize_Greet_GreetRequest,
    responseSerialize: serialize_Greet_GreetResponse,
    responseDeserialize: deserialize_Greet_GreetResponse,
  },
  // client streaming
manyLongGreet: {
    path: '/Greet.GreetService/ManyLongGreet',
    requestStream: true,
    responseStream: true,
    requestType: greet_pb.GreetRequest,
    responseType: greet_pb.GreetResponse,
    requestSerialize: serialize_Greet_GreetRequest,
    requestDeserialize: deserialize_Greet_GreetRequest,
    responseSerialize: serialize_Greet_GreetResponse,
    responseDeserialize: deserialize_Greet_GreetResponse,
  },
  // client-server streaming
storeRedisData: {
    path: '/Greet.GreetService/StoreRedisData',
    requestStream: true,
    responseStream: true,
    requestType: greet_pb.RedisRequest,
    responseType: greet_pb.RedisResponse,
    requestSerialize: serialize_Greet_RedisRequest,
    requestDeserialize: deserialize_Greet_RedisRequest,
    responseSerialize: serialize_Greet_RedisResponse,
    responseDeserialize: deserialize_Greet_RedisResponse,
  },
};

exports.GreetServiceClient = grpc.makeGenericClientConstructor(GreetServiceService);
