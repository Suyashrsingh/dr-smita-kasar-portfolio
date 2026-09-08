const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const AdminModel = require('../models/Admin');

async function setStrongPassword() {
  await mongoose.connect(process.env.MONGODB_URI);
  await AdminModel.deleteMany({});
  await AdminModel.insertMany([
    {
      email: 'smitakasar@gmail.com',
      password: 'SmitaKasar@MIT#2026',
      name: 'Dr. Smita Lalit Kasar',
      role: 'admin'
    },
    {
      email: 'smita.kasar@mit.asia',
      password: 'SmitaKasar@MIT#2026',
      name: 'Dr. Smita Lalit Kasar',
      role: 'admin'
    }
  ]);
  const admins = await AdminModel.find({});
  console.log('Admins in DB verified:', admins.map(a => ({ email: a.email, pass: a.password })));
  await mongoose.disconnect();
}
setStrongPassword();
