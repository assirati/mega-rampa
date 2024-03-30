//app.js
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const WebSocket = require('ws');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const API = require('./controllers/apiAuth');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use(helmet());

const limiter = rateLimit({
    // 500 chamadas a cada 45 min (uma aula)
    max: 500,
    windowMs: 45 * 60 * 1000,
    messsage:
        'Muitas requisições deste IP, por favor tente novamente em uma hora!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(morgan('dev'));

app.post('/api/tempo', API.authenticateKey, (req, res, next) => {
    const wss = req.app.locals.wss;
    let tempo = req.body.tempo;
    wss.broadcast({ tempo: tempo });
    res.status(200).json({
        status: 'success',
    });
});

module.exports = app;
