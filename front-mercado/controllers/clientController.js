const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/clients';

// Função para obter todos os clientes
exports.getClients = (req, res) => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            res.render('clients/clients', { title: 'Lista de Clientes', clients: data });
        })
        .catch(error => {
            console.error('Erro ao obter os clientes:', error);
            res.status(500).send('Erro ao obter os clientes');
        });
};

// Função para adicionar um novo cliente
exports.addClient = (req, res) => {
    const client = req.body;
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
    .then(response => response.json())
    .then(data => {
        res.redirect('/clients');
    })
    .catch(error => {
        console.error('Erro ao adicionar cliente:', error);
        res.status(500).send('Erro ao adicionar cliente');
    });
};

// Função para mostrar o formulário de editar cliente existente
exports.getClientForEdit = (req, res) => {
    const id = req.params.id;
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
            res.render('clients/form', { title: 'Editar Cliente', action: `/clients/edit/${id}`, client: data });
        })
        .catch(error => {
            console.error('Erro ao obter o cliente:', error);
            res.status(500).send('Erro ao obter o cliente');
        });
};

// Função para atualizar um cliente existente
exports.updateClient = (req, res) => {
    const id = req.params.id;
    const client = req.body;
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
    .then(response => response.json())
    .then(data => {
        res.redirect('/clients');
    })
    .catch(error => {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).send('Erro ao atualizar cliente');
    });
};

// Função para deletar um cliente
exports.deleteClient = (req, res) => {
    const id = req.params.id;
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        res.status(200).send('Cliente deletado com sucesso');
    })
    .catch(error => {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).send('Erro ao deletar cliente');
    });
};
