// Generates a UTC Date String for the current time.
module.exports = function timestamp(){
  return (new Date()).toUTCString();
};
