const express = require('express')
const app = express ()
require ('dotenv').config()
const connectDB = require('./database/db.js')
const cors=require ('cors');

connectDB()
app.use(cors());
app.use(express.json())

app.get('/',(req,res) =>{
    res.send('Hola')
})

app.use("/alumnos", require("./routes/alumno.js"))

app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto ${process.env.PORT}`)
})