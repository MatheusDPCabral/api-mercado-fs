const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/products';

// Função para obter todos os produtos
exports.getProducts = (req, res) => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            res.render('products/products', { title: 'Lista de Produtos', products: data });
        })
        .catch(error => {
            console.error('Erro ao obter os produtos:', error);
            res.status(500).send('Erro ao obter os produtos');
        });
};

// Função para adicionar um novo produto
exports.addProduct = (req, res) => {
    const product = req.body;
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        res.redirect('/products');
    })
    .catch(error => {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto');
    });
};

// Função para mostrar o formulário de editar produto existente
exports.getProductForEdit = (req, res) => {
    const id = req.params.id;
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
            res.render('products/form', { title: 'Editar Produto', action: `/products/edit/${id}`, product: data });
        })
        .catch(error => {
            console.error('Erro ao obter o produto:', error);
            res.status(500).send('Erro ao obter o produto');
        });
};

// Função para atualizar um produto existente
exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const product = req.body;
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        res.redirect('/products');
    })
    .catch(error => {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).send('Erro ao atualizar produto');
    });
};

// Função para deletar um produto
exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        res.status(200).send('Produto deletado com sucesso');
    })
    .catch(error => {
        console.error('Erro ao deletar produto:', error);
        res.status(500).send('Erro ao deletar produto');
    });
};
