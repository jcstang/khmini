const express = require('express');
const debug = require('debug')('app:aboutRoutes');
const bodyParser = require("body-parser");

const aboutRouter = express.Router();

function router() {
  aboutRouter.route('/')
    .get((req, res) => {
      res.render(
        'about',
        {
          nav,
          title: 'About Page',
        }
      );    
    });

  return aboutRouter;
};


// export function
module.exports = router;