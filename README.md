# 🎓 Laboratório de Estudos: SQL Injection com Node.js e SQLite

Este projeto foi desenvolvido como um ambiente controlado de testes para entender na prática como funciona uma vulnerabilidade de **SQL Injection (Injeção de SQL)** e, mais importante, como corrigi-la utilizando boas práticas de desenvolvimento.

O projeto utiliza **Node.js**, **Express** e **SQLite** (banco de dados embutido em memória que roda localmente sem precisar de instalação complexa).

---

## 📁 Estrutura do Projeto

```text
aula-sql/
├── public/              # Arquivos que rodam no navegador do usuário
│   ├── css/             # Estilização da interface de login
│   ├── script/          # Lógica de envio do formulário (Fetch API)
│   └── index.html       # Formulário visual de login
├── server_vulneravel.js # Servidor que demonstra a falha de segurança
├── server_seguro.js     # Servidor corrigido com Prepared Statements
└── package.json         # Dependências e atalhos de execução
```

---

## 🚀 Como Rodar o Projeto na sua Máquina

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org) instalado no seu computador.

### 2. Instalação das Dependências
Abra o terminal na pasta do projeto e instale o Express e o driver do SQLite:
```bash
npm install
```

### 3. Testando o Ambiente Vulnerável ❌
Para ligar o servidor que aceita ataques de injeção de código, execute:
```bash
npm run vulneravel
```
Acesse no seu navegador: `http://localhost:3000`

**🧪 O Teste de Invasão:**
Insira os seguintes dados no formulário de login para burlar o sistema de senha:
* **Usuário:** `admin' OR '1'='1`
* **Senha:** *Qualquer texto (ex: 123)*

*Resultado:* O sistema exibirá uma mensagem de sucesso, pois a aspa simples fecha a string antes da hora e a condição `OR '1'='1'` faz com que a validação seja sempre verdadeira, anulando a checagem da senha.

### 4. Testando o Ambiente Seguro 🛡️
Para parar o servidor atual, pressione `Ctrl + C` no terminal. Em seguida, inicie o servidor protegido:
```bash
npm run seguro
```
Acesse novamente: `http://localhost:3000`

**🧪 O Teste de Defesa:**
Tente realizar o mesmo ataque anterior (`admin' OR '1'='1`).

*Resultado:* O sistema recusará o acesso com segurança. O servidor seguro utiliza **Prepared Statements (Interrogações `?`)**, o que força o banco de dados a tratar o texto injetado estritamente como um texto literal, e não como uma ordem executável.

---

## 📚 O que este projeto ensina?
1. **Nunca confie na entrada do usuário:** Dados recebidos de formulários devem ser tratados com desconfiança.
2. **Evite concatenação de strings:** Juntar textos com `+` para montar comandos SQL abre brechas de segurança graves.
3. **Use parâmetros homologados:** O uso de marcadores (`?`) tranca o formato estrutural da consulta no banco de dados.
