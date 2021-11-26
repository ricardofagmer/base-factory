import { FindManyOptions, FindOneOptions, ObjectLiteral } from "typeorm";
import { BaseEntityID } from "../core/base-entity.id";
import { BaseServiceRepository } from "./base-service-repository";


export abstract class BaseServiceReadOnly<T extends BaseEntityID> extends BaseServiceRepository<T>{

    async exists(id: number): Promise<Boolean> {
        return await this.repository
            .findOneOrFail(id)
            .then();
    }

    async findAll(params?: FindAllParams): Promise<T[]> {
        const options: FindManyOptions = {
            select: params?.select,
            where: params?.query,
            relations: params?.relations,
            withDeleted: params?.showDeleted
        };

        if (params?.offset)
            if (params?.pageSize && params?.offset >= 0) {
                options.take = params.pageSize;
                options.skip = params.offset;
            }

        if (params?.pageSize && params?.pageNumber) {
            options.take = params.pageSize;
            options.skip = (params.pageNumber - 1) * params.pageSize;
        }

        if (params?.sortField && params?.sortOrder) {
            options.order = {
                [params.sortField]: params.sortOrder
            }
        }
        else {
            options.order = {
                id: 'DESC'
            }
        }

        if (params?.query)
            if (params?.query.uuid) {
                const uuid: string = params.query.uuid as string;

                params.query.uuid = Buffer.from(uuid, 'hex');
            }

        if (params)
            this.onBeforeFindAll(params, options);

        return await this.repository
            .find(options)
            .then((res) => this.onAfterFindAll(res));
    }


    async findOne(id: number,
        params?: {
            relations?: string[];
            where?: ObjectLiteral;
            select?: string[];
            withDeleted?: boolean;
        }): Promise<T | string>  {


        const options: FindOneOptions = {
            relations: params?.relations,
            where: params?.where,
            select: params?.select,
            withDeleted: params?.withDeleted
        }

        return await this.repository
            .findOneOrFail(id, options)
            .catch(err => 'Not Found');
    }

    getCount(params?: {
        query?: ObjectLiteral;
        select?: string[];
        showDeleted?: boolean;
    }): Promise<number> {

        const options: FindManyOptions = {
            select: params?.select,
            where: params?.query,
            withDeleted: params?.showDeleted
        };

        if (params)
            this.onBeforeFindAll(params, options);

        return this.repository.count(options);
    }

    getSelectItem(params?: {
        query: any;
        showDeleted?: boolean
    }): Promise<{ label: string, value: number }[]> {
        throw new Error();
    }


    protected onBeforeFindAll(
        params: FindAllParams,
        options: FindManyOptions,
    ): void {
        return;
    }

    protected onAfterFindAll(res: T[]): T[] | Promise<T[]> {
        return res;
    }
}

export interface BeforeFindAll {
    onBeforeFindAll(params: FindAllParams, options: FindManyOptions): void;
}

export interface AfterFindAll {
    onAfterFindAll(res: BaseEntityID[]): BaseEntityID[] | Promise<BaseEntityID[]>;
}


export interface FindAllParams {
    query?: ObjectLiteral;
    relations?: string[];
    select?: string[];
    showDeleted?: boolean;
    pageNumber?: number;
    pageSize?: number;
    offset?: number;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
}