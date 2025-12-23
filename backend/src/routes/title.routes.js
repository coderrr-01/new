const express = require('express');
const router = express.Router();
const titleController = require('../controllers/title.controller');

router.post('/add', titleController.createTitle);
router.get('/titles', titleController.getTitles);
router.put('/titles/:id', titleController.updateTitle);
router.delete('/titles/:id', titleController.deleteTitle);

module.exports = router;
