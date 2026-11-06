
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Connect = require("./DbConfig/Db.connect");
const taskrouter = require("./Routes/task.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/task", taskrouter);

Connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TaskFlow server running on port: ${PORT}`);
});
