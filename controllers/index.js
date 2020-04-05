const express = require('express'),
    router = express.Router();

const reviewObjects = require('./rewiewObjects');

router.use(reviewObjects);

module.exports = router;
