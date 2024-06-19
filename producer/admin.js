const {kafka} = require('./kafkaclient')
const adminConnect = async () => {
    const admin = kafka.admin();
    console.log("Admin connecting...");
    admin.connect();
    console.log("Adming Connection Success...");
  
    console.log("Creating Topic [time]");
    await admin.createTopics({
      topics: [
        {
          topic: "topic1",
          numPartitions: 2,
        },
        {
          topic: "topic2",
          numPartitions: 2,
        },
      ],
    });
    console.log("Topic Created Success [time]");
  
    // console.log("Disconnecting Admin..");
    // await admin.disconnect();
  }
  
module.exports= {adminConnect}