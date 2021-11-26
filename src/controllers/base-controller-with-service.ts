import { Logger } from "typeorm";
import { BaseServiceRepository } from "../services/base-service-repository";


export interface BaseControllerWithService<Entity> {
    readonly resourceService: BaseServiceRepository<Entity>;
    readonly logger: Logger;
    throwError(e:any): void;
}