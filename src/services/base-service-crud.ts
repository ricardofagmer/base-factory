import { DeepPartial, EntityManager, UpdateResult } from "typeorm";
import { BaseEntityID } from "../core/base-entity.id";
import { BaseServiceReadOnly } from "./base-service-read.only";


export abstract class BaseServiceCrud<T extends BaseEntityID> extends BaseServiceReadOnly<T>{
  abstract readonly Entity: Constructor<T>;

  async create(dto: T | T[]): Promise<T | T[]> {
    if (Array.isArray(dto)) {
      const dtos: T[] = dto;

      return this.repository.manager.transaction(
        async (transatctionEntityManager) => {
          const ids: { id: number | undefined }[] = [];

          for (let dtoElement of dtos) {
            this.removeId(dtoElement);

            dtoElement = this.entityFromDto(dtoElement);

            await this.onBeforeSave(dtoElement, transatctionEntityManager);
            const res = await transatctionEntityManager.save(dtoElement);

            ids.push({ id: res.id });
          }

          return ids as unknown as T[]
        }
      );
    } else {
      this.removeId(dto);
      dto = this.entityFromDto(dto);

      return this.repository.manager
        .transaction(async (temanager) => {
          await this.beforeSave(
            dto as unknown as DeepPartial<T>,
            temanager
          )

          await this.onBeforeSave(dto as T, temanager);

          return temanager.save(dto);

        })
        .then((value: any) => this.onAfterSave(value));
    }
  }

  async update(id: number, dto: T): Promise<T | string> {
    dto.id = +id;
    dto = Object.assign(new this.Entity(), dto);

    if (await this.repository.findOne(id)) {

      return this.repository.manager
        .transaction(async (transactionEntityManager) => {
          await this.beforeSave(
            dto as unknown as DeepPartial<T>,
            transactionEntityManager
          );

          await this.onBeforeUpdate(dto, transactionEntityManager);

          return transactionEntityManager.save(dto)
        }).then((value) => this.onAfterUpdate(value));
    } else {
      return '404';
    }
  }

  async remove(dto: T): Promise<T | string> {
    if ((await this.repository.count(dto)) > 0) {
      return this.repository.remove(dto);
    } else {
      return '404'
    }
  }

  async softRemove(id: number): Promise<UpdateResult | string> {
     if(await this.repository.findOne(id)!== undefined) {
      return this.repository.softDelete(id);
    } else {
      return '404'
    }
  }

  restore(id: number): Promise<UpdateResult> {
    return this.repository.restore(+id);
  }

  protected entityFromDto(dto: Partial<T>): T {
    return Object.assign(new this.Entity(), dto);
  }

  protected beforeSave(dto: DeepPartial<T>, trx?: EntityManager) {
    return;
  }


  protected removeId(dto: T): void {
    delete dto.id;

    /*  if ('uuid' in dto && !dto.uuid) {
       delete dto.uuid;
     } */
  }

  protected onAfterSave(dto: T): T | Promise<T> {
    return dto;
  }

  protected onAfterUpdate(dto: T): T | Promise<T> {
    return dto;
  }

  protected onBeforeUpdate(dto: T, trx?: EntityManager): T | Promise<T> {
    return dto;
  }

  protected onBeforeSave(dto: T, trx?: EntityManager): T | Promise<T> {
    return dto;
  }


}


export interface AfterSave {
  onAfterSave(dto: BaseEntityID): BaseEntityID | Promise<BaseEntityID>;
}
export interface AfterUpdate {
  onAfterUpdate(dto: BaseEntityID): BaseEntityID | Promise<BaseEntityID>;
}

export interface BeforeUpdate {
  onBeforeUpdate(
    dto: BaseEntityID,
    trx?: EntityManager,
  ): BaseEntityID | Promise<BaseEntityID>;
}

export interface BeforeSave {
  onBeforeSave(
    dto: BaseEntityID,
    trx?: EntityManager,
  ): BaseEntityID | Promise<BaseEntityID>;
}



export type Constructor<T> = new (...args: any[]) => T;
