const express = require('express')
const sequelize = require('./conexion/database')

const Producto = require('./Modelo/Producto')

const app = express()

app.use(express.json())

var puerto = 5000;

app.get('/valor-promedio-categoria', async (req, resp) => {
    try {
        //select categoryCode,  avg(value) as valorPromedio from product_v6 group by categoryCode;
        const promedio = await Producto.findAll({
            attributes: [
                'categoryCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'valorPromedio']
            ],
            group: ['categoryCode']
        });

        if (promedio.length === 0) {
            return resp.status(404).send({ mensaje: 'No existen registros' });
        }

        return resp.status(200).send(promedio);
    } catch (error) {
        return resp.status(500).send({ error: 'Ocurrio un error: ' + error });
    }
})


app.get('/cantidad-producto-marca', async (req, resp) => {
    try {
       // select brandCode, SUM(value) as total from product_v6 group by brandCode;
        const resultado = await Producto.findAll({
            attributes: [
                'brandCode',
                [sequelize.fn('COUNT', sequelize.col('*')), 'cantidadProductos']
            ],
            group: ['brandCode']
        });

        if (resultado.length === 0) {
            return resp.status(404).send({ mensaje: 'No existen registros' });
        }

        return resp.status(200).send(resultado);
    } catch (error) {
        return resp.status(500).send({ error: 'Ocurrió un error: ' + error });
    }
});


app.listen(puerto, () => {
    console.log('Aplicacion ejecutando en el puerto ' + puerto)
})