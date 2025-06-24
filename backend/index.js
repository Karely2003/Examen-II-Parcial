const express = require('express')
const sequelize = require('./conexion/database')

const app = express()

app.use(express.json())

var puerto = 5000;

app.listen(puerto, () => {
    console.log('Aplicacion ejecutando en el puerto' + puerto)
})