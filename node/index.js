const express = require('express');
const app = express();
const port = 5000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");

    const sql = "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL auto_increment, name VARCHAR(255), PRIMARY KEY(id) )";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tabela Criada");
    });


    connection.query(`INSERT INTO people(name) values('André Silva')`, (err, res) => {
        if(err) throw err;
        console.log('OK INSERT');
      });
});

app.set('view engine', 'pug')

app.get('/', (req,res) => {
    
    const sql = `SELECT * FROM people WHERE id = 1`
    
    connection.query(sql, function(err, data, fields){
        if (err) throw err;
        res.render('index', { title: 'Desafio Full Cycle', message: 'Full Cycle Rocks!',userName:  Object.values(JSON.parse(JSON.stringify(data)))[0].name } )
    })
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})