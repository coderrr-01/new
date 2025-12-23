// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysql1',
//     database: 'credentialdb'
// });

// db.connect((err) => {
//     if (err) {
//         console.log('DB connection failed: ', err);

//     } else {
//         console.log('MYSQL connected');

//     }
// });

// module.exports = db;

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
