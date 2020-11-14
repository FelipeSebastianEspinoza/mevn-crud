module.exports = {
  // mongoUri: process.env.MONGO_URI, esto cuando se tenga una variable en bash
  mongoUri: "mongodb://localhost:27017/test",
  PORT: process.env.PORT || 3000,
};
