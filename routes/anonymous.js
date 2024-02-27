const express = require("express");
const anonymousCtrl = require("../controllers/anonymous");
const router = express.Router();
router.get('/rooms', anonymousCtrl.getRooms);
module.exports = router;
