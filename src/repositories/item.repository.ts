import {Item} from "../models/item.model";
import {database} from "./database";

export const itemRepository = {
    criar: (item: Item, callback: (id?: Number) => void) => {
        const sql = "INSERT INTO itens (nome, descricao) VALUES (?, ?)";
        const params = [item.nome, item.descricao];
        database.run(sql, params, function (_err) {
            callback(this?.lastID);
        });
    },
    findAll: (callback: (itens: Item[]) => void) => {
        const sql = "SELECT * FROM itens";
        const params: any[] = [];
        database.all(sql, params, (_err, rows) => callback(rows));
    },
    findOne: (id: Number, callback: (item?: Item) => void) => {
        const sql = "SELECT * FROM itens WHERE id = ?";
        const params = [id];
        database.get(sql, params, (_err, row) => callback(row));
    },
    update: (id: Number, item: Item, callback: (notFound: Boolean) => void) => {
        const sql = "UPDATE itens SET nome = ?, descricao = ? WHERE id = ?";
        const params = [item.nome, item.descricao, id];
        database.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id: Number, callback: (notFound: Boolean) => void) => {
        const sql = "DELETE FROM itens WHERE id = ?";
        const params = [id];
        database.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    }

};