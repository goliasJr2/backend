import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { mainRouter } from "./routes/main";

const server = express();
server.use(helmet());
server.use(cors());//Habilita o CORS para todas as rotas (permite acesso de qualquer origem/domínio (Pode-se configurar para domínios específicos também... .))
server.use(urlencoded({ extended: true })); // Permite o uso de dados de formulário
server.use(express.json());

//Rotas
server.use(mainRouter);//Criado depois dos passos abaixo, antes dará erro.
// server.listen(process.env.PORT || 3000, () => {
//     console.log(`Servidor rodando em ${process.env.BASE_URL}`)
// })
server.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando em http://0.0.0.0:3000");
});
