const createUser = (req, res) =>{
     res.send({status:'OK', message:'user create'})
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