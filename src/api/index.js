const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3500;

const chatlog = [{
    username: "osman",
    time: "10:40",
    content: "Content osman"
  },
  {
    username: "osman2",
    time: "10:42",
    content: "Content osman2"
  },
  {
    username: "osman3",
    time: "10:44",
    content: "Content osman3"
  }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/users', (req, res) => {
    let users = [{
        username: "osman"
      },
      {
        username: "osman3"
      }]

    res.send(users);
});

app.get('/chatlog', (req, res) => {
    res.send(chatlog);
});


app.post('/chatlog', (req, res) => {
    chatlog.push(req.body);
    res.json({success: true});
});


app.listen(PORT, () => {
    console.log(`Server listenning at http://0.0.0.0:${PORT}`);
});