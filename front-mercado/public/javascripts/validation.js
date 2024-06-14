// Inicializando componentes do Materialize
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

// Adicionando validação ao formulário
document.getElementById('productForm').addEventListener('submit', function(event) {
    var price = document.getElementById('price').value;
    var stock = document.getElementById('stock').value;
    if (price <= 0) {
        event.preventDefault();
        alert('O preço deve ser maior que zero.');
    }
});
