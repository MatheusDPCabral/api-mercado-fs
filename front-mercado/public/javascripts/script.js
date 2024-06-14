// Verificar se o código está sendo executado no ambiente do navegador antes de usar objetos do DOM
if (typeof document !== 'undefined') {
    // Função para adicionar um novo produto
    function addProduct() {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (price <= 0 || stock <= 0) {
            // Exibir SweetAlert de erro de validação
            swal({
                title: "Erro de Validação",
                text: "Por favor, preencha todos os campos corretamente. O preço e a quantidade devem ser maiores que zero.",
                icon: "error"
            });
            return;
        }

        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, stock })
        })
        .then(response => {
            if (response.ok) {
                // Exibir SweetAlert de sucesso
                swal({
                    title: "Produto Adicionado",
                    text: "O produto foi adicionado com sucesso",
                    icon: "success"
                }).then(() => {
                    // Redirecionar para a página de produtos após o alerta ser fechado
                    window.location.href = '/products';
                });
            } else {
                // Exibir SweetAlert de erro
                swal({
                    title: "Erro ao Adicionar Produto",
                    text: "Ocorreu um erro ao tentar adicionar o produto",
                    icon: "error"
                });
            }
        });
    }

    // Função para atualizar um produto existente
    function updateProduct(id) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (price <= 0 || stock <= 0) {
            // Exibir SweetAlert de erro de validação
            swal({
                title: "Erro de Validação",
                text: "Por favor, preencha todos os campos corretamente. O preço e a quantidade devem ser maiores que zero.",
                icon: "error"
            });
            return;
        }

        fetch(`/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, stock })
        })
        .then(response => {
            if (response.ok) {
                // Exibir SweetAlert de sucesso
                swal({
                    title: "Produto Atualizado",
                    text: "O produto foi atualizado com sucesso",
                    icon: "success"
                }).then(() => {
                    // Redirecionar para a página de produtos após o alerta ser fechado
                    window.location.href = '/products';
                });
            } else {
                // Exibir SweetAlert de erro
                swal({
                    title: "Erro ao Atualizar Produto",
                    text: "Ocorreu um erro ao tentar atualizar o produto",
                    icon: "error"
                });
            }
        });
    }

    // Função para deletar um produto
    function deleteProduct(id) {
        fetch(`/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Exibir SweetAlert de sucesso
                swal({
                    title: "Produto Deletado",
                    text: "O produto foi deletado com sucesso",
                    icon: "success"
                }).then(() => {
                    // Recarregar a página após o alerta ser fechado
                    window.location.reload();
                });
            } else {
                // Exibir SweetAlert de erro
                swal({
                    title: "Erro ao Deletar Produto",
                    text: "Ocorreu um erro ao tentar deletar o produto",
                    icon: "error"
                });
            }
        });
    }

    // Função para obter todos os produtos
    function getProducts() {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Exemplo de como usar os dados dos produtos recebidos
            })
            .catch(error => {
                console.error('Erro ao obter os produtos:', error);
            });
    }
}
