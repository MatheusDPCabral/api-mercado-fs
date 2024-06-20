var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Importe o módulo express-session
var bcrypt = require('bcrypt'); // Importe o módulo bcrypt para hash de senha

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); // Importar o roteador de produtos

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do express-session
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Usar o roteador de produtos

// Lógica de autenticação
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Aqui você pode adicionar a lógica de autenticação
  if (email.endsWith('@gmail.com') && password === 'novaroma') {
    req.session.authenticated = true;
    res.redirect('/products');
  } else {
    res.redirect('/?error=invalid_credentials');
  }
});

// Rota para logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/'); // Redireciona para a página inicial após o logout
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
