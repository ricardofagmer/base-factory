import { Column, DeleteDateColumn } from "typeorm";
import { BaseEntityID } from "./base-entity.id";


export class BaseEntityTimesStamps extends BaseEntityID {

    @Column( { name: 'criado_em', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    criadoEm?: Date;

    @Column( { name: 'atualizado_em', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    atualizoEm?: Date;

    @DeleteDateColumn({ name: 'desativado_em', type: 'timestamp'})
    desativadoEm?: Date | null;

}