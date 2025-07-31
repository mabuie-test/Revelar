const express = require('express');
const router = express.Router();
const deviceDataController = require('../controllers/deviceDataController');

// POST /api/data - Receber dados do dispositivo
router.post('/', deviceDataController.createDeviceData);

// GET /api/data - Obter todos os dados
router.get('/', deviceDataController.getAllDeviceData);

module.exports = router;
