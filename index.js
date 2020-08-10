const  express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const helhandle = require('handlebars-helpers')('comparison');
const session = require('express-session');
const base = require('./routes/base');
const index = require('./routes/index');
const getData = require('./routes/getData');
const simulator = require('./routes/simulator');
const auth = require('./routes/auth');
const cabinet = require('./routes/cabinet')
const theory = require('./routes/theory')
const middlevare = require('./middleware/session');


let app = express();

//Конфигурируем handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

//регистрируем этот движок в express
app.engine('hbs', hbs.engine)
//используем движок
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
}))
app.use(middlevare);

app.use(base);
app.use(index);
app.use(simulator);
app.use('/data/', getData);
app.use('/auth/', auth);
app.use(cabinet);
app.use(theory);

function start(){
    mongoose.connect("mongodb://localhost:27017/trainRussia", { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
        if(err) throw err;
    });
    app.listen(8000);
    console.log('Приложение запущено ssss!')
}

start();


