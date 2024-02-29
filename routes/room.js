const express = require("express");
const roomController = require("../controllers/room");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/new/uploads/" });
const isAdmin = require('../middleware/roleCheck')
const isLoggedIn = require('../middleware/jwtcheck')


router.get('/', roomController.getAllRooms);

router.get('/add',isAdmin('admin') ,roomController.getAddRoomForm);

router.post('/available',isLoggedIn ,roomController.getAvailableRooms);

router.get('/hours/:roomNumber/:date', roomController.getRoomAvailbleHours);


router.get('/:roomNumber', roomController.getRoomByRoomNumber);


router.get('/id/:id', roomController.getRoomById);

router.post('/',upload.single('roomImage') ,isAdmin,roomController.createRoom);

router.patch('/:roomNumber', isAdmin,roomController.updateRoom);

router.delete('/:roomNumber', isAdmin,roomController.deleteRoom);

module.exports = router;
