const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Simulação de um banco de dados de usuários
const usersDB = [
  { email: 'mario@gmail.com', password: '$2a$10$iqfO2/WHv9e3CZGQGHxpiufjTFdxSMImdUZzAvvh.HfXC6OGyOUaS' }, // senha: novaroma
  { email: 'vini@gmail.com', password: '$2a$10$tShq2hZ.Jq16Sm4jJ/7pWue1.G1ndFpwyeyfPAVv/FzsL3oIGJbt2' }, // senha: novaroma
  // Adicione mais usuários conforme necessário
];

// Rota para processar o login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar se o e-mail está no formato correto
  if (!email || !email.endsWith('@gmail.com')) {
    return res.status(400).send('E-mail inválido');
  }

  // Procurar o usuário no banco de dados
  const user = usersDB.find(user => user.email === email);

  // Verificar se o usuário foi encontrado e se a senha está correta
  if (user && bcrypt.compareSync(password, user.password)) {
    // Definir uma variável de sessão para indicar que o usuário está autenticado
    req.session.authenticated = true;
    res.redirect('/products'); // Redirecionar para a página de produtos após o login
  } else {
    res.status(401).send('Credenciais inválidas');
  }
});

module.exports = router;
