import { DeleteDateColumn } from "typeorm";
import { BaseEntityID } from "./base-entity.id";


export abstract class BaseEntityDeleteDate extends BaseEntityID {
    
    @DeleteDateColumn({ name: 'desativado_em', type: 'timestamp'})
    desativadoEm?: Date | null;
}