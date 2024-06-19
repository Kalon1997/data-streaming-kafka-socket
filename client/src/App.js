import './App.css';
import React, {useEffect, useState} from 'react'
import socketIO from 'socket.io-client'
const ENDPOINT = 'http://localhost:5001' 
function App() {
  var socket = socketIO(ENDPOINT, {  
    cors: {
    origin: "ws://localhost:5001/socket.io/?EIO=4&transport=websocket",
    credentials: true
  },transports : ['websocket'] });
  const [someText, setSomeText] = useState([])
  const [blobUrl, setBlobUrl] = useState([])
  function setSomeTextHandler(data) {
    setSomeText([ ...someText, data]);
    // setSomeText(["\ufeff", ...someText, data]);
  }
  function setBlobUrlHandler(data) {
    let x = data.slice(5)
    console.log(x)
    setBlobUrl(data);
  }
  useEffect(() => {
    socket.on("connect", () => {
       console.log("frontend")
    })

    return () => {
        socket.off();
    }
}, [socket])
useEffect(() => {

  socket.on("PLAY", (args) => {
    
     setSomeTextHandler(args)
     const blob = new Blob(someText, { type: "video/mp4;charset=utf-8;" });
     const dataURL = URL.createObjectURL(blob);
     setBlobUrlHandler(dataURL)
    //  console.log(dataURL)
     

  })
 
     return () => {
         // socket.emit('disconnect');
         socket.off();
     }
 }, [socket])
  return (
    <div className="App">
      {someText}
    {/* <video controls width="640" height="360" src={blobUrl} autoPlay >
    Your browser does not support the video tag.
    </video> */}
    </div>
  );
}

export default App;