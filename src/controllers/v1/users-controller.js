//* importo el paquere bcrypt
const bcrypt = require('bcrypt')


const createUser = async (req, res) =>{
     try {
     console.log('rep.body', req.body)

     //para usar bcrypt
     //await, que primero me haga la encriptacion y despues me mande la respuesta
     const hash =  await bcrypt.hash(req.body.password, 15);
     console.log('FIN',hash)

     //accion pra guardar un usuario en una base de datos
     res.send({status:'OK', message:'user create'})
     } catch (error) {
          console.log(error)
          res.status(500).send({status:'ERROR', message:error.message})
     }
}

const deleteUsers = (req, res) =>{
     res.send({status:'OK', message:'user delete'})
}


//retorna todos los usuarios registrados
const getUsers = (req, res) =>{
     res.send({status:'OK', data:[]})

}

//ruta para actualizar la informacion de un usuario
const updateUsers = (req, res) =>{
     res.send({status:'OK', message:'user update'})

}

//exporto la funcion dentro de un object
module.exports = { 
     createUser, 
     deleteUsers, 
     getUsers, 
     updateUsers 
}