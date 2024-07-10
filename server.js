const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/checkout', (req, res) => {
    const { name, address, payment, cart } = req.body;
    const sql = 'INSERT INTO orders (name, address, payment, cart) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, payment, JSON.stringify(cart)], (err, result) => {
        if (err) throw err;
        res.send('Order placed successfully');
    });
});

app.listen(5500, () => {
    console.log('Server running on port 5500');
});
