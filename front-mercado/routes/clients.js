var express = require('express');
var router = express.Router();
var clientController = require('../controllers/clientController');

// Rota para obter todos os clientes
router.get('/', clientController.getClients);

// Rota para mostrar o formulário de adicionar novo cliente
router.get('/new', (req, res) => {
    res.render('clients/form', { title: 'Adicionar Produto', action: '/clients', client: null });
});

// Rota para adicionar um novo cliente
router.post('/', clientController.addClient);

// Rota para mostrar o formulário de editar cliente existente
router.get('/edit/:id', clientController.getClientForEdit);

// Rota para atualizar um cliente existente
router.post('/edit/:id', clientController.updateClient);

// Rota para deletar um cliente
router.delete('/:id', clientController.deleteClient);

module.exports = router;
