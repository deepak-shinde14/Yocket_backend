const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Game data
router.get('/cities', gameController.getCities);
router.get('/vehicles', gameController.getVehicles);

// Game actions
router.post('/start', gameController.startGame);
router.post('/check', gameController.checkCapture);

module.exports = router;