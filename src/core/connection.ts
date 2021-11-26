import "reflect-metadata";
import { createConnection}  from "typeorm";
import { Employee } from "../entity/employee/employee.entity";
import { EmployeType } from "../entity/employeType/employeeType.entity";
import { Shop } from "../entity/shop/shop.entity";

export abstract class TypeOrmConnection {

    static connect() {
        return createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "lida@09",
            database: "challange",
            entities: [ 
                Shop,
                Employee,
                EmployeType,
            ],
            synchronize: false,
            logging: true
        }).then(connection => {
        }).catch(error => console.log(error));
    }
}

