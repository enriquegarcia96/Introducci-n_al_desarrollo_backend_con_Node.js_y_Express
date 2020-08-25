//importo un modulo NODEJS
var http = require('http')//me permite  ejecutar JS al lado del servidor

var url = require('url')

var queryString = require('querystring') //modulo de cour de nodejs

//*modulos globales; importo mis funciones de la carpeta modules
// var log = require('./modules/my-log')
// var consts = require('./utils/consts')
// var firebase = require('../libs/firebase')

//* modulos locales; importacion parciales
var {info,error} = require('./modules/my-log')
var consts = require('./utils/consts')
var firebase = require('../libs/firebase')

//*importo el paquete countries-list manera parcial
var {countries} = require('countries-list')
const { join, parse } = require('path')

//var require()//permite trabajar con archivos de NODEJS

var  server = http.createServer((request, response) =>{

    var parsed = url.parse(request.url)
    console.log("parsed:", parsed)

    var pathname =  parsed.pathname


    var query = queryString.parse(parsed.query)//le paso el parsed 
    console.log("Query",query)

    // response.writeHead(200,{'Content-Type': "application/json"})
    // response.write(JSON.stringify(countries.HN))
    // response.end()


    if( pathname === '/' ){
            response.writeHead(200,{"Content-Type":"text/html"})
            response.write('<html><body><p>HOME PAGE</p></body></html>')
            response.end()

    }else if( pathname === '/exit' ){
        response.writeHead(200,{"Content-Type":"text/html"})
        response.write('<html><body><p>BYE</p></body></html>')
        response.end()

    }else if( pathname === '/info' ){

        var result = info(request.url)//accedo alas funciones del archivo my-log
        response.writeHead(200,{"Content-Type":"text/html"})
        response.write(result)
        response.end()

    }else if( pathname === '/error' ){
        var result = error(pathname)//accedo alas funciones del archivo my-log
        response.writeHead(200,{"Content-Type":"text/html"})
        response.write(result)
        response.end()

    }else if( pathname === '/country' ){
        response.writeHead(200,{"Content-Type":"application/json"})
        response.write(JSON.stringify(countries[query.code]))//paso el formato JSON a un String
        response.end()

    }else{
        response.writeHead(404,{"Content-Type":"text/html"})
        response.write('<html><body><p>NOT FOUND</p></body></html>')
        response.end()

    }

})

server.listen(4000)//se ejecute en el puerto 4000
console.log('corriendo en 4000')






