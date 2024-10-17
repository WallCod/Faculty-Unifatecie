//Importações
var http = require('http');
var fs = require('fs');

// Criação do Servidor
//Cria um servidor HTTP que escuta requisições e responde com conteúdo.
http.createServer(function (req, servico) {
    //Manipulação de Arquivo - Primeira Operação appendFile
    //Adiciona o texto "Exemplo de arquivo de dados." ao arquivo texto.txt. Se o arquivo não existir, ele será criado.
    fs.appendFile('texto.txt', '\nExemplo de arquivo de dados.\n', 'utf-8', function (err) {
        if (err) throw err;
        console.log('Arquivo gerado com sucesso');
    });
    // Primeira operação readFile
    // Lê o conteúdo do arquivo texto.txt e escreve a resposta no navegador.
    fs.readFile('texto.txt', 'utf-8', function (err, data) {
        servico.writeHead(200, { 'Content-Type': 'text/html' });
        servico.write(data);
    });
    //Segunda operação appendFile
    // Adiciona "Novo conteúdo adicionado." ao arquivo texto.txt.
    fs.appendFile('texto.txt', '\nNovo conteúdo adicionado.\n', 'utf-8', function (err) {
        if (err) throw err;
        console.log('Conteudo adicionado');
    });
    // Segunda operação readFile
    // Lê novamente o conteúdo do arquivo e escreve na resposta.
    fs.readFile('texto.txt', 'utf-8', function (err, data) {
        servico.writeHead(200, { 'Content-Type': 'text/html' });
        servico.write(data);
    });
    // Operação writeFile
    //Substitui todo o conteúdo de texto.txt com "Novo texto.".
    fs.writeFile('texto.txt', '\nNovo texto.\n', 'utf-8', function (err) {
        if (err) throw err;
        console.log('Alterações realizadas');
    });
    // Terceira operação readFile
    // Lê o conteúdo atualizado do arquivo e finaliza a resposta ao navegador.
    fs.readFile('texto.txt', 'utf-8', function (err, data) {
        servico.writeHead(200, { 'Content-Type': 'text/html' });
        servico.write(data);
        return servico.end();
    });
    // Escutando na porta 8080
}).listen(8080);

// Este código cria um servidor HTTP que adiciona, lê e substitui conteúdo no arquivo texto.txt,
// respondendo com o conteúdo do arquivo em cada operação. Ao acessar http://localhost:8080,
// você verá as mudanças feitas no arquivo.





























//  Este é um script Node.js que cria um servidor HTTP e realiza operações com arquivos usando o módulo fs (File System).