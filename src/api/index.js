const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3500;
const DELETE_TIMEOUT = 5000;

const chatlog = [
    {
        _id: 1,
        username: "osman",
        time: "10:40",
        content: "Content osman"
    },
    {
        _id: 2,
        username: "osman2",
        time: "10:42",
        content: "Content osman2"
    },
    {
        _id: 3,
        username: "osman3",
        time: "10:44",
        content: "Content osman3"
    }
];

const users = [
    {
        _id: 1,
        username: "osman",
        lastSeen: 1532884951497
    },
    {
        _id: 2,
        username: "osman2",
        lastSeen: 1532884951497
    },
    {
        _id: 3,
        username: "osman3",
        lastSeen: 1532884951497
    }
]

let pruneUsers = () => {
    let now = (new Date()).getTime();
    for(let i = users.length - 1; i >= 0; i--) {
        if(now - users[i].lastSeen >= DELETE_TIMEOUT) {
            console.log(users[i].username, 'pruned');
            users.splice(i, 1);
        }
    }
};

let userAlive = (username) => {
    for(let user of users) {
        if(user.username === username) {
            user.lastSeen = (new Date()).getTime();
        }
    }
};

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
    res.send(users);
});

app.get('/chatlog', (req, res) => {
    let username = req.query.username;
    userAlive(username);
    pruneUsers();
    res.send(chatlog);
});

app.post('/chatlog', (req, res) => {
    let msg = req.body;
    let lastMsg = chatlog[chatlog.length - 1];
    msg._id = lastMsg._id + 1;
    chatlog.push(msg);
    res.json({success: true});
});

app.post('/login', (req, res) => {
    let newUsr = req.body;

    let lastUsr = users[users.length - 1];
    newUsr._id = (lastUsr) ? lastUsr._id + 1 : 1;
    newUsr.lastSeen = (new Date()).getTime();
    users.push(newUsr);
    console.log(newUsr.username, 'logged in');
    res.json({success: true});
});


app.listen(PORT, () => {
    console.log(`Server listenning at http://0.0.0.0:${PORT}`);
});