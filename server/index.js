import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Allow the methods you're using
    credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
app.use(cookieParser());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth'
})
// Bcrypt hashing function
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};
app.post('/register', async (req, res) => {
    const sql = 'INSERT INTO login (name, email, password) VALUES (?,?,?)'
    const hashedPassword = await hashPassword(req.body.password)
    const values = [
        req.body.name,
        req.body.email,
        hashedPassword
    ]
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('User registration successful', values);
            res.status(200).json({ message: 'User registered successfully' });
        }
    })
})
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: 'login error in server' });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, passwordMatch) => {
                if (err) return res.json({ Error: 'password compare error' });
                if (passwordMatch) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, 'jwt-secret-key', { expiresIn: '1d' });
                    return res.json({ Status: "success", token });
                } else {
                    return res.json({ Error: 'password not match' });
                }
            });
        } else {
            return res.json({ Error: 'No email existed' });
        }
    });
});
app.post('/logout', (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(3000, () => console.log('port listening on 3000'))