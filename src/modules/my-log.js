//* importaciones locales  (module.exports.info =)
const info = ( text ) => {
    console.log('INFO:', text)
    return text
}

const error =  (text)  =>{
    console.log('ERROR:', text)
    return text
}

module.exports.info = info
module.exports.error = error
//* para exportar estas funciones(importaciones globales)
//module.exports = { info, error }  //pongo la funciones que quiero exportar