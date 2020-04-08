const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createExtinguishers,
  readExtinguishers,
  updateExtinguishers,
  deleteExtinguishers,
} = require('../models/reviewObjects');

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
  const objectReviewData = await createExtinguishers({
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/extinguishers/`, async (req, res) => {
  const objectReviewData = await readExtinguishers();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/extinguishers/`, async (req, res) => {
  const {
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  } = req.body;
  const objectReviewData = await updateExtinguishers({
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/extinguishers/`, async (req, res) => {
  const objectReviewData = await deleteExtinguishers(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
