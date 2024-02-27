const express = require("express");
const roomController = require("../controllers/room");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/', roomController.getAllRooms);

router.post('/available',roomController.getAvailableRooms);

router.get('/:roomNumber', roomController.getRoomByRoomNumber);

router.get('/id/:id', roomController.getRoomById);

router.post('/',upload.single('roomImage') ,roomController.createRoom);

router.patch('/:roomNumber', roomController.updateRoom);

router.delete('/:roomNumber', roomController.deleteRoom);

module.exports = router;
