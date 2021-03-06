const co = require('co'),
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressValidator = require('express-validator'),
  cors = require('cors'),
  useragent = require('express-useragent'),
  app = express();

const customerService = require('./libs/customerService');

const mobileViewRouter = require('./routes/mobileViewRouter'),
  entryRouter = require('./routes/entryRouter'),
  productRouter = require('./routes/productRouter'),
  accumulationRouter = require('./routes/accumulationRouter'),
  redemptionRouter = require('./routes/redemptionRouter'),
  addressRouter = require('./routes/addressRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(expressValidator());
app.use(cookieParser());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(`/`, express.static(path.join(__dirname, '/public')));

app.use(`/m`, mobileViewRouter);
app.use(`/s.do`, entryRouter);
app.use(`/product`, productRouter);
app.use(`/accumulation`, accumulationRouter);
app.use(`/redemption`, redemptionRouter);
app.use(`/address`, addressRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 80;

const http = require('http').Server(app);

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

