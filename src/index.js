const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');

const app = express();
require('./database');
require('./config/passport');

app.set('port', process.env.PORT || 3000);
//set handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
      rating: function(correct, uncorrect) {
        const number = correct + uncorrect;
        if (number === 0) {
          return 0;
        } else {
          return Math.floor((correct / number) * 100);
        }
      },
      total: function(correct, uncorrect) {
        const number = correct + uncorrect;
        return number;
      }
    }
  })
);
app.set('view engine', '.hbs');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  // res.locals.user = req.user || null;
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));
app.use(require('./routes/rules'));
app.use(require('./routes/quiz'));
app.use(require('./routes/instruction'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//server is listening

app.listen(app.get('port'), () => {
  console.log('Server is running');
});
