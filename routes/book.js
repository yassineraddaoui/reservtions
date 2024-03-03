const express = require("express");
const bookCtrl = require("../controllers/book");
const router = express.Router();
const checkRole= require ('../middleware/roleCheck')
router.post('', checkRole('user')  ,bookCtrl.createBook);
router.get('', checkRole('user'), bookCtrl.showBookForm);
router.get('/confirm', checkRole('user'), bookCtrl.showConfirmForm);
router.get('/confirm/:confirmCode', checkRole('user'), bookCtrl.confirmBooking);
router.get('/user', checkRole('user'), bookCtrl.getUserBooks);
router.post('/cancel', checkRole('user'), bookCtrl.cancelReservation);
router.get('/cancel/:id', checkRole('user'), bookCtrl.confirmCancellation);

module.exports = router;
