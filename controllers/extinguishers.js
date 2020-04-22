const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createExtinguishers,
  readExtinguishers,
  updateExtinguishers,
  deleteExtinguishers,
} = require('../models/extinguishers');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/extinguishers/`, async (req, res) => {
  const {
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  } = req.body;
  await createExtinguishers({
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  });
  const updatedData = await readExtinguishers();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/extinguishers/`, async (req, res) => {
  const extinguishersData = await readExtinguishers();
  res.send(extinguishersData).status(200);
});

router.post(`${BASE}/search_extinguishers/`, async (req, res) => {
  const automaticExtinguishingData = await readExtinguishers(req.body);
  res.send(automaticExtinguishingData).status(200);
});

router.put(`${BASE}/extinguishers/`, async (req, res) => {
  const {
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  } = req.body;
  await updateExtinguishers({
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  });
  const updatedData = await readExtinguishers();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_extinguishers/`, async (req, res) => {
  await deleteExtinguishers(req.body);
  const updatedData = await readExtinguishers();
  res.send(updatedData).status(200);
});

module.exports = router;
