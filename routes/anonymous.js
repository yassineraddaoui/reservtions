const express = require("express");
const anonymousCtrl = require("../controllers/anonymous");
const router = express.Router();

router.get('/index', anonymousCtrl.getIndex);
router.get('/', anonymousCtrl.getIndex);
router.get('/contact', anonymousCtrl.getContact);
router.get('/rooms', anonymousCtrl.getRooms);
router.get('/about', anonymousCtrl.getAbout);


module.exports = router;
