const mongoose = require ("mongoose")  //Importar el modulo mongoose
const {Schema, model} = mongoose   //Extrae las propiedades del objeto Mongoose

const alumnoSchema = new Schema({   //Crea una instancia de clase Schema, que es un esquema de datos.
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }

},
    {timestamps: true}  //Esto significa que el esquema va a añadir automáticamente dos campos a cada documento que se cree con este esquema: createdAt y updatedAt, que indican la fecha y hora de creación y de modificación del documento, respectivamente.
)

const AlumnoModel = model('Alumno', alumnoSchema)

module.exports = AlumnoModel