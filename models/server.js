const express = require('express');
const cors = require('cors');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    middlewares(){
        //llamado de directorio publico se que es un middleware cuando dice app.USE
        this.app.use(cors());
        this.app.use(express.static('public'));

        //lectura y parseo del body
        this.app.use(express.json());
        
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/usuarios')); //esto llama a un archivo donde tengamos todas nuestras rutas
    }

    listen(){

        this.app.listen(this.port, () =>{

            console.log('Servidor corriendo en puerto', this.port);
        
        });

    }


}

module.exports = Server; //así se exporta una clase en js