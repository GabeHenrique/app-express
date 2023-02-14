import express, {Request, Response} from "express";
import {Item} from "../models/item.model";
import {itemRepository} from "../repositories/item.repository";

export const itensRouter = express.Router();

itensRouter.get('/', (req: Request, res: Response) => {
    itemRepository.findAll(itens => res.json(itens));
});

itensRouter.get('/:id', (req: Request, res: Response) => {
    const id: Number = +req.params.id;
    itemRepository.findOne(id, item => {
        item ? res.json(item) : res.status(404).send();
    });
});

itensRouter.post('/', (req: Request, res: Response) => {
    const item: Item = req.body;
    itemRepository.criar(item, id => {
        id ? res.status(201).send() : res.status(400).send();
    });
});

itensRouter.put('/:id', (req: Request, res: Response) => {
    const id: Number = +req.params.id;
    itemRepository.update(id, req.body, notFound => {
       notFound ? res.status(404).send() : res.status(204).send();
    });
});

itensRouter.delete('/:id', (req: Request, res: Response) => {
    const id: Number = +req.params.id;
    itemRepository.delete(id, notFound => {
        notFound ? res.status(404).send() : res.status(204).send();
    });
});