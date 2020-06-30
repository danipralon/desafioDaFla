//requisição ao express
const express = require('express')
const app = express()
//porta escolhida para rodar aplicação
const port = 5000
//requisição ao handlebars
const handlebars = require('express-handlebars');
const { response } = require('express');
const path = require('path');

app.use(express.static('views/image')); 
app.set('view engine', 'hbs')

app.engine('hbs',handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    defaultLayout: '404',
    partialsDir: `${__dirname}/views/partials`
}))

app.use(
    express.static(path.join(__dirname, 'public'))
);

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://cultura.ouropreto.mg.gov.br/api/noticias-all');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
    //console.log(data);
    //createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

/* function createHTML(newsData){
    var rawTemplate = document.getElementById("newsTemplate").innerHTML;
    var compiledtemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledtemplate(newsData);
    
    var newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = ourGeneratedHTML;
} 

  for (var i = 0; i < 4; i++) {
  
  }
*/


//define a rota básica
app.get('/', (req, res) => {
  res.render('main',{layout: 'index'})
});

//erro 404
app.use(function (req, res, next) {
  res.status(404).render('pets',{layout:'404'})
})

//roda servidor
app.listen(port,()=>console.log(`App rodando na porta ${port}`)) 
