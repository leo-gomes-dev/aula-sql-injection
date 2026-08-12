const express = require('express');
const path = require('path');
const db = require('../database/db'); // Importa o mesmo banco de dados

const router = express.Router();

// Rota para abrir o site
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

// Rota de login VULNERÁVEL
router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // ❌ MANTÉM A FALHA: Juntando os textos diretamente com "+"
    const queryInsegura = "SELECT * FROM usuarios WHERE nome_usuario = '" + usuario + "' AND senha = '" + senha + "'";
    
    console.log("Executando no banco (Vulnerável):", queryInsegura);

    db.get(queryInsegura, (err, row) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro no banco de dados: " + err.message });
        }
        if (row) {
            res.json({ mensagem: `Sucesso! Logado como: ${row.nome_usuario}` });
        } else {
            res.status(401).json({ mensagem: "Usuário ou senha incorretos." });
        }
    });
});

module.exports = router;
