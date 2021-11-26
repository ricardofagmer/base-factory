import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityTimesStamps } from "../../core/baset-entity-times-stamps";
import { EmployeType } from "../employeType/employeeType.entity";
import { Shop } from "../shop/shop.entity";

@Entity()
export class Employee extends BaseEntityTimesStamps{

    @Column({ name: 'name', type: 'char', length: 255})
    name?: string;
    
    @Column({ name: 'type', type: 'char', length: 25})
    type?: string;
    
    @Column({ name: 'telephone', type: 'char', length: 25})
    telephone?: string;
    
    @Column({ name: 'address', type: 'char', length: 255})
    address?: string;
    
    @Column({ name: 'employmentDate', type: 'date'})
    employmentDate?: Date;

    @Column({ name: 'shop_id', type: 'int'})
    shopId?: number;

    @ManyToOne(() => Shop, (shop) => shop.employee,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn([{ name: 'shop_id', referencedColumnName: 'id'}])
    shop?: Shop; 

    @OneToOne(() => Employee, (e) => e.employeType)
    employeType?: EmployeType;
}