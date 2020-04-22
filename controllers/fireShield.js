const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createFireShield,
  readFireShield,
  updateFireShield,
  deleteFireShield,
} = require('../models/fireShield');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/fire_shield/`, async (req, res) => {
  console.log(req.body);
  const {
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  } = req.body;
  await createFireShield({
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  });
  const updatedData = await readFireShield();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/fire_shield/`, async (req, res) => {
  const fireShieldData = await readFireShield();
  res.send(fireShieldData).status(200);
});

router.post(`${BASE}/search_fire_shield/`, async (req, res) => {
  const automaticExtinguishingData = await readFireShield(req.body);
  res.send(automaticExtinguishingData).status(200);
});

router.put(`${BASE}/fire_shield/`, async (req, res) => {
  const {
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  } = req.body;
  await updateFireShield({
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  });
  const updatedData = await readFireShield();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_fire_shield/`, async (req, res) => {
  await deleteFireShield(req.body);
  const updatedData = await readFireShield();
  res.send(updatedData).status(200);
});

module.exports = router;
