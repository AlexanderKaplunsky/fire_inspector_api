const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createAutomaticExtinguishing,
  readAutomaticExtinguishing,
  updateAutomaticExtinguishing,
  deleteAutomaticExtinguishing,
} = require('../models/reviewObjects');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/automatic_extinguishing/`, async (req, res) => {
  const {
    extinguishing_type,
    certification_authority,
    area,
    installer,
  } = req.body;
  const objectReviewData = await createAutomaticExtinguishing({
    extinguishing_type,
    certification_authority,
    area,
    installer,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/automatic_extinguishing/`, async (req, res) => {
  const objectReviewData = await readAutomaticExtinguishing();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/automatic_extinguishing/`, async (req, res) => {
  const {
    extinguishing_type,
    certification_authority,
    area,
    installer,
  } = req.body;
  const objectReviewData = await updateAutomaticExtinguishing({
    extinguishing_type,
    certification_authority,
    area,
    installer,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/automatic_extinguishing/`, async (req, res) => {
  const objectReviewData = await deleteAutomaticExtinguishing(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
