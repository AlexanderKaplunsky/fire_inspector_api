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
  const {
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
    object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
  } = req.body;
  await createObjectReview({
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
    object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
  });
  const updatedData = await readObjectReview();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/object_review/`, async (req, res) => {
  const objectReviewData = await readObjectReview();
  res.send(objectReviewData).status(200);
});

router.post(`${BASE}/search_object_review/`, async (req, res) => {
  const automaticExtinguishingData = await readObjectReview(req.body);
  res.send(automaticExtinguishingData).status(200);
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
    object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
  } = req.body;
  await updateObjectReview({
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
    object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
  });
  const updatedData = await readObjectReview();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_object_review/`, async (req, res) => {
  await deleteObjectReview(req.body);
  const updatedData = await readObjectReview();
  res.send(updatedData).status(200);
});

module.exports = router;
