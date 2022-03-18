const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const Emergency = require('../models/Emergency');
const Admin = require('../models/Admins');

//@desc add user emergency coordinates to the database
// this route is for user only
router.post('/:user_id', async (req, res) => {
  const user = req.params.user_id;
  const { lat, long } = req.body;
  const read = 'false';
  const newEmergency = {};
  if (user) newEmergency.user = user;
  if (lat) newEmergency.coordinates = lat;

  try {
    let emergency = await Emergency.findById(req.params.user_id);
    emergency = new Emergency(newEmergency);
    emergency.coordinates.push(long);

    const admin = await Admin.findById('622492d84422423a0457b6c4');

    const emergencyNotice = {};
    if (user) emergencyNotice.user = user;
    if (read) emergencyNotice.read = read;
    admin.emergencyAlert.unshift(emergencyNotice);
    await admin.save();
    await emergency.save();

    res.json('Successfully sent your location.');
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@desc get all of the users emergency only for admin
router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find();

    res.json(emergencies);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@desc get single emergency using its id
router.get('/:emergency_id', async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.emergency_id);
    res.json(emergency);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@desc delete emergency after solved
router.delete('/:emergency_id', async (req, res) => {
  try {
    await Emergency.findByIdAndDelete(req.params.emergency_id);

    const emergencies = await Emergency.find();

    res.json(emergencies);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

//@desc change notification read;
router.put('/:notification_id', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    const index = admin.emergencyAlert
      .map((x) => x.id)
      .indexOf(req.params.notification_id);

    admin.emergencyAlert[index].read = 'true';
    await admin.save();

    res.json(admin);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;