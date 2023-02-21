import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import products from './products';
import rates from './rates';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

app.get('/rates', (req: Request, res: Response) => {
  const config = {
    headers: {
      apikey: process.env.API_KEY,
    },
  };

  res.json(rates);
//   axios
//     .get('https://api.apilayer.com/currency_data/live?source=GBP', config)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => res.json(error));
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
