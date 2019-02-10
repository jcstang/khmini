const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// instead of node modules, it goes to a specific path.
const imgRouter = require('./src/routes/imgRoutes')(nav);
const aboutRouter = require('./src/routes/aboutRoutes')(nav);

app.use('/imgs', imgRouter);
app.use('/about', aboutRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'K&H Miniature Herefords'
    }
  );
});
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});