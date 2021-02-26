setServoPulse = (channel, pulse) => {
  let pulseLength;
  pulseLength = 1000000;
  // Devide the pulse length for 60 (pulseLength/60); Expected output 16,666.67
  pulseLength /= 60;
  print("%d us per period" % pulseLength);
  // Devide the pulse length for 4096 (pulseLength/4096); Expected output 4.07
  pulseLength /= 4096;
  print("%d us per bit" % pulseLength);
  // Multiple pulse for 1000
  pulse *= 1000;
  // Devide pulse/pulseLength
  pulse /= pulseLength;
  return pwm.setPWM(channel, 0, pulse);
};
