import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";


@Entity()
export class EmployeType{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'name', type: 'char', length: 255})
    name?: string;
    
    @Column({ name: 'salary', type: 'decimal' })
    salary?: number

    @OneToOne(() => Employee, (et) => et.employeType)
    employee?: Employee;
}