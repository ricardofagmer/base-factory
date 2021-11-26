import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";


@Entity()
export class Shop{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'name', type: 'char', length: 255})
    name?: string;

    @Column({ name: 'address', type: 'char', length: 255})
    address?: string;

    @Column({ name: 'telephone', type: 'char', length: 25})
    telephone?: string;

    @OneToMany(() => Employee, (emp) => emp.shop)
    employee?: Employee[]; 

}


