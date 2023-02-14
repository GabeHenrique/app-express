import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

const SQL_ITENS_CREATE = `
CREATE TABLE IF NOT EXISTS itens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  descricao TEXT
)`;

export const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  } else {
    console.log("Base de dados conectada com sucesso.")
    database.run(SQL_ITENS_CREATE)
  }
});