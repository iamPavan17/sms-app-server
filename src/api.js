const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());
const router = express.Router();
const unirest = require("unirest");
const request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

router.post("/send-message", (req, res) => {
  const { numbers, message } = req.body;
  const API_KEY =
    "j1slTIAql2P5nNRWk5FgRbs1iWZ9LvDfRL8nMm4tF5ynihvw3vlRWXNPi9fF";

  request.headers({
    authorization: API_KEY,
  });

  request.form({
    numbers,
    message,
    route: "q",
    sender_id: "TXTIND",
    language: "english",
  });

  request.end(function (data) {
    if (data.error) console.log("error at otp");
    res.send(data.body);
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
