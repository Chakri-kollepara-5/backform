const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./database');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/submissions', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY rowid DESC', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error retrieving submissions.');
    }

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>📬 Submissions</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f2f4f8;
            margin: 0;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            color: #2b2d42;
            margin-bottom: 1rem;
          }
          .card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 1.5rem;
            margin: 1rem 0;
            width: 90%;
            max-width: 600px;
            transition: transform 0.2s ease-in-out;
          }
          .card:hover {
            transform: scale(1.02);
          }
          .name {
            font-weight: 600;
            font-size: 1.1rem;
            color: #1e1e1e;
          }
          .email {
            font-size: 0.9rem;
            color: #555;
            margin-bottom: 0.5rem;
          }
          .message {
            font-size: 1rem;
            color: #333;
          }
          .back {
            margin-top: 2rem;
            text-decoration: none;
            color: #fff;
            background: #0077cc;
            padding: 0.6rem 1.2rem;
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          .back:hover {
            background: #005fa3;
          }
        </style>
      </head>
      <body>
        <h1>📬 User Submissions</h1>
    `;

    if (rows.length === 0) {
      html += `<p>No submissions yet.</p>`;
    } else {
      rows.forEach(row => {
        html += `
          <div class="card">
            <div class="name">${row.name}</div>
            <div class="email">${row.email}</div>
            <div class="message">${row.message}</div>
          </div>
        `;
      });
    }

    html += `
        <a class="back" href="/">🔙 Back to Form</a>
      </body>
      </html>
    `;

    res.send(html);
  });
});


app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;

    db.run(sql, [name, email, message], function(err) {
        if (err) {
            console.error('❌ DB Insert Error:', err.message);
            return res.status(500).json({ success: false, error: 'DB error' });
        }


        res.status(200).json({
            success: true,
            data: {
                id: this.lastID,
                name,
                email,
                message,
                created_at: new Date().toISOString()
            }
        });
    });
});





app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
