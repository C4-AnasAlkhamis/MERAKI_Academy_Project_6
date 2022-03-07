const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
app.use(cors());
app.use(express.json());

const userRouter = require("./routes/register");
const loginRouter = require("./routes/login");

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }loginRouter

const PORT = process.env.PORT || 5000;

//middleware

app.use("/register", userRouter);
app.use("/login", loginRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
