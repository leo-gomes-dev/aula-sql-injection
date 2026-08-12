const sqlite3 = require('sqlite3').verbose();

// Cria o banco de dados em memória
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE usuarios (id INTEGER, nome_usuario TEXT, senha TEXT)");
    db.run("INSERT INTO usuarios VALUES (1, 'admin', 'SenhaSuperSecreta123')");
});

// Exporta a conexão para que outros arquivos possam usar
module.exports = db;
