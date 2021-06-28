let express = require('express');
var cors = require('cors');
let myApp = express();
myApp.use(cors());
var FormData = require('form-data');
let fs = require('fs');
let path = require('path');
const request = require('request');
const moment = require('moment');

var multer = require('multer');
// var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
// var random = ("" + Math.random()).substring(2, 8);
// var random_number = timestamp + random;
var random_number = Date.now();

// console.log(random_number);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/allData/uploads/')
    },
    filename: function (req, file, cb) {
        // console.log(file)
        cb(null, random_number + file.originalname)
    }
})
var upload = multer({ storage: storage })

let BodyParser = require('body-parser');
myApp.use(BodyParser.json());

let config = require('./config');
let jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

let mongoose = require('mongoose');
let SiteUsers = require('.//db/models/users');
let History = require('.//db/models/history');
const { default: axios } = require('axios');

// mongoose.connect('mongodb+srv://Nabiha:1716221nabiha@cluster0.vxl4h.mongodb.net/FYP?retryWrites=true&w=majority', (err, connection) => {

//     console.log(err || connection);

// })
mongoose.connect('mongodb://localhost:27017/FYP', (err, connection) => {
    console.log(err || connection);
});

// myApp.get('/', function(req, res){
//     res.end('Main')
// });

myApp.post('/checksession', async function (req, res) {
    var decoded = jwt_decode(req.body.token);
    if (decoded.id) {
        SiteUsers.findOne({ _id: decoded.id }, function (err, docs) {
            res.send(docs);
        });
    }
});

myApp.post('/signup', async function (req, res) {
    console.log(req.body);
  let user1 = await SiteUsers.findOne({
    email: req.body.email,
  });
  if (user1) {
    res.json({
      msg: "Email Already in Use",
    });
  } else {
    let userToken = { password: req.body.password };
    let token = jwt.sign(userToken, config.secret);
    console.log(token);
    let user = new SiteUsers();
    user.name = req.body.name,
      user.email = req.body.email,
      user.password = token,
    await user.save();
    res.json({
      msg: "Signed Up...!",
    });
  }
});
myApp.post('/login', async function (req, res) {
    console.log(req.body);
  let user = await SiteUsers.findOne(
    {
      email: req.body.email,
    },function (err, docs) {
      if (docs) {
        console.log(docs._doc.password);
        var decoded = jwt_decode(docs._doc.password);
        console.log(decoded);
        if (decoded.password == req.body.password) {
          console.log("Password");

          let userToken = { id: docs._doc._id };
          jwt.sign(
            userToken,
            config.secret,
            {
              expiresIn: "6d",
            },
            (err, token) => {
              res.json({
                token,
                success: true,
                msg: "User Found",
                _id: docs._doc._id,
                username: docs._doc.username,
                password: docs._doc.password,
                email: docs._doc.email,
              });
            }
          );
        } else {
          res.json({
            msg: "Wrong Password",
          });
        }
      } else {
        res.json({
          msg: "SignUp First..!",
        });
      }
    }
  );
});

myApp.post('/sendfile', upload.single('attachments'), async function (req, res) {
    console.log(req.file)
    const formData = {
        attachments: fs.createReadStream(path.resolve(__dirname + '/allData/uploads/' + random_number + req.file.originalname))
    };

    let resp = request.post({ url: 'http://localhost:4000/verify', formData: formData }, async function (err, response, body) {
        const today = moment();
        let date =today.format()
        console.log(req.body.id)
        console.log(date);
        console.log(body);
        let history = new History();
        history.referenceId = req.body.id,
            history.date = date,
            history.image = random_number + req.file.originalname,
            history.objects = body
        await history.save();
        res.send(body);

    })
  
});
myApp.post('/history', async function (req, res) {
    var decoded = jwt_decode(req.body.token);
    if (decoded.id) {
        History.find({ referenceId: decoded.id }, function (err, docs) {
            res.send(docs);
        }
        )}
});

myApp.post('/deletehistory',async function(req,res){
  console.log(req.body)
  let history = await History.findById(req.body.delPersonId);
  fs.unlink( path.resolve(__dirname + '/alldata/uploads/' + history.image),(err)=>{})
  
  History.findOneAndDelete({ referenceId: req.body.delId, _id: req.body.delPersonId }, function (err, docs) {
      if (err) {
          console.log(err)
      }
      else {
          console.log("Deleted History Item : ", docs);
      }
  })
  
  History.find({}, function (err, docs) {
      res.send(docs);
  });

})

myApp.use(express.static('./server/allData/uploads'))
myApp.use(express.static('./server/build'))

myApp.listen(5050, function () {
    console.log('Server in Working State')
})