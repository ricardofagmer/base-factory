import { Column, PrimaryGeneratedColumn } from "typeorm";


export class BaseEntityID {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'id'
    })
    id?: number;
/* 
    @Column('binary', {
        name: 'uuid',
        unique: true,
        length: 16,
        default: () => "'uuid_to_bin(uuid())'",
        transformer: {
            from: (value: Buffer) => value?.toString('hex'),
            to: (value: Buffer) => value,
        }
    })
    uuid?: Buffer | string; */
}