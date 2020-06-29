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
    partialsDir: `${__dirname}/views/partials`
}))

app.use(
    express.static(path.join(__dirname, 'public'))
);

//define a rota básica
app.get('/', (req, res) => {
    res.render('main',{layout: 'index'})
});

app.get('/pet',(req,ras)=>{
    res.render('pet',{layout:'index'})
})

//erro 404
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

//roda servidor
app.listen(port,()=>console.log(`App rodando na porta ${port}`)) 