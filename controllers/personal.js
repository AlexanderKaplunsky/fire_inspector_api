const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createPersonal,
  readPersonal,
  updatePersonal,
  deletePersonal,
} = require('../models/personal');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/personal/`, async (req, res) => {
  const {
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  } = req.body;
  await createPersonal({
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  });
  const updatedData = await readPersonal();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/personal/`, async (req, res) => {
  const objectReviewData = await readPersonal();
  res.send(objectReviewData).status(200);
});

router.post(`${BASE}/search_personal/`, async (req, res) => {
  const automaticExtinguishingData = await readPersonal(req.body);
  res.send(automaticExtinguishingData).status(200);
});

router.put(`${BASE}/personal/`, async (req, res) => {
  const {
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  } = req.body;
  await updatePersonal({
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  });
  const updatedData = await readPersonal();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_personal/`, async (req, res) => {
  await deletePersonal(req.body);
  const updatedData = await readPersonal();
  res.send(updatedData).status(200);
});

module.exports = router;
