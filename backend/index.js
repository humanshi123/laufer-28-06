//const WebSocket = require('ws');
//const mysql = require('mysql2');
//require('dotenv').config();

// Create a MySQL connection
/*const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});
*/
console.log("Test")
// Create a WebSocket server
// const wss = new WebSocket.Server({ port: process.env.PORT });

// wss.on('connection', ws => {
//   console.log('New client connected');

//   // Handle incoming messages from clients
//   ws.on('message', message => {
//     const parsedMessage = JSON.parse(message);
//     const { action, payload } = parsedMessage;

//     if (action === 'getPricelist') {
//       db.query('SELECT * FROM pricelist', (err, results) => {
//         if (err) {
//           ws.send(JSON.stringify({ error: err.message }));
//           return;
//         }
//         ws.send(JSON.stringify({ action: 'pricelist', data: results }));
//       });
//     } else if (action === 'addKVA') {
//       const query = 'INSERT INTO KVA SET ?';
//       db.query(query, payload, (err, results) => {
//         if (err) {
//           ws.send(JSON.stringify({ error: err.message }));
//           return;
//         }
//         ws.send(JSON.stringify({ action: 'KVAAdded', data: results }));
//       });
//     } else {
//       ws.send(JSON.stringify({ error: 'Unknown action' }));
//     }
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// console.log('WebSocket server is running on ws://localhost:8080');
