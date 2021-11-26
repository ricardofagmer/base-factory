import { Repository } from "typeorm";
import { BaseEntityID } from "../core/base-entity.id";

export abstract class BaseServiceRepository<T extends BaseEntityID> {
    abstract readonly repository: Repository<T>;
}