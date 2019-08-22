const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const app = express();
require('./database');

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

//routes
app.use(require('./routes'));
app.use(require('./routes/users'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//server is listening

app.listen(3000, () => {
  console.log('Server is running');
});
