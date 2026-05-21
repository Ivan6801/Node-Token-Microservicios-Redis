const express = require("express");
const app = express();
const config = require('../config')
const router = require('./network')
const errors = require('../network/errors');


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).send({ error: false, status: 200, body: 'ok' });
});

//* RUTAS
app.use('/', router)
app.use(errors);

app.listen(config.mysqlService.port, () => {
  console.log(`Servidor MySQL escuchando en el puerto ${config.mysqlService.port}`);
})
