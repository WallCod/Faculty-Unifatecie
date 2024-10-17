var http = require('http');
var fs = require('fs');

http.createServer(function (req, servico) {
fs.appendFile('texto.txt', '\nExemplo de arquivo de dados.\n', function (err){
if (err) throw err;
console.log('Arquivo gerado com sucesso.');
});
fs.readFile('texto.txt', function(err, data) {
servico.writeHead(200, {'Content-Type': 'text/html'});
servico.write(data);
});
fs.appendFile('texto.txt', '\nNovo conteúdo adicionado.\n', function (err) {
if (err) throw err;
console.log('Conteúdo adicionado.');
});
fs.readFile('texto.txt', function(err, data) {
servico.writeHead(200, {'Content-Type': 'text/html'});
servico.write(data);
});
fs.writeFile('texto.txt', '\nNovo texto.\n', function(err) {
if(err) throw err
;
console.log('Alterações realizadas.');
});
fs.readFile('texto.txt', function
(err, data) {servico.writeHead(200, {'Content-Type': 'text/html'});
servico.write(data);
return servico.end();
});
}).listen(8080);