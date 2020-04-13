const express = require('express'),
  router = express.Router();

const { BASE } = require('../config/env');
const {
  createDocuments,
  readDocuments,
  updateDocuments,
  deleteDocuments,
} = require('../models/reviewObjects');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post(`${BASE}/documents/`, async (req, res) => {
  const {
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  } = req.body;
  const objectReviewData = await createDocuments({
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  });
  res.send(objectReviewData);
});

router.get(`${BASE}/documents/`, async (req, res) => {
  const objectReviewData = await readDocuments();
  res.send(objectReviewData).status(200);
});

router.put(`${BASE}/documents/`, async (req, res) => {
  const {
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  } = req.body;
  const objectReviewData = await updateDocuments({
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  });
  res.send(objectReviewData).status(200);
});

router.delete(`${BASE}/documents/`, async (req, res) => {
  const objectReviewData = await deleteDocuments(req.body);
  res.send(objectReviewData).status(200);
});

module.exports = router;
