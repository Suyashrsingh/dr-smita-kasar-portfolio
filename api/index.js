const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../server/.env') });
require('dotenv').config();
const app = require('../server/server');

module.exports = app;
