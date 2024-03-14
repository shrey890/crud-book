import express from "express"
import db from './db.js'
import cors from "cors";
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
// ! Add Task
app.post('/task', (req, res) => {
    try {
        const task = req.body.task
        if (!task || task.trim() === '') {
            return res.status(400).json({ error: 'task description is empty' })
        }
        const sql = 'INSERT INTO tasks (task) VALUES (?)'
        db.query(sql, [task], (err, result) => {
            if (err) {
                console.log('error adding task: ', err)
                return res.json(500).json({ error: 'failed to add task' })
            }
            console.log('task added successfully')
            res.json({ message: 'task added successfully', task })
        })
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
})
app.get('/task', (req, res) => {
    const sql = 'SELECT * FROM tasks '
    db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})
app.delete('/task/:id', (req, res) => {
    const taskID = req.params.id
    const sql = 'DELETE FROM tasks WHERE id = ?'
    db.query(sql, taskID, (err, result) => {
        if (err) throw err
        else res.json('task deleted')
    })
})
app.put('/task/:id', async (req, res) => {
    const id = req.params.id;
    const task = req.body.task; // Extract task data from req.body.task

    try {
        const query = 'UPDATE tasks SET task = ? WHERE id = ?'; // Use query instead of sql
        db.query(query, [task, id], (err, result) => {
            if (err) {
                console.error('Error updating task:', err);
                return res.status(500).json({ error: 'Failed to update task' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            console.log('Task updated successfully');
            res.json({ message: 'Task updated successfully' });
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => console.log('listening on port 3000'))