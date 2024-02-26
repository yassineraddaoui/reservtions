const express = require("express");
const roomController = require("../controllers/room");
const rolecheck=require('../middleware/roleCheck')
const router = express.Router();

router.get('/', roomController.getAllRooms);

router.get('/:roomNumber', roomController.getRoomById);

router.post('/', roomController.createRoom);

router.patch('/:roomNumber', roomController.updateRoom);

router.delete('/:roomNumber', roomController.deleteRoom);

module.exports = router;
