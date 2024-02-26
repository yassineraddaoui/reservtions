const express = require("express");
const bookCtrl = require("../controllers/book");
const router = express.Router();

router.post('', bookCtrl.createBook);


module.exports = router;
