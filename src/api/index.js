const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// PostGreSQL Database
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'react_chatbox',
  password: 'smyecretpassword',
  port: 5432,
});

pool.connect();

const PORT = 3500;
const DELETE_TIMEOUT = 5000;

let pruneUsers = () => {
    let timeout = Date.now() - DELETE_TIMEOUT;

    let query = {
      name: 'pruneUsers',
      text: 'DELETE FROM users WHERE lastSeen <= $1 RETURNING *',
      values: [timeout],
    }

    pool.query(query).then( (res) => {
      if (res.rows[0]) {
        console.log(res.rows[0].username, 'is pruned');
      }
    }).catch(
      e => console.error(e.stack)
    );
};

let userAlive = (username) => {
  now = (new Date()).getTime();
  let query = {
    name: 'userAlive',
    text:  "UPDATE users SET lastSeen = $1 WHERE username = $2",
    values: [now, username]
  }

  pool.query(query).then( (res) => {
  }).catch(
    e => console.error(
      e.stack
    )
  );
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    let query = {
      name: 'activeUsers',
      text: "SELECT username FROM users"
    }

    pool.query(query).then( dbResponse => {
      let activeUsers = dbResponse.rows.map( x => x.username );
      res.send(activeUsers);
    })
});

app.get('/users', (req, res) => {
    let username = req.query.username;
    userAlive(username);
    pruneUsers();

    pool.query("SELECT * FROM users")
    .then( dbResponse => {
      let users = dbResponse.rows;
      res.send(users);
    }).catch(
      e => console.error(e.stack)
    );
});

app.get('/chatlog', (req, res) => {
    let query = {
      name: 'chatlogQuery',
      text: 'SELECT * FROM chatlog',
    };

    pool.query(query)
    .then( dbResponse => {
      let chatlog = dbResponse.rows;
      res.send(chatlog);
    }).catch(
      e => console.error(e.stack)
    );
});

app.post('/chatlog', (req, res) => {
    let msg = req.body;

    let text = "INSERT INTO chatlog(username, time, content) VALUES($1, $2, $3)"
    let values = [msg.username, msg.time, msg.content];

    pool.query(text, values)
    .then( dbResponse => {
      res.json({success: true});
    }).catch(
      e => console.error(e.stack)
    );
});

app.post('/login', (req, res) => {
    let newUser = req.body.username;
    let lastSeen = (new Date()).getTime();

    let text = "INSERT INTO users(username, lastSeen) VALUES($1, $2) RETURNING *";
    let values = [newUser, lastSeen];

    pool.query(text, values)
    .then( dbResponse => {
      console.log(dbResponse.rows[0].username, 'is logged in');
      res.json({success: true});
    }).catch(
      e => console.error(e.stack)
    );
});


app.listen(PORT, () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
});
