import express from 'express';
import compression from 'compression';
import { obtenerPaises } from "./v1/models/obtener_paises.js";
import cors from 'cors';
import { getPreguntas } from "./v1/controllers/main_src.js";
const url = 'https://restcountries.com/v3.1/all';
const tpi = express();
const port = 8080;
//import mysql2 from 'mysql2';
import mysql2 from 'mysql2/promise';
const DEV = false;
const paises = await obtenerPaises(url);
const corsOptions = {
  origin: ['https://rafa-lopez-web2-dev.fl0.io', 'http://localhost:8088', 'http://localhost:8080', 'http://localhost:*', 'http://127.0.0.1:*', '*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};
const conexion = mysql2.createPool({
  host: 'mysql-raffarraffa.alwaysdata.net',
  user: '321087_rafa',
  database: 'raffarraffa_web2',
  password: 'Web_2_20230'
});
tpi.use(compression());
tpi.use(express.json());
tpi.use(cors(corsOptions));
if (DEV) {
  tpi.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
 //   console.log(`Peticion ${req.method} ruta ${req.originalUrl} Sin cache`);
    next();
  });
}
tpi.get(`/preguntas`, async (req, res) => {
  res.send(await getPreguntas(paises));
});
tpi.get(`/paises`, async (req, res) => {
  if (!paises) { await getPreguntas(url) }
  res.send(paises);
});
tpi.post(`/game`, (req, res) => {
 // console.log(req.body);
  const dato = [req.body.name, req.body.puntosTotal, req.body.tiempoTotal, JSON.stringify(req.body.preguntas)];
  guardarDB(dato);
  res.json({ mensaje: ` POST ${req.body.name} ` });
});
// ruta  archivo HTML default
tpi.use(compression());
tpi.use(express.static('public'));
tpi.get('/', (req, res) => {
  const inde = "/index.html";
  res.sendFile(inde);
});
tpi.get('/pregunta', (req, res) => {
  const clave = req.query.clave;
  const respuesta = paises[clave];
  res.status(200).send(respuesta);
});
tpi.get('/ranking', async (req, res) => {
  let rank = await ranking();
  res.status(200).send(rank);
});
tpi.post('/respuesta', (req, res) => {
  const rpt = req.body;
//  console.log(Object.values(paises[rpt.clave]).includes(rpt.respuesta));
//  console.log(`Peticion ${rpt.tipo}`);
//  console.log(paises[req.body.clave]);
  let resultado = {
    respuesta: Object.values(paises[rpt.clave]).includes(rpt.respuesta),
    pregunta: paises[req.body.clave]
  };
  res.status(200).send(JSON.stringify(resultado));
});
tpi.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
//ranking();
async function guardarDB(data) {
  try {
    const conn = await conexion.getConnection();
    const sql = 'INSERT INTO `partida` (`id`, `name`,`point`, `time`, `preguntas`) VALUES (NULL, ?, ?, ?,?)';
    const values = [data[0], data[1], data[2], data[3]];
    let [resultado] = await conn.execute(sql, values);
    conn.release();
//    console.log(`resultado ${resultado}`);
  }
  catch (err) {
    console.log(err);
  }
}

//ranking();
async function ranking() {
  try {
    const conn = await conexion.getConnection();
    const sql = 'SELECT `name`, `point`, `time`  FROM partida ORDER BY point DESC, time ASC LIMIT 20';
    let [resultado] = await conn.execute(sql);
    conn.release();
    resultado = JSON.stringify(resultado);
    //   console.log(`resultado ${resultado}`);
    return (resultado);
  }
  catch (err) {
    console.log(err);
  }
}
