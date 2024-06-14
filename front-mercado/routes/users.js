// routes/users.js
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('database.db');

// Rota para obter todas as tarefas
router.get('/', (req, res) => {
    db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao obter as tarefas' });
        }
        res.json(rows);
    });
});

// Rota para criar uma nova tarefa
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
    }

    db.run('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao criar a tarefa' });
        }
        res.json({ message: 'Tarefa criada com sucesso', id: this.lastID });
    });
});

// Outras rotas para atualizar e deletar tarefas

module.exports = router;
