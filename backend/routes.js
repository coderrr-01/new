const express = require('express');
const router = express.Router();
const db = require('./db.js');


router.post('/add', (req, resp) => {
    const { title } = req.body;
    const sql = 'INSERT INTO titles (title) VALUES(?)';

    db.query(sql, [title], (err, result) => {
        if (err) return resp.status(500).json(err);
        resp.json({ message: 'Title added successfully',  });
    });
});

router.get('/titles', (req, res) => {
    db.query('SELECT * FROM titles', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

    router.put('/titles/:id', (req, res) => {
    const { id } = req.params; 
    const { title } = req.body;

    const sql = 'UPDATE titles SET title = ? WHERE id = ?';

    db.query(sql, [title, id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Title not found' });
        }

        res.json({ message: 'Title updated successfully' });
    });
});


router.delete('/titles/:id', (req, res) => {
    const { id } = req.params; 
    const sql = 'DELETE FROM titles WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Title not found' });
        }

        res.json({ message: 'Title deleted successfully' });
    });
});



module.exports = router;