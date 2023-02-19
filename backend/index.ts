import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import products from './products';

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

  res.json({
    quotes: {
      GBPAED: 4.423811,
      GBPAFN: 106.549773,
      GBPALL: 129.657088,
      GBPAMD: 469.335743,
      GBPANG: 2.151216,
      GBPAOA: 610.03339,
      GBPARS: 231.995983,
      GBPAUD: 1.750582,
      GBPAWG: 2.16792,
      GBPAZN: 2.052261,
      GBPBAM: 2.197082,
      GBPBBD: 2.410036,
      GBPBDT: 126.286925,
      GBPBGN: 2.201287,
      GBPBHD: 0.452822,
      GBPBIF: 2479.043076,
      GBPBMD: 1.2044,
      GBPBND: 1.599875,
      GBPBOB: 8.248087,
      GBPBRL: 6.222417,
      GBPBSD: 1.193672,
      GBPBTC: 4.8794288e-5,
      GBPBTN: 98.838647,
      GBPBWP: 15.788913,
      GBPBYN: 3.012825,
      GBPBYR: 23606.239837,
      GBPBZD: 2.405992,
      GBPCAD: 1.62299,
      GBPCDF: 2465.407219,
      GBPCHF: 1.114,
      GBPCLF: 0.034454,
      GBPCLP: 955.268761,
      GBPCNY: 8.271342,
      GBPCOP: 5881.188002,
      GBPCRC: 667.539664,
      GBPCUC: 1.2044,
      GBPCUP: 31.9166,
      GBPCVE: 123.866217,
      GBPCZK: 26.688907,
      GBPDJF: 212.526638,
      GBPDKK: 8.385279,
      GBPDOP: 66.867425,
      GBPDZD: 164.400065,
      GBPEGP: 36.707717,
      GBPERN: 18.066,
      GBPETB: 64.160825,
      GBPEUR: 1.123469,
      GBPFJD: 2.66763,
      GBPFKP: 1.000108,
      GBPGEL: 3.185686,
      GBPGGP: 1.000108,
      GBPGHS: 15.218925,
      GBPGIP: 1.000108,
      GBPGMD: 73.649529,
      GBPGNF: 10277.194612,
      GBPGTQ: 9.340208,
      GBPGYD: 251.85513,
      GBPHKD: 9.449903,
      GBPHNL: 29.42279,
      GBPHRK: 8.496794,
      GBPHTG: 178.89016,
      GBPHUF: 432.143334,
      GBPIDR: 18265.930274,
      GBPILS: 4.277311,
      GBPIMP: 1.000108,
      GBPINR: 99.682772,
      GBPIQD: 1742.136532,
      GBPIRR: 50885.900072,
      GBPISK: 173.578592,
      GBPJEP: 1.000108,
      GBPJMD: 184.220457,
      GBPJOD: 0.855588,
      GBPJPY: 161.528153,
      GBPKES: 150.219341,
      GBPKGS: 105.28911,
      GBPKHR: 4872.41946,
      GBPKMF: 554.751209,
      GBPKPW: 1083.960002,
      GBPKRW: 1560.710147,
      GBPKWD: 0.368993,
      GBPKYD: 0.994614,
      GBPKZT: 535.534774,
      GBPLAK: 20120.551351,
      GBPLBP: 17916.538122,
      GBPLKR: 436.27487,
      GBPLRD: 189.456665,
      GBPLSL: 21.715791,
      GBPLTL: 3.556281,
      GBPLVL: 0.72853,
      GBPLYD: 5.729873,
      GBPMAD: 12.383027,
      GBPMDL: 22.350851,
      GBPMGA: 5135.159854,
      GBPMKD: 69.220844,
      GBPMMK: 2506.640646,
      GBPMNT: 4239.316181,
      GBPMOP: 9.644411,
      GBPMRO: 429.97059,
      GBPMUR: 55.463076,
      GBPMVR: 18.50004,
      GBPMWK: 1225.192082,
      GBPMXN: 22.114234,
      GBPMYR: 5.337947,
      GBPMZN: 76.002134,
      GBPNAD: 21.715786,
      GBPNGN: 554.674826,
      GBPNIO: 43.615198,
      GBPNOK: 12.426078,
      GBPNPR: 158.141881,
      GBPNZD: 1.928583,
      GBPOMR: 0.462495,
      GBPPAB: 1.19356,
      GBPPEN: 4.595738,
      GBPPGK: 4.259969,
      GBPPHP: 66.874356,
      GBPPKR: 313.628499,
      GBPPLN: 5.358798,
      GBPPYG: 8704.279565,
      GBPQAR: 4.385267,
      GBPRON: 5.527598,
      GBPRSD: 131.837511,
      GBPRUB: 89.12601,
      GBPRWF: 1297.14379,
      GBPSAR: 4.513734,
      GBPSBD: 9.955249,
      GBPSCR: 15.741507,
      GBPSDG: 705.180625,
      GBPSEK: 12.58743,
      GBPSGD: 1.610329,
      GBPSHP: 1.465454,
      GBPSLE: 23.895345,
      GBPSLL: 23786.900243,
      GBPSOS: 685.910209,
      GBPSRD: 39.723566,
      GBPSTD: 24928.648153,
      GBPSVC: 10.443787,
      GBPSYP: 3025.437811,
      GBPSZL: 21.75761,
      GBPTHB: 41.495239,
      GBPTJS: 12.55108,
      GBPTMT: 4.227444,
      GBPTND: 3.734247,
      GBPTOP: 2.819144,
      GBPTRY: 22.678495,
      GBPTTD: 8.099805,
      GBPTWD: 36.599673,
      GBPTZS: 2791.918593,
      GBPUAH: 43.8602,
      GBPUGX: 4380.616712,
      GBPUSD: 1.2044,
      GBPUYU: 46.981878,
      GBPUZS: 13538.246745,
      GBPVEF: 2930503.862249,
      GBPVES: 29.335481,
      GBPVND: 28688.807801,
      GBPVUV: 141.067422,
      GBPWST: 3.242856,
      GBPXAF: 736.869473,
      GBPXAG: 0.055381,
      GBPXAU: 0.000654,
      GBPXCD: 3.254952,
      GBPXDR: 0.892951,
      GBPXOF: 736.869473,
      GBPXPF: 135.017569,
      GBPYER: 301.521976,
      GBPZAR: 21.741757,
      GBPZMK: 10841.049527,
      GBPZMW: 23.186399,
      GBPZWL: 387.816306,
    },
    source: 'GBP',
    success: true,
    timestamp: 1676807943,
  });
  // axios
  //   .get('https://api.apilayer.com/currency_data/live?source=GBP', config)
  //   .then((response) => {
  //     res.json(response.data);
  //   })
  //   .catch((error) => res.json(error));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
