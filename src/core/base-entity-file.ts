import { Column } from "typeorm";
import { BaseEntityTimesStamps } from "./baset-entity-times-stamps";


export class BaseEntityFile extends BaseEntityTimesStamps {

    @Column('varchar', { name: 'nome', length: 255 })
    nome?: string;

    @Column('varchar', { name: 'tipo', length: 255 })
    tipo?: string;

    @Column('float', { name: 'tamanho_bytes', nullable: true, precision: 12 })
    tamanhoBytes?: number;

    url?: string;

    arquivo: string | undefined;
}