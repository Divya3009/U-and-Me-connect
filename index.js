const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"], // data is sent to the server
  },
});

app.use(cors()); // enabling all cors request

const PORT = process.env.PORT || 5000;  // setting environment variable port

app.get("/", (req, res) => {
  res.send("Running");      //adding an endpoint
});

io.on("connection", (socket) => {     // making a connention between client and server
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {     // disconnects call  and endcall is broadcasted
    socket.broadcast.emit("endCall");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
    });
  });

  socket.on("updateMyMedia", ({ type, currentMediaStatus }) => { 
    console.log("updateMyMedia");
    socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
  });

  socket.on("msgUser", ({ name, to, msg, sender }) => {   //enables the text chatting feature  
    io.to(to).emit("msgRcv", { name, msg, sender });
  });

  socket.on("answerCall", (data) => {   // box that appears when someone calls with an option of answer or decline
    socket.broadcast.emit("updateUserMedia", {
      type: data.type,
      currentMediaStatus: data.myMediaStatus,
    });
    io.to(data.to).emit("callAccepted", data);  // answering the call
  });
  socket.on("endCall", ({ id }) => {        // declining the call
    io.to(id).emit("endCall");
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
