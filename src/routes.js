'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/', controllers.app.home);
router.get('/healthcheck', controllers.app.healthcheck);

router.use(controllers.app.err404);
router.use(controllers.app.err500);

module.exports = router;
