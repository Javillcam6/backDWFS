const jwt = require ("jsonwebtoken");

module.exports = (req, res) => {
    //Extraemos el token que viene desde la peticion
    const token = req.header('x-auth-token')

    //SI NO HAY TOKEN, RETORNAMOS ERROR
    if(!token) {
        return res.status(401).json({
            msg:"No hay token, permiso NO valido"
        })
    }
try{
     
    // CONFIRMAMOS LA VERIFIACION DEL TOKEN A TRAVES DE LA LIBRERIA JWT
    const openToken = jwt.verify(token, process.env.SECRET)

    // SI TODO ESTA CORRECTO, A LA PETICION LE ANCLAMOS UNA PROPIEDAD ADICIONAL CON EL TOKEN DESACTIVADO
    req.user = openToken.user

    // NEXT, AL INVOCARSE, PERMITE AVANZAR A LA SIGUIENTE FUNCION
    next ();
} catch (error) {
    res.json({
        msg: "Tienes un error de autenticacion",
        error
    })
}

}