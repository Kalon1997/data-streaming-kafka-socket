const app = require('express')()
const { kafka } = require("./kafkaclient");
const group = "g1"
const socket = require('./socket')


const consumerConnect = async () => {
    const consumer = kafka.consumer({ 
      groupId: group,
      // heartbeatInterval: 10000, // should be lower than sessionTimeout
      // sessionTimeout: 60000,
     });
    // const processMessage = async ({ msg }) => {
    //   console.log(JSON.parse(msg))
    //   consumer.pause()
    //   // await writeToDB(batch)
    //   consumer.resume()
    // }

    await consumer.connect();
    await consumer.subscribe({ topics: ["topic1", "topic2"], fromBeginning: false  });

    await consumer.run({
      autoCommit: true,
      eachBatchAutoResolve: true,
      autoCommitInterval: 5000,
      autoCommitThreshold: 100,
      eachBatch: async ({
          batch,
          resolveOffset,
          heartbeat,
          commitOffsetsIfNecessary,
          uncommittedOffsets,
          isRunning,
          isStale,
          pause,
      }) => {
          for (let message of batch.messages) {
              console.log({
                  topic: batch.topic,
                  partition: batch.partition,
                  highWatermark: batch.highWatermark,
                  message: {
                      offset: message.offset,
                      key: message.key.toString(),
                      value: message.value,  //message.value
                      headers: message.headers,
                  }
              })


              // console.log(message.value)
              console.log(Buffer.from(message.value).toString('utf-8', 0, message.value.length))
              await resolveOffset(message.offset)
              await heartbeat()
              let msgChunk = Buffer.from(message.value).toString('utf-8', 0, message.value.length)
              socket.emit("PLAY",msgChunk);
            // return msgChunk;
          }
      },
  })


    // await consumer.run({
    //   autoCommit:true,//default is true
    //   autoCommitInterval: 5000,
    //   eachBatchAutoResolve: false,
    //   eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale  }) => {
    //     for (let message of batch.messages) {
    //       console.log("message")
    //       console.log(JSON.parse(message))
    //       if (!isRunning() || isStale()) return;
    //       await this.processMessage(message)
    //       resolveOffset(message.offset)
    //       await heartbeat()
    //   }
    //     },
    //   });
}

module.exports = {consumerConnect}