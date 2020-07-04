const express = require('express')
const handlebars = require('express-handlebars');
const { response } = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//porta escolhida para rodar aplicação
const port = 5000

const app = express()
app.set('view engine', 'hbs')

app.engine('hbs',handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    defaultLayout: '404',
    partialsDir: `${__dirname}/views/partials`,
}))

app.use(
    express.static(path.join(__dirname, 'public/')),
    express.static(path.join(__dirname, 'public/image/'))
);

//rotas
app.get('/', (req, res) => {
  
  res.render('main',{data:data.slice(0,3)})
});

app.use(function (req, res, next) {
  res.status(404).render('pets',{layout:'404'})
})

var data = {};
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://cultura.ouropreto.mg.gov.br/api/noticias-all');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    data = JSON.parse(ourRequest.responseText);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

//roda servidor
app.listen(port,()=>console.log(`App rodando na porta ${port}`)) 
