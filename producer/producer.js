// putting current time in kafka after every 10 seconds

// read this
// https://www.sohamkamani.com/nodejs/working-with-kafka/
// https://medium.com/@ashok.tankala/kafka-consumer-group-and-batch-producer-in-node-js-cd144727615c
// batch size
// https://tenusha.medium.com/achieving-custom-batch-size-consumption-in-kafkajs-using-the-eachmessage-callback-e7303d7967fa


const {CompressionTypes } = require("kafkajs");
const { kafka } = require("./kafkaclient");
const path = require('path'); 
const fs = require('fs');

let producerConnect = async () => {
    const kafkaProducerConfigs = {
        allowAutoTopicCreation: false,
        transactionTimeout: 30000,
        idempotent: true,
    }
    const producer = kafka.producer(kafkaProducerConfigs);
    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    // preparing data
    let flg = true;
 
    const pdfReadableStreams = fs.createReadStream(path.resolve('./somefile.txt'),{encoding : 'utf-8'});
    pdfReadableStreams.on('data', async (chunk) => {
        console.log("chunk----  ",JSON.stringify(chunk))
        flg = !flg;
        const topicName = flg ? 'topic1' : 'topic2'
        const keyName = chunk.toString()[0]
        const topicMessages = [
            {
                topic: topicName,
                messages:[{key: keyName , value: JSON.stringify(chunk) }]
            },
        ]
        console.log("topicMessages")
        console.log(topicMessages)
        await producer.sendBatch({
            compression: CompressionTypes.GZIP,
            acks: -1,
            timeout: 1,//30000,
            topicMessages: topicMessages,
        })

    })



}

module.exports = {producerConnect}

