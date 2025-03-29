require("dotenv").config();
const express = require("express");
const serverConfig = require("./config/serverConfig");
const router = require("./router/index");
const http = require("http");
const { Server } = require("socket.io");
const { Message } = require("./db/models");
//GET

const profileRouter = require("./routes/views/profile.bio.router");

const responsesRouter = require("./routes/views/myResponses.router");

const chatRouter = require("./routes/chat/chat.route");
const idForChatRoom = require("./routes/views/idForChatRoom.router");

const ordersRouter = require("./routes/views/profile.bio.order.router");

const namesRouter = require("./routes/views/names.bid.router");
const nameExecRouter = require("./routes/views/namesExec.bid.router");

//API
const bidApiRouter = require("./routes/API/bid.api.route");
const responseApiRouter = require("./routes/API/response.api.route");
const changeStatusBIdRouter = require("./routes/API/changeStatusBid.api.route");
const likeApiRouter = require("./routes/API/like.api.route");
const profileActiveBidsApiRouter = require("./routes/API/activeBid.api.route");
// const profileBidApiRouter = require("./routes/API/profile.bid.api.router")
const userEditProfileRouter = require("./routes/API/user.api.route");
const certificatesRouter = require("./routes/views/certificates.router");

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://46.148.228.8"],
  },
});

serverConfig(app);
//GET
app.use(
  "/api",
  router,
  responsesRouter,
  chatRouter,
  namesRouter,
  nameExecRouter,
  idForChatRoom,
  profileRouter,
  ordersRouter,
  userEditProfileRouter,
  bidApiRouter,
  responseApiRouter,
  changeStatusBIdRouter,
  profileActiveBidsApiRouter,
  certificatesRouter
);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

io.on("connection", (socket) => {
  console.log("connect");

  socket.on("join", async ({ room, user }) => {
    socket.join(room);
    const messages = await Message.findAll({ where: { room_id: room } });
    // const getUser = await User.findOne({ where: { id: user } });

    socket.emit("messages", {
      data: messages,
    });
  });

  socket.on("sendMessage", async ({ request }) => {
    const messageCreate = await Message.create({
      room_id: request.room_id,
      user_id: request.user_id,
      text_message: request.text_message,
      is_read: request.is_read,
    });

    io.to(request.room_id).emit("message", { data: { messageCreate } });
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(4000, () => {
  console.log("Socket on port 4000");
});
