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
  console.log(req.body);
  const {
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  } = req.body;
  const objectReviewData = await createPersonal({
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/personal/`, async (req, res) => {
  const objectReviewData = await readPersonal();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/personal/`, async (req, res) => {
  const {
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  } = req.body;
  const objectReviewData = await updatePersonal({
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/personal/`, async (req, res) => {
  const objectReviewData = await deletePersonal(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
