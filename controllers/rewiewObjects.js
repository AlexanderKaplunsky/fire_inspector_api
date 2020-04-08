const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createObjectReview,
  readObjectReview,
  updateObjectReview,
  deleteObjectReview,
} = require('../models/reviewObjects');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/object_review/`, async (req, res) => {
  console.log(req.body);
  const {
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
  } = req.body;
  const objectReviewData = await createObjectReview({
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/object_review/`, async (req, res) => {
  const objectReviewData = await readObjectReview();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/object_review/`, async (req, res) => {
  const {
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
  } = req.body;
  const objectReviewData = await updateObjectReview({
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/object_review/`, async (req, res) => {
  const objectReviewData = await deleteObjectReview(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
