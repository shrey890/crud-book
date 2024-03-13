import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app = express()
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})
app.use(express.json())
app.use(cors())
app.get('/', function (req, res) {
    res.json('hello from backend')
})
app.get('/books', function (req, res) {
    const q = 'SELECT * FROM books'
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.post('/books', (req, res) => {
    const { title, desc, cover, price } = req.body;
    if (!title || !desc || !cover || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const q = 'INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?, ?, ?, ?)';
    const values = [title, desc, price, cover]
    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to add book' });
        }
        return res.json('Book created successfully');
    });
});
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) throw err
        return res.json('book deleted successfully')
    })
});
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title`=? , `desc`=?,`price`=?,`cover`=? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) throw err
        return res.json('book has been updated successfully')
    })
});
app.listen(8800, () => console.log('listening on 8800'))