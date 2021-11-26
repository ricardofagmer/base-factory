import { TypeOrmConnection } from "./core/connection";
import express from "express";
import routes from "./routes";

TypeOrmConnection.connect();

class App {
    public express; 

    constructor() {

        this.express = express();

        this.express.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
            res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT,PATCH");    
            next();
          });
       
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
        this.express.use(routes);

        this.express.listen(4000, () => console.log('...Server running on port: 4000'));

        this.express.use((error: any, req: any, res: any, next: any) => {
            res.status(error.status || 500)
            res.json({ eror: error.message })
        });

        this.express.use((req:any, res: any, next: any) =>{
            const error = new Error();
            error.message = 'Error';
            error.stack = 'Not found.';

            next(error);
        })
    }
}

export default new App().express;