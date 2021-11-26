import { getRepository, Repository } from "typeorm";
import { Employee } from "../entity/employee/employee.entity";
import { BaseServiceCrud } from "./base-service-crud";


export class EmployeeService extends BaseServiceCrud<Employee>  {
    readonly Entity = Employee;
    readonly repository = getRepository(Employee);
   
}