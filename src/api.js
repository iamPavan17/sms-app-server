const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

router.get("/", (req, res) => {
  res.json({
    message: "Hello, world!",
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
