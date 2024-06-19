# data-streaming-kafka-socket

Live streaming text from kafka producer to kafka consumer, and then to frontend using socket.

Replication and batches are configured on docker image of confluentinc/cp-kafka and zookeeper.

Steps:
```
cd producer
docker-compose up
```
start consumer and client
```
cd consumer
node index.js
cd client
npm start
```
finally start producer
```
cd producer
node index.js
```


Data from 'somefile.txt' in producer will be fetch to client in batches in real-time.