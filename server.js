const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = {
    host: process.env.HOST, 
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, 
}

const criarBancoDeDados = async () => {
    const conexao = await mysql.createConnection({
        host: process.env.HOST, 
        user: process.env.USER, 
        password: process.env.PASSWORD, 
    });


    await conexao.execute("CREATE DATABASE IF NOT EXISTS db_teste_ntl");
    await conexao.end();
};

const criarTabela = async () =>{
    const conexao = await mysql.createConnection(db);
    const querySQL = `
        CREATE TABLE IF NOT EXISTS funcionarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            sobrenome VARCHAR(255) NOT NULL,
            idade INT NOT NULL,
            celular VARCHAR(20) NOT NULL,
            principal ENUM('sim', 'nao') NOT NULL,
            whatsapp ENUM('sim', 'nao') NOT NULL,
            email VARCHAR(255) NOT NULL,
            corporativo ENUM('sim', 'nao') NOT NULL
        );
    `;

    await conexao.execute(querySQL);
    await conexao.end();
}

app.post("/cadastrar", async (req, res) =>{
    const funcionario = req.body;

    try {
        const conexao = await mysql.createConnection(db);

        const query = 'INSERT INTO funcionarios (nome, sobrenome, idade, celular, principal, whatsapp, email, corporativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [funcionario.nome, funcionario.sobrenome, funcionario.idade, funcionario.celular, funcionario.principal, funcionario.whatsapp, funcionario.email, funcionario.corporativo];

        await conexao.execute(query, values);
        await conexao.end();

        return res.json({ message: "Funcionário cadastrado com sucesso!", funcionario });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro ao cadastrar funcionário.' });
    }

    
})

app.listen(3000, ()=> {
    criarBancoDeDados();
    criarTabela();
    console.log("Servidor Rodando na porta 3000");
})