var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

// Rota para obter todos os produtos
router.get('/', productController.getProducts);

// Rota para mostrar o formulário de adicionar novo produto
router.get('/new', (req, res) => {
    res.render('products/form', { title: 'Adicionar Produto', action: '/products', product: null });
});

// Rota para adicionar um novo produto
router.post('/', productController.addProduct);

// Rota para mostrar o formulário de editar produto existente
router.get('/edit/:id', productController.getProductForEdit);

// Rota para atualizar um produto existente
router.post('/edit/:id', productController.updateProduct);

// Rota para deletar um produto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
