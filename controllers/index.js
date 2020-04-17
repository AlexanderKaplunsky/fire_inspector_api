const express = require('express'),
  router = express.Router();

const reviewObjects = require('./reviewObjects');
const personal = require('./personal');
const incidents = require('./incidents');
const fireShield = require('./fireShield');
const extinguishers = require('./extinguishers');
const documents = require('./documents');
const automatic_extinguishing = require('./automatic_extinguishing');

router.use(reviewObjects);
router.use(personal);
router.use(incidents);
router.use(fireShield);
router.use(extinguishers);
router.use(documents);
router.use(automatic_extinguishing);

module.exports = router;
