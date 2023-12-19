//IMPORTACION DE LA LIBRERIA MONGOOSE
const mongoose = require("mongoose");
require('dotenv').config()

//FUNCION PARA REALIZAR UNA CONEXION CON BASE DE DATOS
const connectDB = async () => {
    try{

        //CONEXION A BASE DE DATOS
        // IMPORTANTE PARA UTILIZAR NUESTRA VARIABLE DE ENTORNO CON PROCESS.ENV
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        //EXPRESAR EN TERMINAL QUE NUESTRA BASE DE DATOS FUE CONECTADA
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error)
        process.exit(1) // DETIENE LA APP POR COMPLETO
    }
}

// EXPORTACION DE LA FUNCION PARA ACCESO

module.exports = connectDB