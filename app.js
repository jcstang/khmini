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

const nav = [
  { link: '/about', title: 'About' },
  { link: '#', title: 'Contact' },
  { link: '#', title: 'Images' },
  { link: '#', title: 'Sign Up' },
  { link: '#', title: 'Login' }
];
const listOfImgs = [
  { link: 'https://source.unsplash.com/JVeSvSfzWSE', title: 'Img1'},
  { link: 'https://source.unsplash.com/uywhcKtg5SQ', title: 'Img2'},
  { link: 'https://source.unsplash.com/JPvpWFvaDQ8', title: 'Img3'},
  { link: 'https://source.unsplash.com/g3qrH9Mm93k', title: 'Img4'},
  { link: 'https://source.unsplash.com/87oQ_cUO1Ns', title: 'Img5'},
  { link: 'https://source.unsplash.com/b13VqWj-gmU', title: 'Img6'},
  { link: 'https://source.unsplash.com/va-wXGiYUao', title: 'Img7'},
  { link: 'https://source.unsplash.com/sai-x7brics', title: 'Img8'},
  { link: 'https://source.unsplash.com/rQ9QfnEEmrQ', title: 'Img9'}
];

// instead of node modules, it goes to a specific path.
const imgRouter = require('./src/routes/imgRoutes')(nav);
const aboutRouter = require('./src/routes/aboutRoutes')(nav);

app.use('/imgs', imgRouter);
app.use('/about', aboutRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      listOfImgs,
      title: 'KH Miniature Herefords'
    }
  );
});
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});