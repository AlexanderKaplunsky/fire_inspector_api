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
  await createIncidents({
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  });
  const updatedData = await readIncidents();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/incidents/`, async (req, res) => {
  const incidents = await readIncidents();
  res.send(incidents).status(200);
});

router.post(`${BASE}/search_incidents/`, async (req, res) => {
  const automaticExtinguishingData = await readIncidents(req.body);
  res.send(automaticExtinguishingData).status(200);
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
  await updateIncidents({
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  });
  const updatedData = await readIncidents();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_incidents/`, async (req, res) => {
  await deleteIncidents(req.body);
  const updatedData = await readIncidents();
  res.send(updatedData).status(200);
});

module.exports = router;
