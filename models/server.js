const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';
        //Conectar base de datos 
        this.connectedDB();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    async connectedDB (){
        await dbConnection();
    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
