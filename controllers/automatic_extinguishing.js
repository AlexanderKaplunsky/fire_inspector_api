const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createAutomaticExtinguishing,
  readAutomaticExtinguishing,
  updateAutomaticExtinguishing,
  deleteAutomaticExtinguishing,
} = require('../models/automatic_extinguishing');

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
  await createAutomaticExtinguishing({
    extinguishing_type,
    certification_authority,
    area,
    installer,
  });
  const updatedData = await readAutomaticExtinguishing();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/automatic_extinguishing/`, async (req, res) => {
  const automaticExtinguishingData = await readAutomaticExtinguishing();
  res.send(automaticExtinguishingData).status(200);
});

router.put(`${BASE}/automatic_extinguishing/`, async (req, res) => {
  const {
    extinguishing_type,
    certification_authority,
    area,
    installer,
  } = req.body;
  await updateAutomaticExtinguishing({
    extinguishing_type,
    certification_authority,
    area,
    installer,
  });
  const updatedData = await readAutomaticExtinguishing();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_automatic_extinguishing/`, async (req, res) => {
  await deleteAutomaticExtinguishing(req.body);
  const updatedData = await readAutomaticExtinguishing();
  res.send(updatedData).status(200);
});

module.exports = router;
