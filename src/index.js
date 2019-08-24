const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();
require('./database');
require('./config/passport');

//set handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//server is listening

app.listen(3000, () => {
  console.log('Server is running');
});
