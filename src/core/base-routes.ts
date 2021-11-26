
import express from "express";
import { BaseController } from "../controllers/base-controller.crud";
import { BaseServiceCrud } from "../services/base-service-crud";

export abstract class BaseRoutes<T> extends BaseController<T> {   

    public router;    

    constructor(){         
        super()
 
        this.router = express.Router({ mergeParams: true });

        this.router.get('/', (req, res) => this.index(req, res));

  /*       this.router.post('/', (req, res) => this.Controller.create(req, res));
        this.router.patch('/', (req, res) => this.Controller.update(req, res));

        this.router.get('/:id/item', (req, res) =>  this.Controller.show(req, res));
        this.router.delete('/:id/item', (req, res) => this.Controller.delete(req, res)); */
    }

}

 
