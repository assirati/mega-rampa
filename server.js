const dotenv = require('dotenv');
const app = require('./app');
const appWs = require('./app-ws');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);

    if (process.env.NODE_ENV === 'development') console.log(err.stack);

    console.log('EXCEÇÃO NÃO TRATADA! Desligando...');
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App sendo executada na porta ${port}...`);
});

const wss = appWs(server);
app.locals.wss = wss;
