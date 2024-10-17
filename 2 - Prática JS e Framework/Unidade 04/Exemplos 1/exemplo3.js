// Importando módulos
// http: Importa o módulo HTTP do Node.js, que permite criar um servidor web.
var http = require('http');
// dt: Importa o módulo personalizado biblioteca, que contém a função myDateTime.
var dt = require('./biblioteca');

// Criando o servidor
// http.createServer: Cria um servidor HTTP.
// function (req, res): Define uma função de callback para lidar com requisições e respostas.
http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'}): Define o cabeçalho da resposta HTTP com status 200 (OK) e o tipo de conteúdo como HTML.
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("Data e Hora atuais: " + dt.myDateTime() + "<br>"): Escreve a data e hora atuais no corpo da resposta, usando a função myDateTime.
    res.write("Data e Hora atuais: " + dt.myDateTime() + "<br>");
    // res.end('Teste de uso de biblioteca externa!'): Finaliza a resposta com a mensagem "Teste de uso de biblioteca externa!".
    res.end('Teste de uso de biblioteca externa!');
    // .listen(8080): Faz o servidor ouvir na porta 8080.
}).listen(8080);