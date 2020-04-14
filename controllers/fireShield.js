const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createFireShield,
  readFireShield,
  updateFireShield,
  deleteFireShield,
} = require('../models/incidents');

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
  const objectReviewData = await createFireShield({
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/fire_shield/`, async (req, res) => {
  const objectReviewData = await readFireShield();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/fire_shield/`, async (req, res) => {
  const {
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  } = req.body;
  const objectReviewData = await updateFireShield({
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/fire_shield/`, async (req, res) => {
  const objectReviewData = await deleteFireShield(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
