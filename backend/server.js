const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
app.use(cors());
app.use(express.json());

const userRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/role");
const channelRouter = require("./routes/channel");
const listRouter = require("./routes/list");
const videoRouter = require("./routes/video");
const rateRouter = require("./routes/rate");

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }loginRouter

const PORT = process.env.PORT || 5000;

//middleware
app.use("/register", userRouter);
app.use("/rate", rateRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);
app.use("/channel", channelRouter);
app.use("/list", listRouter);
app.use("/video", videoRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
