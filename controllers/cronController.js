const axios = require("axios");
const cron = require("node-cron");
const fs = require("fs");
const { generateToken } = require("./../model");
let isCronJobScheduled = false;
const cronJobFunction = async () => {
  const currentDate = new Date().toISOString();
  const currentTime = new Date().toLocaleString();

  const logMessage = `Cron job executed at ${currentDate + currentTime}`;

  console.log(logMessage);

  fs.appendFileSync("cron.txt", logMessage + "\n");

  const token = generateToken();
  console.log("token is" + token);
  const endpointUrl = "http://localhost:3000/test";

  try {
    const response = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Endpoint response:", response.data);
  } catch (error) {
    console.error("Error calling endpoint:", error.message);
  }
};

module.exports = {
  cronJobFunction,
  isCronJobScheduled,
};
