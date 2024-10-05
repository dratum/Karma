require("dotenv").config();
const express = require("express");
const serverConfig = require("./config/serverConfig");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const http = require("http");
const { Server } = require("socket.io");
const { User, Message } = require("./db/models");

const authMiddleware = require("./middleware/auth-middleware");
//GET
const bidsRouter = require("./routes/views/bids.router");
const profileRouter = require("./routes/views/profile.bio.router");
const profileActiveBidsRouter = require("./routes/views/profile.active.bid.router");
const likeRouter = require("./routes/views/likes.router");
const responsesRouter = require("./routes/views/myResponses.router");
const profileProgressBidsRouter = require("./routes/views/profile.progress.bid.router");
const profileCompleteBidsRouter = require("./routes/views/profile.complete.bid.router");
const chatRouter = require("./routes/chat/chat.route");
const ordersRouter = require("./routes/views/profile.bio.order.router");
const namesRouter = require("./routes/views/names.bid.router");
const nameExecRouter = require("./routes/views/namesExec.bid.router");
const idForChatRoom = require("./routes/views/idForChatRoom.router");
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
  bidsRouter,
  likeRouter,
  responsesRouter,
  chatRouter,
  namesRouter,
  nameExecRouter,
  router,
  idForChatRoom
);
app.use("/api/profile", profileRouter);
app.use("/api/profile/bids/active", profileActiveBidsRouter);
app.use("/api/profile/bids/progress", profileProgressBidsRouter);
app.use("/api/profile/bids/complete", profileCompleteBidsRouter);
app.use("/api/profile/bio", ordersRouter);
//API
app.use("/api/profile", userEditProfileRouter);

app.use(
  "/api",
  bidApiRouter,
  responseApiRouter,
  changeStatusBIdRouter,
  likeApiRouter,
  profileActiveBidsApiRouter
);
app.use("/api/certificates", certificatesRouter);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

io.on("connection", (socket) => {
  console.log("connect");

  socket.on("join", async ({ room, user }) => {
    socket.join(room);
    const messages = await Message.findAll({ where: { room_id: room } });
    const getUser = await User.findOne({ where: { id: user } });

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
  console.log("Listening on port 4000");
});
