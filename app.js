/*const mongoose = require('mongoose');

connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js')({
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`Conexion exitosa a MongoDB`))
.catch(error => console.error(`Error al conectar a MongoDB:`, error));*/

import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    serverSelectionTimeoutMS: 5000
})
.then(()=>console.log('Conexion exitosa a MongoDB'))
.catch(error=>console.error('Error al conectar a MongoDB', error));

//Crear un esquema y un modelo para Superheroes
const superheroSchema = new mongoose.Schema({
    creador: {type: String},
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-01' }); // Aquí defines la colección de cada grupo

const SuperHero = mongoose.model('SuperHero', superheroSchema);

//Insertar documento
async function insertSuperHero(){
    const hero = new SuperHero({
        creador: "Barbieri Santé",
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido aracnido', 'Super fuerza', 'Agilidad'],
        aliados:['Ironman'],
        enemigos: ['Duende Verde']
    });
    await hero.save();
    console.log('Superheroe insertado:', hero);
}

//Actualizar un documento
async function updateSuperHero(nombreSuperHeroe){
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe: nombreSuperHeroe},
        {$set: {edad: 30}}
    );
    console.log('Resultado de la actualizacion:', result);
}

//Eliminar un documento
async function deleteSuperHero(nombreSuperHeroe){
    const result = await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superheroe eliminado:', result);
}

//Bucasr documentos
async function findSuperHeroes(){
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('Superheroes encontrados:', heroes);
}

// insertSuperHero();
// updateSuperHero('Spiderman');
// findSuperHeroes();
// deleteSuperHero('Spiderman');