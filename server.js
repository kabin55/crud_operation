const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const route = require("./movieRoute");

app.use(express.json());

app.use("/", route);

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
