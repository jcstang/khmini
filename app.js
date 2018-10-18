const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '#', title: 'About' },
  { link: '#', title: 'Contact' },
  { link: '#', title: 'Sign Up' },
  { link: '#', title: 'Login' }
];
const listOfImgs = [
  { link: 'https://source.unsplash.com/JVeSvSfzWSE', title: 'Blah'},
  { link: 'https://source.unsplash.com/uywhcKtg5SQ', title: 'Blah'},
  { link: 'https://source.unsplash.com/JPvpWFvaDQ8', title: 'Blah'},
  { link: 'https://source.unsplash.com/g3qrH9Mm93k', title: 'Blah'},
  { link: 'https://source.unsplash.com/87oQ_cUO1Ns', title: 'Blah'},
  { link: 'https://source.unsplash.com/b13VqWj-gmU', title: 'Blah'},
  { link: 'https://source.unsplash.com/va-wXGiYUao', title: 'Blah'},
  { link: 'https://source.unsplash.com/sai-x7brics', title: 'Blah'},
  { link: 'https://source.unsplash.com/rQ9QfnEEmrQ', title: 'Blah'}
];

// instead of node modules, it goes to spec path
const imgRouter = require('./src/routes/imgRoutes')(nav);

app.use('/imgs', imgRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      listOfImgs,
      title: 'KH Miniture Herefords'
    }
  );
});
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
})
