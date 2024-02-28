const express = require("express");
const anonymousCtrl = require("../controllers/anonymous");
const router = express.Router();
router.get('/update-room', anonymousCtrl.getRooms);
router.post('/update-room', anonymousCtrl.getRooms);
module.exports = router;
