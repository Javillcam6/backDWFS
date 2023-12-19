const { Router } = require ("express");
const { traerAlumno, crearAlumno, verifyStudent, putStudent, deleteStudent, loginStudent } = require ("../controlers/alumnos.controller.js")
const router = Router();
const auth = require("../middlewares/Auth.js")



router.get("/get", traerAlumno )

router.post("/postUser", crearAlumno)

router.get("/verificar", auth,  verifyStudent)

router.put("/actualizar", putStudent)

router.delete("/eliminar", deleteStudent)

router.post("/login", loginStudent)

module.exports = router