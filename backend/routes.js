const express = require('express');
const router = express.Router();
const prisma = require('./db.js');


router.post('/add', async (req, res) => {
  try {
    const { title } = req.body;

    const newTitle = await prisma.title.create({
      data: { title }
    });

    res.json({ message: 'Title added successfully', newTitle });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/titles', async (req, res) => {
  try {
    const titles = await prisma.title.findMany();
    res.json(titles);
  } catch (error) {
    console.error("ERROR FETCHING TITLES:", error);
  res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/titles/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    const updated = await prisma.title.update({
      where: { id },
      data: { title }
    });

    res.json({ message: 'Title updated successfully', updated });
  } catch (error) {
    res.status(404).json({ message: 'Title not found' });
  }
});



router.delete('/titles/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.title.delete({
      where: { id }
    });

    res.json({ message: 'Title deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Title not found' });
  }
});




module.exports = router;