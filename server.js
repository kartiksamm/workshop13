// server.js
const cron = require("node-cron");
const express = require("express");
const morgan = require("morgan");
const { validateToken } = require("./middleware");
const { generateToken } = require("./model");
let {
  cronJobFunction,
  isCronJobScheduled,
} = require("./controllers/cronController");

const app = express();
const port = 3000;

const token = generateToken();
console.log(token);
// Middleware
app.use(morgan("dev"));

app.get("/test", validateToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
  if (!isCronJobScheduled) {
    cron.schedule("* * * * *", cronJobFunction);
    console.log("Cron job scheduled to run every 1 minute.");
    isCronJobScheduled = true;
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
