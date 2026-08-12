require('dotenv').config(); 
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Configura a pasta public
app.use(express.static(path.join(__dirname, '..', 'public')));

// 🧠 ESCOLHA AUTOMÁTICA: Olha o .env para saber qual modo carregar
const rotasSeguras = require('./routes/auth');
const rotasVulneraveis = require('./routes/auth_vulneravel');

if (process.env.SQL_MODE === 'vulneravel') {
    console.log("⚠️ ATENÇÃO: Rodando em modo VULNERÁVEL!");
    app.use('/', rotasVulneraveis);
} else {
    console.log("🛡️ SEGURANÇA: Rodando em modo SEGURO!");
    app.use('/', rotasSeguras);
}

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => console.log(`Servidor rodando em http://localhost:${PORTA}`));
