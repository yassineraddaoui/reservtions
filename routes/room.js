const express = require("express");
const roomController = require("../controllers/room");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/new/uploads/" });
const loggedInAs = require('../middleware/roleCheck')


router.get('/', roomController.getAllRooms);

router.get('/add',loggedInAs('admin') ,roomController.getAddRoomForm);

router.post('/available',loggedInAs('user') ,roomController.getAvailableRooms);

router.get('/hours/:roomNumber/:date', roomController.getRoomAvailbleHours);


router.get('/:roomNumber', roomController.getRoomByRoomNumber);


router.get('/id/:id', roomController.getRoomById);

router.post('/',upload.single('roomImage') ,loggedInAs('admin'),roomController.createRoom);

router.patch('/:roomNumber', loggedInAs('admin'),roomController.updateRoom);

router.delete('/:roomNumber', loggedInAs('admin'),roomController.deleteRoom);

module.exports = router;
