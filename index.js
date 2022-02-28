const fs = require('fs');
const express = require('express')
const app = express();
const port = process.env.PORT || 8080;


class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.nombre, 'utf-8')) || [];
        }
        catch (error) {
            return 'No existe el archivo :' + this.nombre;
        }
    }
}

const miArchivo = new Contenedor("./productos.txt")

async function items() {
    itemsArray = await miArchivo.getAll()
    itemsObject = { item: itemsArray, cantidad: itemsArray.length }
    return itemsObject
}

async function itemRandom() {
    itemsArray = await miArchivo.getAll()
    let itemRandom = itemsArray[randomInt(0, itemsArray.length)]
    itemRandomObject = { item: itemRandom }
    return itemRandomObject
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}






app.get('/productos', (req, res) => {
    (async () => {
        let itemsObject = await items()
        res.send(itemsObject)
    })()
})

app.get('/productoRandom', (req, res) => {
    (async () => {
        let itemRandomObject = await itemRandom()
        itemRandom()
        res.send(itemRandomObject)
    })()
})


app.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});