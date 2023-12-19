const AlumnoModel = require  ("../models/models-alumno.js");
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs");


const traerAlumno = async (req, res) => {
    try {
        const alumno = await AlumnoModel.find({})
        res.json({ alumno:alumno })
    } catch (error) {
        res.status(500).json({error: "Hubo un herror pero sin H"})
    }
}

const crearAlumno = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const nuevoAlumno = await AlumnoModel.create({
            name,
            email,
            password: hashedPassword,
        })
        const payload ={
            alumno:{
                id: nuevoAlumno._id
            }
        }
        jwt.sign(
            payload,
            process.env.SECRET, 
            {expiresIn: 360000 }, 
            (error, token) => {
                if(error) throw error
                res.json({token})
            }
            );
    } catch (err) {
        res.status(500).json({ msj: "Hubo un herror pero sin H" });
    }
}

const verifyStudent = async (req, res) => {
     // CONFIRMAMOS QUE EL USUARIO EXISTA EN BASE DE DATOS Y RETORNAMOS SUS DATOS, EXCLUYENDO EL PASSWORD
    try{
        const alumno = await AlumnoModel.findById(req.user.id).select('-password');
        res.json({ alumno} )
    } catch (error) {
        res.status(500).json ({msg: "Existe un error", error})
    }
}

const putStudent = async (req, res) => {
    const { id, name, email } = req.body;

    try {
        const nuevoAlumno = await AlumnoModel.findByIdAndUpdate(
            id,
            { name, email },
            { new: true}
        );
        res.json({ nuevoAlumno });
    } catch (err) {
        res.status(500).json({ msj: "hubo un error "})
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.body;
    try {
        const usuarioBorrado = await AlumnoModel.findByIdAndDelete({ _id: id})
        res.json({ usuarioBorrado });
    } catch (err) {
        res.status(500).json({ msj: "hubo un error"})
    }
}

const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        let foundStudent = await AlumnoModel.findOne ({ email: email})
        if (!foundStudent) {
            //Si el usuario no existe devolvemos un error
            return res.status(400).json({msj: "El usuario no existe"})
        }

        // Si el usuario existe, hacemos la evaluacion de la contrasenia enviada contra la base de datos
        const passCorrecto = await bcryptjs.compare(password, foundStudent.password)

        if (!passCorrecto) {
            return await res.status(400).json ({msj: "La contrasenia es incorrecta"})
        }
        //SI TODO ES CORRECTO, GENERAMOS UN JSON WEB TOKEN
        // 1.-DATOS DE ACOMPANIAMIENTO AL JWT

        const payload = {
            student: {
                id: foundStudent.id,
            },
        };

        // 2.- firma del JWT
        if( email && passCorrecto) {
            jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: 3600000 },
                (error, token) => {
                    //SI TODO SUCEDIO CORRECTAMENTE, RETORNAR EL TOKEN
                    res.json({ token })
                }
            );
        } else {
            res.json ({ msg: "Hubo un error firmando el token", error})
        }
    } catch (error) {
        res.json({msg: "Existe un error", error})
    }
}

module.exports = {traerAlumno, crearAlumno, verifyStudent, loginStudent, putStudent, deleteStudent}