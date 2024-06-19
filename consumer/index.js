const http = require('http')
const cors = require('cors')
const app = require('express')()
const httpsServer = http.createServer(app);
const { consumerConnect } = require('./consumer')
const socket = require('./socket')
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));


httpsServer.listen(5001, () => {
console.log("running at 5001....")
socket.startServer(httpsServer);
consumerConnect()
})