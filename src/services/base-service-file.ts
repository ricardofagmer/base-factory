import { BaseEntityFile } from "../core/base-entity-file";
import { BaseServiceCrud } from "./base-service-crud";


export abstract class BaseServiceFile<T extends BaseEntityFile> extends BaseServiceCrud<T>{


}