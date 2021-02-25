// channel 0 = base;
// channel 1 = shoulder;
// channel 2 = elbow;
// channel 3 = wristArticulation;
// channel 4 = wristRoll;
// channel 5 = claw;

const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});

// Create a variable that will pass the data to the claw server through socket.io
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "https://roboarmcontrol.herokuapp.com/dashboard",
    // origin: "http://robotarm.dyndns.org/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

/*
    Adafruit PCA9685 functions based on https://github.com/johntreacy/adafruit-pca9685
    Modified by: Camila Alves Meyer
*/

// main library for handling pwm events
// Events are pwm (pulse width modulation) requests channel, value = offtime, on-time always 0

// Require Adafruit PCA9685 installed package
const makePwm = require("adafruit-pca9685");
const pwm = makePwm({ freq: 50, correctionFactor: 1.118 });

// deal with any signals and cleanup
process.on("SIGINT", (code) => {
  console.log("\nCtrl-C caught ...");
  process.exit(0);
});

process.on("SIGHUP", (code) => {
  console.log("Got SIGHUP exiting ...");
  process.exit(0);
});

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

// Setup the socketio connection and listeners
// Requires socket.io and pass server port
io.on("connection", (socket) => {
  console.log("client connected");
  handlePwmRequest(socket);
  handlePwmPulseRequest(socket);
  handleStopRequest(socket);
  handleClientDisconnection(socket);
});

function handlePwmRequest(socket) {
  socket.on("pwm", (channel, value) => {
    const ch = parseInt(channel);
    const v = parseInt(value);
    pwm.setPwm(ch, 0, v);
  });
}

function handlePwmPulseRequest(socket) {
  socket.on("pwmpulse", (channel, value) => {
    const ch = parseInt(channel);
    const v = parseInt(value);
    pwm.setPulse(ch, v);
  });
}

function handleStopRequest(socket) {
  socket.on("pwmstop", () => {
    pwm.stop();
  });
}

function handleClientDisconnection(socket) {
  socket.on("disconnect", () => {
    pwm.stop();
    console.log("client disconnected");
  });
}
