const { Kafka, logLevel  } = require("kafkajs");
const ip = require('ip')
const host = process.env.HOST_IP || ip.address()
exports.kafka = new Kafka({
  logLevel: logLevel.INFO,
  clientId: "my-app",
  brokers: [`${host}:9092`],
});