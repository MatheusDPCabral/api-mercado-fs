var express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3");

//instanciando database
const db = new sqlite3.Database('./database/database.db');

//criando tabela
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT UNIQUE,
  telefone TEXT UNIQUE,
  senha TEXT
)`, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err.message);
    return;
  }
  console.log('Tabela criada com sucesso.');
});

//ROTAS

//Registrando um user(POST)
router.post('/register', (req, res) => {
  console.log(req.body)
  const { nome, email, telefone, senha } = req.body
  db.run('INSERT INTO users (nome, email, telefone, senha) VALUES(?,?,?,?)', [nome, email, telefone, senha]
    , (err) => {
      if (err) {
        console.log("Erro ao inserir dados", err);
        return res.status(500).send({ error: "Erro ao criar user" });
      } else {
        res.status(200).send({ message: "user criado com sucesso" });
      }
    });
});

//PESQUISA DE users(get)
router.get('/', function (req, res, next) {
  db.all('SELECT * FROM users', (err, users) => {
    if (err) {
      console.log("Aconteceu um erro", err);
      return res.status(500).send({ error: "Não encontrado" });
    } else {
      console.log("concluído");
      res.status(200).send(users);
    }
  });
});

//GET POR ID
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, users) => {
    if (err) {
      console.log("user não encontrado", err);
      return res.status(500).json({ error: "não foi possível encontrar user" });
    } if (!users) {
      return res.status(400).json({ error: "user não encontrado" });
    }
    res.status(200).json(users);
  });
});
//PUT
router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { nome, email, telefone, senha } = req.body;
  db.run('UPDATE users SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id = ?', [nome, email, telefone, senha, id], function (err) {
    if (err) {
      console.log("Erro ao atualizar user", err);
      return res.status(500).send({ error: "Ocorreu um erro" });
    } if (this.changes === 0) {
      res.status(404).json({ error: "user não encontrado" });
    } res.status(200).json({ message: "user atualizado com sucesso!" })
  });
});

//PATCH
router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.lenght === 0) {
    return res.status(400).json({ error: "nenhum campo fornecido para atualização" })
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');

  db.run(`UPDATE users SET ${setClause}  WHERE id = ?`, [...values, id], function (err) {
    if(err) {
      console.log("Erro ao atualiza user parcialmente", err);
      return res.status(500).json({ error: "Erro ao atualizar o user parcialmente" });
    }
    if(this.changes === 0) {
      return res.status(404).json({ error: "Usário não encontrado!" });
    } 
    res.status(200).json({ message: "Atualizado com sucesso" });
  });

  //DELETE
  router.delete('/:id', function(req, res, next){
    const {id} = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function(err){
      if(err){
        console.error("Erro ao deletar user",err);
        return res.status(500).json({error: "Erro ao deletar user"});
      }
      if(this.changes === 0){
        return res.status(404).json({error: "user não encontrado"});
      }
      res.status(200).json({message: "user deletado com sucesso!"});
    });
  });
})
module.exports = router;