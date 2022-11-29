import express, { response } from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciar a variável responsável pelo servidor
const app = express();
//configurar o servidor para aceritar enviar e receber arquivos em JSON
app.use(express.json());

let data = [
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

//MÉTODO POST
app.post("/create", (request, response) => {
  const newData = {
    //captura o body da requisição e adiciona um id
    ...request.body,
    id: uuidv4(),
  };
  data.push(newData);

  return response.status(201).json(data);
});

//método put
app.put("/edit/:id", (request, response) => {
  const { id } = request.params;

  //seta o id como parâmetro, reconhecendo o item
  const update = data.find((item) => item.id === id);

  const index = data.indexOf(update);
  //array[posição] = item
  // atualiza o item existente
  data[index] = {
    ...update,
    ...request.body,
  };

  return response.status(200).json(data[index]);
});

//método delete
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;

  const deleteById = data.find((item) => item.id === id);
  const index = data.indexOf(deleteById);

  // exclui o item posicionado no index
  data.splice(index, 1);

  return response.status(200).json(data)
});

// servidor subindo pro ar
app.listen(Number(process.env.PORT), () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
