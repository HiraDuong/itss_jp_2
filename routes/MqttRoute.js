const router = require('express').Router();
const path = require('path');
const MqttController = require('../controller/MqttController');
router.post('/mqtt', MqttController.sendmessage);
router.get('/mqtt', MqttController.testmessage);

module.exports = router;