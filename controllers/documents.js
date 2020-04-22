const express = require('express'),
  router = express.Router();
const { BASE } = require('../config/env');
const {
  createDocuments,
  readDocuments,
  updateDocuments,
  deleteDocuments,
} = require('../models/documents');

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
  await createDocuments({
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  });
  const updatedData = await readDocuments();
  res.send(updatedData).status(200);
});

router.get(`${BASE}/documents/`, async (req, res) => {
  const documentsData = await readDocuments();
  res.send(documentsData).status(200);
});

router.post(`${BASE}/search_documents/`, async (req, res) => {
  const automaticExtinguishingData = await readDocuments(req.body);
  res.send(automaticExtinguishingData).status(200);
});

router.put(`${BASE}/documents/`, async (req, res) => {
  const {
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  } = req.body;
  await updateDocuments({
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  });
  const updatedData = await readDocuments();
  res.send(updatedData).status(200);
});

router.post(`${BASE}/delete_documents/`, async (req, res) => {
  await deleteDocuments(req.body);
  const updatedData = await readDocuments();
  res.send(updatedData).status(200);
});

module.exports = router;
