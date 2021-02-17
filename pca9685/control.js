const i2cBus = require("i2c-bus");
const Pca9685Driver = require("pca9685").Pca9685Driver;

// const base = 0;
// const shoulder = 1;
// const elbow = 2;
// const wristArticulation = 3;
// const wristRoll = 4;
// const claw = 5;

const options = {
  i2c: i2cBus.openSync(1),
  address: 0x40,
  frequency: 50,
  debug: false,
};

pwm = new Pca9685Driver(options, (err) => {
  if (err) {
    console.error("Error initializing PCA9685");
    process.exit(-1);
  }
  console.log("Initialization done");

  // Set channel 0 to turn on on step 42 and off on step 255
  // (with optional callback)
  pwm.setPulseRange(0, 42, 255, () => {
    if (err) {
      return console.error("Error setting pulse range.");
    }
    console.log("Pulse range set.");
  });

  // Set the pulse length to 1500 microseconds for channel 2
  pwm.setPulseLength(2, 1500);

  // Set the duty cycle of 25% for channel 8
  pwm.setDutyCycle(8, 0.25);

  // Turn off all power to channel 6
  // (with optional callback)
  pwm.channelOff(6, () => {
    if (err) {
      return console.error("Error turning off channel.");
    }
    console.log("Channel 6 is off");
  });

  // Turn on channel 3 (100% power)
  pwm.channelOn(3);
});
