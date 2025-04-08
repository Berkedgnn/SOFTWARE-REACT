
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/booked', (req, res) => {
    db.query('SELECT seat_label FROM booked_seats', (err, results) => {
        if (err) return res.status(500).send(err);
        const seats = results.map(r => r.seat_label);
        res.json(seats);
    });
});


router.post('/book', (req, res) => {
    const seats = req.body.seats; 

    if (!Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ message: 'No seats provided.' });
    }

    const values = seats.map(seat => [seat]);

    db.query('INSERT INTO booked_seats (seat_label) VALUES ?', [values], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Seats booked successfully' });
    });
});

module.exports = router;
