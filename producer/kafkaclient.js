const ip = require('ip')
const { Kafka, logLevel } = require("kafkajs");
const host = process.env.HOST_IP || ip.address()
exports.kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  clientId: "my-app",
  brokers: [`${host}:9092`]//["192.168.0.103:9092"],
});