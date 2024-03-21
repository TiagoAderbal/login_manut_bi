document.getElementById('loginButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Login bem-sucedido!');
        } else {
            const span = document.querySelector('.span');
            span.style.display = 'inline-block';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
});
