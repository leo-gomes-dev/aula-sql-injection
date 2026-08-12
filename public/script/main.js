document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const resultadoDiv = document.getElementById('resultado');

    try {
        // Como o próprio servidor vai entregar a página, podemos usar apenas a rota '/login'
        const resposta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        });
        
        const dados = await resposta.json();
        resultadoDiv.style.display = 'block';
        resultadoDiv.textContent = dados.mensagem;
        resultadoDiv.style.backgroundColor = resposta.ok ? '#d4edda' : '#f8d7da';
        resultadoDiv.style.color = resposta.ok ? '#155724' : '#721c24';
    } catch (erro) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.textContent = 'Erro ao conectar ao servidor.';
        resultadoDiv.style.backgroundColor = '#f8d7da';
    }
});
