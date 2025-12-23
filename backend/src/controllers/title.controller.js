const prisma = require('../models/prisma.client');

// Create a new title
exports.createTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const newTitle = await prisma.title.create({ data: { title } });
    res.json({ message: 'Title added successfully', newTitle });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all titles
exports.getTitles = async (req, res) => {
  try {
    const titles = await prisma.title.findMany();
    res.json(titles);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a title
exports.updateTitle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    const updated = await prisma.title.update({
      where: { id },
      data: { title }
    });
    res.json({ message: 'Title updated successfully', updated });
  } catch (err) {
    res.status(404).json({ message: 'Title not found' });
  }
};

// Delete a title
exports.deleteTitle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.title.delete({ where: { id } });
    res.json({ message: 'Title deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Title not found' });
  }
};
