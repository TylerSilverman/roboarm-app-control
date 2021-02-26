// channel 0 = base;
// channel 1 = shoulder;
// channel 2 = elbow;
// channel 3 = wristArticulation;
// channel 4 = wristRoll;
// channel 5 = claw;
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

// socket.io connection to the App hosted at Heroku
const socket = require("socket.io-client")(
  "https://roboarmcontrol.herokuapp.com/"
);

// Setup the socketio connection and listeners
// Requires socket.io and pass server port
socket.on("connection_error", () => {
  console.log("bad request");
});

socket.on("disconnect", (reason) => {
  console.log(reason);
});

socket.on("pwm", (channel, value) => {
  const ch = parseInt(channel);
  const v = parseInt(value);
  pwm.setPwm(ch, 0, v);
});

socket.on("pwmpulse", (channel, value) => {
  const ch = parseInt(channel);
  const v = parseInt(value);
  pwm.setPulse(ch, v);
});

socket.on("pwmstop", () => {
  pwm.stop();
});

socket.on("disconnect", () => {
  pwm.stop();
  console.log("client disconnected");
});
