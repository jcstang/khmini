const express = require('express');
const debug = require('debug')('app:imgRoutes');
const { MongoClient, ObjectID } = require('mongodb');
const bodyParser = require("body-parser");

const imgRouter = express.Router();

const listOfImages = [
  { link: 'https://source.unsplash.com/JVeSvSfzWSE', title: 'beach'},
  { link: 'https://source.unsplash.com/uywhcKtg5SQ', title: 'wet'},
  { link: 'https://source.unsplash.com/gUkGFLbN4us', title: 'strike'},
  { link: 'https://source.unsplash.com/g3qrH9Mm93k', title: 'green'},
  { link: 'https://source.unsplash.com/87oQ_cUO1Ns', title: 'fireworks'},
  { link: 'https://source.unsplash.com/b13VqWj-gmU', title: 'murica'},
  { link: 'https://source.unsplash.com/va-wXGiYUao', title: 'yellow'},
  { link: 'https://source.unsplash.com/sai-x7brics', title: 'two'},
  { link: 'https://source.unsplash.com/rQ9QfnEEmrQ', title: 'sunset'}
];



// mongodb://<dbuser>:<dbpassword>@ds263948.mlab.com:63948/mygalleryofimgs

function router(nav) {
  imgRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://larry:Larry4Life@ds263948.mlab.com:63948/mygalleryofimgs';
      const dbName = 'mygalleryofimgs';
      debug(nav);

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('imgsmore');
          const imgList = await col.find().toArray();
          res.render(
            'imgListView',
            {
              nav,
              title: 'Collection of Imgs',
              imgList
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());

    });

  imgRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://larry:Larry4Life@ds263948.mlab.com:63948/mygalleryofimgs';
      const dbName = 'mygalleryofimgs';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected correctly to server');
          const db = client.db(dbName);
          const col = await db.collection('imgsmore');

          const myImg = await col.findOne({ _id: new ObjectID(id) });
          debug(myImg);
          res.render(
            'imgView',
            {
              nav,
              title: 'Single Image',
              myImg
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  imgRouter.route('/createImg')
    .post((req, res, next) => {
      const url = 'mongodb://jill:Jill4Life@ds263948.mlab.com:63948/mygalleryofimgs';
      const dbName = 'mygalleryofimgs';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          debug('imgid: ' + req.body.imgid);
          const response = await db.collection('imgsmore')
            .insertOne(
              { link: 'https://source.unsplash.com/' + req.body.imgid,
                title: req.body.title
              }
            );
            res.redirect('/imgs');

        } catch (err) {
          debug(err.stack);
          next();
        }
        client.close();
      }());
    });

  return imgRouter;
};

// export function
module.exports = router;