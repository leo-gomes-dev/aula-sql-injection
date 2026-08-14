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

*Resultado:* O sistema exibirá uma mensagem de sucesso e concederá acesso de administrador, ignorando completamente a senha digitada.

---

## 🔍 Entendendo a Anatomia do Ataque (O Segredo das Aspas)

Por que o comando `admin' OR '1'='1` consegue enganar o banco de dados? O segredo não está em uma falha do banco em si, mas na forma como o código vulnerável monta a consulta unindo texto e comandos (concatenação).

### 1. O Código do Programador
O desenvolvedor cria a linha de consulta esperando que o texto digitado pelo usuário fique isolado dentro de duas aspas simples automáticas:
```sql
SELECT * FROM usuarios WHERE login = ' [TEXTO_DO_USUARIO] ' AND senha = '[SENHA]';
```

### 2. A Injeção de Código
Quando você digita `admin' OR '1'='1`, a sua aspa simples solitária **quebra a string original ao meio**. O banco de dados reconstrói a query fundindo o seu texto ao código, gerando isto:
```sql
SELECT * FROM usuarios WHERE login = 'admin' OR '1'='1' AND senha = '123';
```

### 3. A Lógica Analisada pelo Banco (Álgebra Booleana)
O banco de dados lê as aspas em pares e reconstrói as condições matemáticas da seguinte forma:
* **`'admin'`**: A primeira aspa do sistema se fechou com a aspa que você digitou. O banco entende que você está buscando um usuário chamado "admin".
* **`OR`**: O operador lógico "OU" é ativado.
* **`'1'='1'`**: A aspa que você digitou antes do primeiro número 1 se fecha com a aspa final que já estava programada no código original. O banco avalia a expression matemática: *"O texto '1' é igual ao texto '1'?"*.

Como `'1'='1'` é **sempre VERDADEIRO (True)**, e o operador utilizado foi o `OR`, a regra matemática dita que a linha inteira é considerada verdadeira. O banco de dados ignora o restante da checagem de senha e retorna o primeiro registro da tabela (o Administrador).

---

## 4. Testando o Ambiente Seguro 🛡️
Para parar o servidor atual, pressione `Ctrl + C` no terminal. Em seguida, inicie o servidor protegido:
```bash
npm run seguro
```
Acesse novamente: `http://localhost:3000`

**🧪 O Teste de Defesa:**
Tente realizar o mesmo ataque anterior (`admin' OR '1'='1`).

*Resultado:* O sistema recusará o acesso com segurança. O servidor seguro utiliza **Prepared Statements (Interrogações `?`)**, o que força o banco de dados a tratar o texto injetado estritamente como um texto literal (uma string pura), e não como uma ordem executável. O banco procurará um usuário cujo nome seja literalmente `admin' OR '1'='1` e falhará com segurança.

---

## 📚 O que este projeto ensina?
1. **Nunca confie na entrada do usuário:** Dados recebidos de formulários devem ser tratados com desconfiança extrema.
2. **Evite concatenação de strings:** Juntar textos com `+` ou variáveis diretas para montar comandos SQL abre brechas de segurança graves.
3. **Use parâmetros homologados:** O uso de marcadores parametrizados (`?`) tranca o formato estrutural da consulta, impedindo que aspas do usuário alterem a lógica do sistema.
