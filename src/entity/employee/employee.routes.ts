import express from "express";
import { EmployeeController } from "../../controllers/employee.controller";


class EmployeeRoutes {

    public router;

    constructor(){
        this.router = express.Router({ mergeParams: true });

        this.router.get('/', (req, res) => new EmployeeController().index(req, res));
        this.router.post('/', (req, res) => new EmployeeController().create(req, res));
        this.router.patch('/', (req, res) => new EmployeeController().update(req, res));

        this.router.get('/:id/item', (req, res) => new EmployeeController().show(req, res));
        this.router.delete('/:id/item', (req, res) => new EmployeeController().delete(req, res));
    }
}

export default new EmployeeRoutes().router;