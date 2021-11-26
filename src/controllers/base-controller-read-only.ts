import { Logger } from "typeorm";
import { BaseEntityID } from "../core/base-entity.id";
import { Constructor } from "../services/base-service-crud";
import { BaseServiceRepository } from "../services/base-service-repository";


export interface BaseControllerReadOnlyInterface<Entity> {
    readonly resourceService: BaseServiceRepository<Entity>;
    readonly logger: Logger;
}

export function BaseControllerWithService<Entity extends BaseEntityID>(init: {
    entity: Constructor<Entity>;
    service: Constructor<BaseServiceRepository<Entity>>;
}){

}