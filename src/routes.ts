import express from "express";
import EmployeeRoutes  from './entity/employee/employee.routes';

class Router {

    public router;

    constructor(){
        this.router = express.Router();
        this.router.get('/', (req, res) => res.send('Hello world'));
        this.router.use('/employee', EmployeeRoutes);
    }
}

export default new Router().router;