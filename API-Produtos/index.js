

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
                {name: 'Negresco', price: 2.5},
                {name: 'Café', price: 11.50},
                {name: 'Composto Lácteo NINHO Instantâneo Forti+ Lata 380g', price: 12.90},
            ]
        }
    );
})

console.log(`App listening on port ${port}!`)
app.listen(port)