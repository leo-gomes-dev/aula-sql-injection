const express = require('express');
const path = require('path');
const db = require('../database/db'); // Importa a conexão do banco de dados

const router = express.Router();

// Rota para abrir o site direto no navegador
router.get('/', (req, res) => {
    // Usamos ../../ para subir duas pastas e encontrar a pasta public corretamente
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

// Rota de login de forma segura
router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    const querySegura = "SELECT * FROM usuarios WHERE nome_usuario = ? AND senha = ?";

    db.get(querySegura, [usuario, senha], (err, row) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro no banco de dados." });
        }
        if (row) {
            res.json({ mensagem: `Sucesso! Logado como: ${row.nome_usuario}` });
        } else {
            res.status(401).json({ mensagem: "Usuário ou senha incorretos." });
        }
    });
});

module.exports = router;
