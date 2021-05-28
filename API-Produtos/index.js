

require('marko/node-require').install();
require('marko/express');


var express = require("express");
const app = express();
const port = 3000

var template = require("./views/mercado/lista/mercado.marko");
app.get('/', function (req, res) {
    res.marko(
        template,
        {
            list: [
                {name: 'Negresco', price: 2.5, img: 'https://www.nestle.com.br/images/default-source/produtos/negresco-biscoito-recheado.png?sfvrsn=5c342fe5_2', description: 'Bolacha recheada'},
                {name: 'Café', price: 11.50, img: 'https://static.clubeextra.com.br/img/uploads/1/841/12329841.png', description: 'Café suave'},
                {name: 'Composto Lácteo NINHO Instantâneo Forti+ Lata 380g', price: 12.90, img: 'https://cdn.ultrafarma.com.br/static/produtos/67678/large-637287079237664702-67678_2.jpg', description: 'Leite em pó'},
            ]
        }
    );
})

console.log(`App listening on port ${port}!`)
app.listen(port)
