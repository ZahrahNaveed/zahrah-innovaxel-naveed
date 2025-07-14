const { customAlphabet } = require("nanoid");

// Generate a 6-character alphanumeric code
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

module.exports = () => nanoid();
