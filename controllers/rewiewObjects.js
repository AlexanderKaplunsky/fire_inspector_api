const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const { createObjectReview, readObjectReview } = require('../models/reviewObjects');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/create_object_review/`, async (req, res) => {
  console.log(req.body);
  
  const { object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status } = req.body;
  const objectReviewData = await createObjectReview(object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status);
  res.send('userData');
});

router.get(`${BASE}/create_object_review/`, async (req, res) => {
  console.log(req.body);
  const objectReviewData = await readObjectReview();
  res.send('ss').status(200)
});

module.exports = router;
