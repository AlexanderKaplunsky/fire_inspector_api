const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createIncidents,
  readIncidents,
  updateIncidents,
  deleteIncidents,
} = require('../models/incidents');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/incidents/`, async (req, res) => {
  console.log(req.body);
  const {
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  } = req.body;
  const objectReviewData = await createIncidents({
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/incidents/`, async (req, res) => {
  const objectReviewData = await readIncidents();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/incidents/`, async (req, res) => {
  const {
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  } = req.body;
  const objectReviewData = await updateIncidents({
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/incidents/`, async (req, res) => {
  const objectReviewData = await deleteIncidents(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
