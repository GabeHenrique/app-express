import express from 'express';
import cors from 'cors';
import {itensRouter} from "./routers/item.routes";

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors(
  {
    origin: ['http://localhost:3000']
  }));

app.use('/itens', itensRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at ${HOSTNAME}:${PORT}`);
})