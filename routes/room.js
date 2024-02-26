const express = require("express");
const roomController = require("../controllers/room");
const router = express.Router();

router.get('/', roomController.getAllRooms);

router.post('/available',roomController.getAvailableRooms);

router.get('/:roomNumber', roomController.getRoomByRoomNumber);

router.get('/id/:id', roomController.getRoomById);

router.post('/', roomController.createRoom);

router.patch('/:roomNumber', roomController.updateRoom);

router.delete('/:roomNumber', roomController.deleteRoom);

module.exports = router;
