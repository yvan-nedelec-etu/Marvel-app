module.exports = {
  testEnvironment: "jest-fixed-jsdom", // Use jsdom environment for testing React components
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};