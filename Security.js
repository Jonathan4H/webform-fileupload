const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');

const app = express();
const upload = multer({ dest: 'uploads/' });

const dbConfig = {
    host: 'db_host',
    user: 'db_user',
    password: 'db_password',
    database: 'db_name'
};

app.use(express.static('public')); // Assuming WebForm-FileUpload.html is in the 'public' folder

app.post('/submit', upload.single('file'), async (req, res) => {
    const { email } = req.body;

    // Validating email
    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    // Storing the uploaded file path in the database
    const filePath = req.file ? req.file.path : null;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute('INSERT INTO files (email, file_path) VALUES (?, ?)', [email, filePath]);
        connection.end();
        
        return res.status(200).send('File uploaded successfully');
    } catch (error) {
        return res.status(500).send('An error occurred');
    }
});