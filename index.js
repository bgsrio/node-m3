import express, { response } from "express";
import * as dotenv from "dotenv";

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciar a variável responsável pelo servidor
const app = express();
//configurar o servidorpara aceritar enviar e receber arquivos em JSON
app.use(express.json());

const data = [
  {
    name: "Ana",
    age: 30,
    department: "RH",
  },
];

//criação das rotas - a rota é uma função que devolve algo
app.get("/", (request, response) => {
  //retorna uam resposta com status de 200 e um json
  return response.status(200).json(data);
});

// servidor subindo pro ar
app.listen(Number(process.env.PORT), () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
