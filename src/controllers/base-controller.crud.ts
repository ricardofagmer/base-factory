import { Request, Response } from "express";
import { BaseServiceCrud, Constructor } from "../services/base-service-crud";


export class BaseController<T> {
    readonly resourceService: BaseServiceCrud<T>
    
/*     constructor(readonly resourceService: BaseServiceCrud<T>){
    }  */
     

    async index(req: Request, res: Response): Promise<any> {

        return await this.resourceService
            .findAll()
            .then(data => res.status(200).send(data))
    }

    show(req: Request, res: Response): Promise<any> {
        const id = req.params.id ? req.params.id : 0;
        return this.resourceService
            .findOne(+id)
            .then(data =>
                data !== '404'
                    ? res.status(200).send(data)
                    : res.status(404).send(data));
    }

    create(req: Request, res: Response): Promise<any> {
        return this.resourceService
            .create(req.body)
            .then(data => res.status(202).send(data));
    }

    update(req: Request, res: Response): Promise<any> {
        const id = req.body.id ? req.body.id : 0;
        return this.resourceService
            .update(+id, req.body)
            .then(data => data !== '404'
                ? res.status(200).send(data)
                : res.status(404).send(data));
    }

    delete(req: Request, res: Response): Promise<any> {
        const id = req.params.id ? req.params.id : 0;
        return this.resourceService
            .softRemove(+id)
            .then(data => data !== '404'
                ? res.status(200).send(data)
                : res.status(404).send(data));
    }

    remove(req: Request, res: Response): Promise<any> {
        return this.resourceService
            .remove(req.body)
            .then(data => data !== '404'
                ? res.status(200).send(data)
                : res.status(404).send(data));
    }

}