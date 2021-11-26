import { Employee } from "../entity/employee/employee.entity";
import { EmployeeService } from "../services/employee.service";
import { BaseController } from "./base-controller.crud";


export class EmployeeController extends BaseController<Employee> {
       readonly resourceService = new EmployeeService();
}